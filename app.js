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

// Your own super cool function
var logger = function(req, res, next) {
    console.log(req.method, req.url);
    next(); // Passing the request to the next handler in the stack.
};

app.configure(function(){
	app.set('port', port);
	app.set('views', __dirname + '/app/server/views');
	app.set('view engine', 'jade');
	app.locals.pretty = true;
//	app.use(express.favicon());
//	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.cookieParser());
	app.use(express.session({ secret: 'super-duper-secret-secret' }));
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

http.createServer(app).listen(app.get('port'), function(){
	console.log("Express server listening on port " + app.get('port'));
})