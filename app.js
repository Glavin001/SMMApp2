/**
	Saint Mary's Mobile App (SMMApp), Version 2.0.0 

	Forked from Node-Login Boilerplate
	* Node.js Login Boilerplate
	* More Info : http://bit.ly/LsODY8
	* Copyright (c) 2013 Stephen Braitsch
**/

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

// Properties
var port = 8080
// Process command line arguments
process.argv.forEach(function (val, index, array) {
  // Customize port number, "[-p #]"
  if (val === "-p" || val === "--port") {
  	//
  	var newPort = parseInt( array[index+1] );
  	if (! isNaN(newPort )) {
  		//console.log("New port #:", newPort);
  		port = newPort;
  	} else {
  		console.error("Invalid custom port number: ", newPort);
  	}
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
    app.use(logger); // Here you add your logger to the stack.
});

app.configure('development', function(){
	app.use(express.errorHandler());
});

require('./app/server/router')(app);

server.listen(app.get('port'), function(){
	console.log("Express server listening on port " + app.get('port'));
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


