// Dependencies
var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var crypto = require('crypto');
var nconf = require('nconf');
var path = require('path');
var icalendar = require('icalendar');

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

    var saveCalendar = function(calendarId, courses, collection, callback) {
        var data = {
            calendarId: calendarId,
            courses: courses
        };
        collection.update({ 'calendarId': calendarId }, data, {upsert: true}, function(err, docs) {
            //console.log(err, docs);
            callback(err, docs);
        });
    };

    // Create Calendar
    app.post('/api/calendar', function(req, res) {
        console.log(req.body);
        
        var courses = JSON.parse(req.body.courses);


        if (courses.length > 0) {

            // Create secure CalendarId
            var timestamp = (+(new Date()))+"";
            var temp = (timestamp + nconf.get('secret'));
            console.log(temp);
            var digest = "hex"
            var calendarId = crypto.createHash('md5').update(temp).digest(digest);
            console.log(calendarId);

            saveCalendar(calendarId, courses, collection, function(err, docs) {
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

    // Stats
    app.get('/api/stats.json', function(req, res) {
        // Count
        collection.count(function(err, count) {
            res.json({ 'calendars': count }, 200);
        });

    });

    var timeFromStr = function(str) {
        // Ex: "4:00 pm"
        console.log('timeFromStr: ', str);
        var n = parseInt(str);
        var hours = parseInt(n/100);
        var minutes = n - hours*100;
        return {
            "hours": hours,
            "minutes": minutes
        };
    };

    var jsonToEvent = function(json) {
        console.log('jsonToEvent: ', json);
        var vevent = new icalendar.VEvent("event-"+json.crn);
        var summary = json.Subj_code + " " + json.Crse_numb + " - " + json.Crse_title;
        vevent.setSummary(summary);

        var location = json.Bldg_code + " " + json.Room_code;
        vevent.setDescription(location);
        // Calculate date and event length
        var startDate = new Date(json.Start_date);
        var startTime = timeFromStr(json.Begin_time);
        startDate.setHours(startTime.hours, startTime.minutes);

        var endTime = timeFromStr(json.End_time);
        var endDate = new Date(json.Start_date);
        endDate.setHours(endTime.hours, endTime.minutes);
        // console.log(startDate, endDate);
        vevent.setDate(startDate, endDate);

        var days = [];
        if (json.Mon_day) {
            days.push("MO");
        }
        if (json.Tue_day) {
            days.push("TU");
        }
        if (json.Wed_day) {
            days.push("WE");
        }
        if (json.Thu_day) {
            days.push("TH");
        }
        if (json.Fri_day) {
            days.push("FR");
        }
        if (json.Sat_day) {
            days.push("SA");
        }
        if (json.Sun_day) {
            days.push("SU");
        }
        console.log(days);
        vevent.addProperty('RRULE', { FREQ: 'WEEKLY', BYDAY: days.join(',') });
        return vevent;
    };

    var coursesToCalendar = function(courses, callback) {
        //console.log(courses);
        // Generate iCalendar file
        var calendar = new icalendar.iCalendar();
        // Replace PRODID
        calendar.properties.PRODID = [];
        calendar.addProperty('PRODID',"-//Saint Mary's University//Calendar//EN");
        // Add events to calendar
        for (var i=0, len=courses.length; i<len; i++)
        {
            var vevent = jsonToEvent(courses[i]);
            calendar.addComponent(vevent);
        }
        return callback(calendar);
    };

    // Calendar
    app.get('/calendar/:calendarId/calendar.ics', function(req, res) {
        console.log('Calendar', req.params);
        var calendarId = req.params.calendarId;

        // Locate all the entries using find
        collection.find({'calendarId': calendarId }).toArray(function(err, results) {
            console.dir(results);
            var result = results[0] || { 'courses': [] };
            var courses = result.courses;

            try {
                coursesToCalendar(courses, function(calendar) {
                    res.header("Content-Type", "text/calendar; charset=utf-8");
                    res.header("Content-Disposition", "inline; filename=calendar.ics");
                    res.end(calendar.toString());
                });
            } catch (e) {
                res.json({"error": e.message });
            }

        });

    });

    // Start server
    app.listen(process.env.PORT || nconf.get('server:port'), function() {
        console.log('iCal-Sync Server is listening on '+nconf.get('server:port')+'.');
    });

});
