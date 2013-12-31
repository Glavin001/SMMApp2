#!/usr/bin/env node

/**

    Saint Mary's Mobile App (SMMApp), Version 2.0.0 
    Copyright (c) 2013 Glavin Wiechert

    Forked from Node-Login Boilerplate
    * More Info : http://bit.ly/LsODY8

**/

// Dependencies
var pjson = require('./package.json');
var fs = require("fs");
var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app)
var io = require("socket.io").listen(server);
var cookie = require("cookie");
var connect = require("connect");
var cluster = require('cluster');
var http = require('http');
var program = require('commander');
// 
var numCPUs = require('os').cpus().length;
// Redis
var RedisStore = require("socket.io/lib/stores/redis");
var redis = require("socket.io/node_modules/redis");

// Performance Stats
var requestsPerSecond = 0;
var allResponseTimes = [];

// Process command line arguments
program
    .version(pjson.version)
    .option('-p, --port <port>', 'Custom Port number for website. Default is [8080].', Number, 8080)
    .option('--production', "Turn on Production mode.", Boolean, (process.env.NODE_ENV=="production"?true:false) || false)
    .option('--multi-core', "Turn on Multi-Core support.", Boolean, false)
    .option('--workers <workers>', "Custom number of Worker nodes. Default is ["+numCPUs+"]. Requires multi-core enabled.", Number, numCPUs)
    .option('--disable-redis-store', "Turn off Redis Store for Socket.io. Will disable Multi-Core support.", Boolean, false)
    .parse(process.argv);

// RedisStore is required for Multi-Core support
if (program.disableRedisStore) {
    program.multiCore && console.log("RedisStore is required for Multi-Core support.");
    program.multiCore = false;
}

