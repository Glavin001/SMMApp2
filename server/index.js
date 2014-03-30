// Dependencies
var nconf = require('nconf');
var feathers = require('feathers');
var Sequelize = require('sequelize');

// Database Connection
var database = "smu";
var username = "root";
var password = null; // Blank

var sequelize = new Sequelize(database, username, password, {
    dialect: "mysql",
    port: 3306
})

// Services
var facultySearchService = require('./services/facultySearch');
var coursesService = require('./services/course_service')(sequelize);

// Config
var port = 8080;

// Start server
feathers()
    .configure(feathers.socketio())
    .use('/api/v1/faculty', facultySearchService)
    .use('/api/v1/courses', coursesService)
    .listen(port, function() {
        console.log('Listening on port '+port+'.');
    });