/**
	Saint Mary's Mobile App (SMMApp), Version 2.0.0 

	Forked from Node-Login Boilerplate
	* Node.js Login Boilerplate
	* More Info : http://bit.ly/LsODY8
	* Copyright (c) 2013 Stephen Braitsch
**/

var fs = require("fs");
var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app)
var io = require("socket.io").listen(server);
var cookie = require("cookie");
var connect = require("connect");

// Display command line arguments
console.log("Usage:")
console.log("	node app [--port|-p number]");
console.log()

// Properties, defaults
var port = 8080; // Server port number
var production = false; // Default is development

// Process command line arguments
process.argv.forEach(function (val, index, array) {
  	// Customize port number, "[-p #]"
	if (val === "-p" || val === "--port") {
		// Change port number
		var newPort = parseInt( array[index+1] );
		if (! isNaN(newPort )) {
			//console.log("New port #:", newPort);
			port = newPort;
		} else {
			console.error("Invalid custom port number: ", newPort);
		}
	} else 
	if (val === "--production") {
		// Is production server, no longer development
		production = true;
  	} 
}); 

// Express middleware that logs all requests.
var logger = function(req, res, next) {
    console.log(req.method, req.url);
    next(); // Passing the request to the next handler in the stack.
};

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
	app.set('port', port);
	app.set('views', __dirname + '/app/server/views');
	app.set('view engine', 'jade');
	app.locals.pretty = true;
//	app.use(express.favicon());
//	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.cookieParser());
    app.use(express.session({secret: 'secret', key: 'express.sid'}));
	// app.use(express.session({ secret: 'super-duper-secret-secret' }));
	app.use(express.methodOverride());
	app.use(require('stylus').middleware({ src: __dirname + '/app/public' }));
	app.use(express.static(__dirname + '/app/public'));
	//
	if (!production) {
    	app.use(logger); // Add logger to the stack.
	}
});

app.configure('development', function(){
	app.use(express.errorHandler());
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
app.get("/appcache", function(req, res) {
	//console.log("App cache");
	getManifest(function(manifest) {
		res.header("Content-Type", "text/cache-manifest");
			res.end(manifest);
	});
});
getManifest(); // Pre-load


require('./app/server/router')(app);

server.listen(app.get('port'), function() {
	console.log((production?"Production ":"")+"Express server listening on port " + app.get('port'));
});

// Socket.io
io.sockets.on('connection', function (socket) {
	// 
	socket.user = { };
	// Set socket username
	socket.user.name = socket.handshake.cookie.user;
	// Join chat room
	socket.join("default");
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


