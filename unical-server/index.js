// Dependencies
var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var icalendar = require('icalendar');
var crypto = require('crypto');
var nconf = require('nconf');
var path = require('path');
//
var app = express();

// Configuration
nconf
    .argv()
    .env()
    .file(__dirname+'/default.config.json')
    .file('custom', 'config.json');


// Optionally serve the public front-end app
if (nconf.get('server:publicDir')) {
    app.use(express.static( path.resolve(__dirname, nconf.get('server:publicDir') )));
}

// API for Browser App
/**
Main
*/
MongoClient.connect('mongodb://'+nconf.get('database:hostname')+':'+nconf.get('database:port')+'/'+nconf.get('database:name'), function(err, db) {
    if(err) throw err;

    var collection = db.collection(nconf.get('database:collection'));

    // Setup Express server
    app.use(express.bodyParser());

    /**
    =========================================================================
    API
    */
    app.get('/api/uniapi', function(req, res) {
      res.json({
        "protocol": nconf.get('uniapi:protocol'),
        "hostname": nconf.get('uniapi:hostname'),
        "port": nconf.get('uniapi:port')
      })
    });


    app.post('/api/updateUser', function(req, res) {
        //console.log('/api/updateUser', req.body);
        var username = req.body.username;
        var password = req.body.password;

        getCourses(username, password, function(courses) {
            //console.log("Retrieved Courses");
            //console.log(courses);

            if (courses.length > 0) {

                // Create secure CalendarId
                var temp = (username + nconf.get('secret'));
                var digest = "hex"
                var calendarId = crypto.createHash('md5').update(temp).digest(digest);
                console.log(calendarId);
                saveCoursesForUser(calendarId, courses, collection, function(err, docs) {
                    console.log('Saved Courses');

                    var url = "/calendar/"+calendarId+"/calendar.ics";
                    res.json({
                        'url': url,
                        'courses': courses
                    }, 201);

                });

            } else {
                res.json({
                    'error': "No courses were found."
                }, 204);
            }

        });

    });

    // Stats
    app.get('/api/stats.json', function(req, res) {
        // Count
        collection.count(function(err, count) {
            res.json({ 'calendars': count }, 200);
        });

    });

    // Calendar
    app.get('/calendar/:calendarId/calendar.ics', function(req, res) {
        console.log('Calendar', req.params);
        var calendarId = req.params.calendarId;

        // Locate all the entries using find
        collection.find({'calendarId': calendarId }).toArray(function(err, results) {
            console.dir(results);
            var result = results[0] || { 'courses': [] };
            var courses = result.courses;

            coursesToCalendar(courses, function(calendar) {
                res.header("Content-Type", "text/calendar; charset=utf-8");
                res.header("Content-Disposition", "inline; filename=calendar.ics");
                res.end(calendar.toString());
            });
        });

    });

    // Start server
    app.listen(process.env.PORT || nconf.get('server:port'), function() {
        console.log('iCal-Sync Server is listening on '+nconf.get('server:port')+'.');
    });

});
