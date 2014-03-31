// Dependencies
var nconf = require('nconf');
var feathers = require('feathers');
var Sequelize = require('sequelize');

// Configuration
//
// Setup nconf to use (in-order):
//   1. Command-line arguments
//   2. Environment variables
//   3. A file located at 'path/to/config.json'
//
nconf.argv()
   .env()
   .file({ file: __dirname+'/default.config.json' });

if (nconf.get('help')) {
    console.log("HELP");
    process.exit();
    return;
}

var sequelize = new Sequelize(nconf.get('database:name'), nconf.get('database:username'), nconf.get('database:password'), {
    dialect: nconf.get('database:dialect'),
    port: nconf.get('database:port')
})

// Services
var facultySearchService = require('./services/faculty_search');
var coursesService = require('./services/course')(sequelize);

// Start server
feathers()
    .configure(feathers.socketio())
    .use('/api/v1/faculty', facultySearchService)
    .use('/api/v1/courses', coursesService)
    .listen(nconf.get('server:port'), function() {
        console.log('Listening on port '+nconf.get('server:port')+'.');
    });