if (program.multiCore && cluster.isMaster) {
    console.log("Starting Multicore Server");
    //console.log("Detected "+numCPUs+" CPUs.");
    console.log("Creating "+program.workers+" workers.");
    // Fork workers.
    for (var i = 0; i < program.workers; i++) {
        cluster.fork();
    }
    // Cluster events
    cluster.on('fork', function(worker) {
        //console.log('fork', worker.id);
    });
    cluster.on('listening', function(worker, address) {
        //console.log('listening', worker.id, address);
    });
    cluster.on('exit', function(worker, code, signal) {
        console.warn('Worker ' + worker.process.pid + ' died');
    });
} else {
    if (program.multiCore) {
        //console.log("Started worker node");
    } else {
        // Must be master
        console.log("Started single master node");
    }

    // Workers can share any TCP connection
    // In this case its a HTTP server

    // Express middleware that logs all requests.
    var logger = function(req, res, next) {
        console.log(req.method, req.url);
        next(); // Passing the request to the next handler in the stack.
    };
    
    if (!program.disableRedisStore) {
        // Clustering Socket.io, use Redis for storage
        var redisErrorHandler = function(e) {
            console.error("Redis Error: ", e);
            console.log("Recommend disabling Redis Store:");
            console.log("   node app.js --disable-redis-store")
            process.exit(1);
        };
        var client = redis.createClient();
        client.on('error', redisErrorHandler);
        var pub = redis.createClient();
        pub.on('error', redisErrorHandler);
        var sub = redis.createClient();
        sub.on('error', redisErrorHandler);
        // Set Socket.io to use RedisStore
        io.set("store", new RedisStore({
            redisPub: pub,
            redisSub: sub,
            redisClient: client
        }));
        
    }
    
    // Customize for Production server
    if (program.production) {
        // Socket.io
        io.enable('browser client minification');  // send minified client
        io.enable('browser client etag');          // apply etag caching logic based on version number
        io.enable('browser client gzip');          // gzip the file
        io.set('log level', 1);                    // reduce logging

    }

    // Socket.io authentication handler
    io.set('authorization', function (handshakeData, accept) {
      if (handshakeData.headers.cookie) {
        handshakeData.cookie = cookie.parse(handshakeData.headers.cookie);
        handshakeData.sessionID = connect.utils.parseSignedCookie(handshakeData.cookie['express.sid'], 'secret');
        if (handshakeData.cookie['express.sid'] == handshakeData.sessionID) {
          return accept('Cookie is invalid.', false);
        }
      } else {
        return accept('No cookie transmitted.', false);
      } 
      accept(null, true);
    });

    app.configure(function(){
        app.set('port', program.port);
        app.set('views', __dirname + '/app/server/views');
        app.set('view engine', 'jade');
        app.locals.pretty = true;
    //  app.use(express.favicon());
    //  app.use(express.logger('dev'));
        app.use(express.bodyParser());
        app.use(express.cookieParser());
        app.use(express.session({secret: 'secret', key: 'express.sid'}));
        // app.use(express.session({ secret: 'super-duper-secret-secret' }));
        app.use(express.methodOverride());
        app.use(require('stylus').middleware({ src: __dirname + '/app/public' }));
        app.use(express.static(__dirname + '/app/public'));
        

        if (!program.production) {
            app.configure('development', function() {
                app.use(logger); // Add logger to the stack.
                app.use(express.errorHandler());
            });
        }

        // Count requests
        var countRequests = function(req, res, next) {
            // Increment 
            requestsPerSecond++;
            // Continue    
            next();
        };
        // Use Custom Middleware
        app.use(countRequests);

        // Response Time per request
        var customResponseTime = function(req, res, next) { 
            var start = new Date; 
            if (res._responseTime) 
                return next(); 
            res._responseTime = true; 
            res.on('header', function() {
                var duration = new Date - start; 
                res.setHeader('X-Response-Time', duration + 'ms'); 
                // Add to allResponseTimes 
                allResponseTimes.push( duration ); 
            }); 
            next(); 
        }; 
        //app.use(connect.responseTime());
        // Use custom middleware
        app.use(customResponseTime);

    });

    // Handle Appcache request
    var startTime = new Date();
    var manifest = null;
    var getManifest = function(callback) {
        if (manifest === null) {
            // Load Manifest file
            fs.readFile("./app/public/app.manifest", function (err, data) {
                // Check for error
                if (err) {
                    console.error("Could not load manifest file.");
                    throw err;
                }
                // Alter the manifest file
                manifest = data + "\n# Server started " + startTime;
                //console.log(manifest);
                return callback && callback(manifest);
            });
        } else {
            return callback && callback(manifest);
        }
    };
    app.get("/cache.manifest", function(req, res) {
        //console.log("App cache");
        getManifest(function(manifest) {
            res.header("Content-Type", "text/cache-manifest");
                res.end(manifest);
        });
    });
    getManifest(); // Pre-load

    // Server Specifications
    app.get("/specs.json", function(req, res) {
        var specs = { };
        specs.version = pjson.version;
        specs.workers = (program.multiCore)?program.workers:1;
        specs.redis = !program.disableRedisStore;
        specs.production = !!program.production;
        specs.port = program.port;
        return res.json(specs);
    });

    require('./app/server/router')(app);

    server.listen(app.get('port'), function() {
        console.log((program.production?"Production ":"")+"Express server listening on port " + app.get('port'));
    });

    // Save and Clear every second
    function clearRequestsPerSecond() {
        //console.log('clearRequestsPerSecond');
        // Save 
        var lastRequestsPerSecond = requestsPerSecond;
        // Clear
        requestsPerSecond = 0;
        // Push to Socket.io users who are listening
        io.sockets.in("admin").emit("requestsPerSecond",  lastRequestsPerSecond);
    }
    setInterval(clearRequestsPerSecond, 1000);

    // Save and Clear every second
    function clearResponseTime() { 
        // Check if no responses
        var averageResponseTime = 0;
        if (allResponseTimes.length > 0) {
            var sum = 0;
            for (var i=0, len=allResponseTimes.length; i<len;i++) {
                 sum += allResponseTimes[i];
            }
            averageResponseTime = sum/allResponseTimes.length; 
            //console.log(averageResponseTime,":",allResponseTimes);
            allResponseTimes = []; // Push to Socket.io users who are listening 
        }
        io.sockets.in("admin").emit("responseTime", averageResponseTime); 
    } 
    setInterval(clearResponseTime, 1000);

    // Current Users per second
    var connectedUsers = 0;
    function usersPerSecond() {
        // Push to Socket.io users who are listening
        io.sockets.in("admin").emit("currentUsersPerSecond",  connectedUsers );
    }
    setInterval(usersPerSecond, 1000);

    // Graceful shutdown
    var shutdown = function() {
        console.log("Closing SMU Mobile App...");
        // Tell all Sockets that server is shutting down.
        io.sockets.emit('signal', {'message':'shutdown'});
        server.close(); // Close Express
        console.log(); // New line
        process.exit(0); // Kill this app process.   
    };
    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);

    // Socket.io
    io.sockets.on('connection', function (socket) {
        connectedUsers++;
        // 
        socket.user = { };
        // Set socket username
        socket.user.name = socket.handshake.cookie.user;
        // Join chat room
        socket.join("default");
        socket.join("admin"); // TODO: Only join admin room if logged in as an admin or on the /admin page.
        // Broadcast join   
        //socket.broadcast.to(chat.room).emit('sendChat', {"name":"Server", "msg": socket.user.name+" joined chat."});
        // Welcome new user
        //socket.emit('sendChat', {"name":"Server", "msg": "Welcome "+socket.user.name+"."});
        
        console.log("Socket connected: ", socket.user);

        //-- Listeners --
        // Disconnect
        socket.on("disconnect", function(data) {
            // Broadcast join   
            //socket.broadcast.to(chat.room).emit('sendChat', {"name":"Server", "msg": socket.user.name+" left chat."});
            connectedUsers--;
            if (connectedUsers < 0) connectedUsers = 0;
        });

        /*
        // 
        socket.on("sendChat", function(data) {
            // console.log(socket.handshake.cookie.user);
            data.name = socket.handshake.cookie.user;
            if (socket.user.color) {
                data.color = socket.user.color;
            }
            //socket.broadcast.to(chat.room).emit('sendChat', data);
            //io.sockets.in(chat.room).emit('sendChat', data);
        });
        // 
        socket.on("userColor", function(data) {
            socket.user.color = data && data.hex;
        });
        */

    });

}

