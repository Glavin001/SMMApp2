// Dependencies
var feathers = require('feathers');

// Services
var facultySearchService = require('./services/facultySearch');

// Config
var port = 8080;

// Start server
feathers()
    .configure(feathers.socketio())
    .use('/faculty', facultySearchService)
    .listen(port, function() {
        console.log('Listening on port '+port+'.');
    });