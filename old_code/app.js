#!/usr/bin/env node

/**

    Saint Mary's Mobile App (SMMApp), Version 2.0.0 
    Copyright (c) 2013 Glavin Wiechert

    Forked from Node-Login Boilerplate
    * More Info : http://bit.ly/LsODY8

**/

// Dependencies
var config = require("./config"); // Load Configuration module
var pjson = require('./package.json');
var os = require("os");
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
var toobusy = require('toobusy');
// 
var numCPUs = os.cpus().length;
// Redis
var RedisStore = require("socket.io/lib/stores/redis");
var redis = require("socket.io/node_modules/redis");

// Process Command Line Arguments
config.processArgs(process.argv);

// RedisStore is required for Multi-Core support
if (!config.redis.enabled) {
    config.server.multiCore && console.log("RedisStore is required for Multi-Core support.");
    config.server.multiCore = false;
}

// Cluster / Multi-Core
if (config.server.multiCore && cluster.isMaster) {
    console.log("Starting Multicore Server");
    //console.log("Detected "+numCPUs+" CPUs.");

    // Broadcast
    var broadcastToChildWorkers = function (msg) {
        //console.log("broadcastToChildWorkers: ", msg);
        for (var id in cluster.workers) {
            var worker = cluster.workers[id];
            worker.send(msg);
        }
    };
    // AutoScaling of Cluster
    var heavyLoadCount = 0; // Count number of Heavy Load messages occur
    var startWorker = function() {
        //console.log("Scaling Up");
        //console.log(cluster.workers);
        if ( cluster.workers && Object.keys(cluster.workers).length < config.server.workers ) {
            // Still room for more workers
            //console.log("New Worker.");
            var worker = cluster.fork();
            // Receive messages from Worker (to Master)
            worker.on('message', function(msg) {
                //console.log("Message from Worker: ", msg);
                if (msg.heavyLoad) {
                    if (msg.heavyLoad == true) {
                        heavyLoadCount++;
                    } else {
                        // Nothing
                    }
                }
            });
            // Tell Child Workers the number of workers in the cluster
            broadcastToChildWorkers({ workersCount: Object.keys(cluster.workers).length });
        } else {
            // Max number of workers already running
            //console.log("Max number of workers already running.");
        }
    };
    var killWorker = function() {
        //console.log("Scaling Down");
        //console.log(cluster.workers);
        if ( cluster.workers && Object.keys(cluster.workers).length > 1) {
            // More than 1 Worker left. Kill one.
            for (var id in cluster.workers) {
                var worker = cluster.workers[id];
                //console.log("Killed Worker");
                worker.kill();
                break;
            }
            // Tell Child Workers the number of workers in the cluster
            broadcastToChildWorkers({ workersCount: Object.keys(cluster.workers).length });
        } else {
            // Only 1 Worker left. Save it.
            //console.log("Only 1 Worker left. Save it.");
        }
    };
    var checkLoad = function( ) {
        //console.log("checkLoad: ", heavyLoadCount);
        if (heavyLoadCount > 0) {
            startWorker();
        } else {
            killWorker();
        }
        // Clear
        heavyLoadCount = 0;
    };
    setInterval(checkLoad, 2000); // Every second


    //console.log("Creating "+config.server.workers+" workers.");
    // Fork workers.
    if (config.server.autoScaling) {
        // Only start one worker node, until heavier load requires more.
        startWorker();
    } else {
        // AutoScaling is disabled, start maximum number of workers.
        for (var i = 0; i < config.server.workers; i++) {
            startWorker();
        }
    }


    // Cluster events
    cluster.on('fork', function(worker) {
        console.log('fork', worker.id);
    });
    cluster.on('listening', function(worker, address) {
        console.log('listening', worker.id, address);
    });
    cluster.on('exit', function(worker, code, signal) {
        console.warn('Worker ' + worker.process.pid + ' died');
    });
} else {
    if (config.server.multiCore) {
        //console.log("Started worker node");
    } else {
        // Must be master
        console.log("Started single master node");
    }

    // Receive messages from Master
    process.on('message', function(msg) {
        if (msg.workersCount) {
            config.server.workers = msg.workersCount;
        }
    });

    // Check on interval
    var checkLoad = function( ) {
        // Check Express load.
        if (config.server.autoScaling) {
            var isTooBusy = toobusy();
            var lag = toobusy.lag();
            //console.log(isTooBusy, lag, config.server.maxLag);
            if (isTooBusy || ( lag > config.server.maxLag)) {
                // startWorker();
                process.send({heavyLoad: true});
            } else {
                //killWorker();
                process.send({heavyLoad: false});
            }
        }
        // TODO: Check Socket.io load,
    };
    setInterval(checkLoad, 2000); // Every second


    // Workers can share any TCP connection
    // In this case its a HTTP server

    // Express middleware that logs all requests.
    var logger = function(req, res, next) {
        console.log(req.method, req.url);
        next(); // Passing the request to the next handler in the stack.
    };
    
    if (config.redis.enabled) {
        // Clustering Socket.io, use Redis for storage
        var redisErrorHandler = function(e) {
            console.error("Redis Error: ", e);
            console.log("Recommend disabling Redis Store:");
            console.log("   node app.js --disable-redis-store")
            process.exit(1);
        };
        var client = redis.createClient(config.redis.port, config.redis.host, config.redis.options);
        client.on('error', redisErrorHandler);
        var pub = redis.createClient(config.redis.port, config.redis.host, config.redis.options);
        pub.on('error', redisErrorHandler);
        var sub = redis.createClient(config.redis.port, config.redis.host, config.redis.options);
        sub.on('error', redisErrorHandler);
        // Set Socket.io to use RedisStore
        io.set("store", new RedisStore({
            redisPub: pub,
            redisSub: sub,
            redisClient: client
        }));
        
    }
    
    // Customize for Production server
    if (config.server.production) {
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
        app.set('port', config.server.port);
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
        

        if (!config.server.production) {
            app.configure('development', function() {
                app.use(logger); // Add logger to the stack.
                app.use(express.errorHandler());
            });
        }

        //- Toobusy
        // Set the maximum lag in miliseconds
        toobusy.maxLag(config.server.maxLag);
        // middleware which blocks requests when we're too busy
        app.use(function(req, res, next) {
            // Only Too Busy if toobusy is enabled.
            var isTooBusy = toobusy();
            if (isTooBusy && config.server.toobusy) {
                //console.log("Toobusy!");
                res.send(503, "I'm busy right now, sorry. "+toobusy.lag() );
            } else {
                next();
            } 
        });
    
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
        specs.workers = (config.server.multiCore)?config.server.workers:1;
        specs.redis = config.redis.enabled;
        specs.production = !!config.server.production;
        specs.port = config.server.port;
        specs.os = {
            type: os.type(),
            platform: os.platform(),
            arch: os.arch()
        };
        specs.uptime = process.uptime();
        specs.memoryUsage = process.memoryUsage();
        return res.json(specs);
    });

    require('./app/server/router')(app);

    server.listen(app.get('port'), function() {
        console.log((config.server.production?"Production ":"")+"Express server listening on port " + app.get('port'));
    });

    // Performance Stats
    var requestsPerSecond = 0;
    var allResponseTimes = [];

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

    // Current Lag, per second
    function lagPerSecond() {
        // Push to Socket.io users who are listening
        io.sockets.in("admin").emit("currentLagPerSecond",  toobusy.lag() );
    }
    setInterval(lagPerSecond, 1000);
    

    // Graceful shutdown
    var shutdown = function() {
        console.log("Closing "+pjson.name+"...");
        // Tell all Sockets that server is shutting down.
        io.sockets.emit('signal', {'message':'shutdown'});
        server.close(); // Close Express
        toobusy.shutdown(); // Shutdown toobusy
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

