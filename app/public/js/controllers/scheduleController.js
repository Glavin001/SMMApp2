(function( scheduleController, undefined ) {
    var self = scheduleController;


    self.Event = function( data ) {
        var self = this;

        self.days = [  ];
        self.time = { 
            "start": 0
            ,"end": 0
        };
        self.interval = {
            "start": new Date()
            ,"end": new Date()
        }

        /**
        Checks if Event conflicts with time slot of another event.
        */
        self.conflictsWith = function(event) {

            // TODO: Check if interval conflicts
            if (true) {
                // TODO: Check if days conflict
                if (true) {
                    // Check if time conflicts
                    if ( 
                            ( // self after event
                                self.time.start >= event.time.end  
                            )
                            ||
                            ( // self before event
                                self.time.end <= event.time.start  
                            )
                        ) {
                        // Does not conflict
                        return false;
                    } else {
                        // Conflicts
                        return true;
                    }
                }
            }
            // 
            return false;
        };

        /**
        Compares this Event with another Event.
        (With respect to time slot)
        -1 => less than
        0 => equal to
        1 => greater than
        @deprecated
        */
        self.compareWith = function(event) {
            return self.earlierThan(event);
        };

        /**
        Checks if this Event starts earlier than another Event.
        -1 => earler than
        0 => same time
        1 => later than
        */
        self.earlierThan = function(event) {
            // TODO: Check self.interval

            // Get first day 
            var sFirstDay = self.days.sort()[0];
            var oFirstDay = event.days.sort()[0];
            // Check if first day is the same
            if (sFirstDay === oFirstDay) {
                // Check if time is earlier
                var sS = self.time.start;
                var oS = event.time.start; 
                if (sS === oS) {
                    return 0; // Equal
                } else if (sS < oS) {
                    return -1; // Earlier
                } else {
                    return 1; // Later
                }
            } else if (sFirstDay < oFirstDay) {
                return -1; // Earlier
            } else {
                //
                return 1; // Later
            }
        };

        /**
        Load
        */
        self.days = data.days;
        self.time = data.time;
        self.interval = data.interval;

        return self;
    };

    self.EventGraph = function( events ) {
        var self = this;

        /** 
        Graph Traversal
        */
        function visit(graph, fn, visited) {
            var end = true;
            for (node in graph) {
                var cVisited = visited.slice(0);
                if (-1 === cVisited.indexOf(node)) {
                    end = false;
                    cVisited.push(node);
                    fn(cVisited.slice(0));
                    visit(graph[node], fn, cVisited.slice(0));
                } else {
                    //console.log("Already visited:", node, visited);
                }
                //console.log("Done with node:", node);
            }
            //console.log("Done with graph:", graph);
            if (end) {
                console.log(visited.slice(0));
            }
        };
        var depthFirstSearch = function (node, graph, fn) {
            var nodes = {};
            nodes[node] = graph[node];
            visit(nodes, fn, []);
        };

        /**
        Non-Recursive
        */


        /**
        Sorting
        */
        var sortEvents = function(events) {
            return events.sort(function(a,b) {
                //console.log(a,b);
                return a.earlierThan(b);
            });
        };

        /**
        Create a graph object.
        */
        var graph = function() {
            var result = { };
            // 
            for (var i=0, iLen=self.events.length; i<iLen; i++) {
                result[i] = { };
            }
            //console.log(JSON.stringify(result));
            for (var i=0, iLen=self.events.length; i<iLen; i++) {
                //result[i] = { };
                for (var j=i, jLen=self.events.length; j<jLen; j++) {
                    result[j] = result[j];// || { };
                    // Check if not same node
                    if (i!==j) {
                        // Check if conflicts
                        if (!self.events[i].conflictsWith(self.events[j])) {
                            //console.log("Not Conflict", result);
                            if (self.events[i].earlierThan(self.events[j]) <= 0) {
                                console.log("Earlier");
                                result[i][j] = result[j];
                            } else {
                                console.log("Later");
                                result[j][i] = result[i];
                            }
                        } else {
                            //console.log("Conflicts");
                        }
                    }
                }                
            }
            // 
            return result;
        };

        // Traverse Graph
        self.traverse = function( ) {
            var g = graph();
            var results = [ ];
            //for (var i=0, len=self.events.length; i<len; i++) 
            for (var i=0, len=1; i<len; i++) 
            {
                var viable = [ ];
                var current = self.events[i];
                depthFirstSearch(i, g, function (n) {
                    var t = n.slice(0);
                    //console.log(t);
                    //viable.push(n.splice(0));
                    viable.push(t);
                });
                results.push(viable);
            }
            return { "events": self.events, "results": results, "graph": g };
        };

        /**
        Load
        */
        self.events = sortEvents(events);

        return self;
    };

    /**

    */
    self.schedule = function(events, options) {
        // Create Graph
        var graph = new self.EventGraph(events);
        // Traverse
        var results = graph.traverse();
        // Return
        return results;
    };

    return self;

})(window.scheduleController = window.scheduleController || { } );

/*
no.:  id: [ start  -   end  ] type
---------------------------------------------------------
 0:  234: [08:00AM - 09:00AM] Breakfast With Mindy
 1:  400: [09:00AM - 07:00PM] Check out stackoverflow.com
 2:  219: [11:40AM - 12:40PM] Go to Gym
 3:   79: [12:00PM - 01:00PM] Lunch With Steve
 4:  189: [12:40PM - 01:20PM] Lunch With Steve
 5:  270: [01:00PM - 05:00PM] Go to Tennis
 6:  300: [06:40PM - 07:20PM] Dinner With Family
 7:  250: [07:20PM - 08:00PM] Check out stackoverflow.com
*/
var courses = [ ];
var Event = scheduleController.Event;
courses.push( new Event({ days:[0], time: { start: 800, end: 900 }, interval: { start: new Date(), end: new Date() } }) );
courses.push( new Event({ days:[0], time: { start: 900, end: 1900 }, interval: { start: new Date(), end: new Date() } }) );
courses.push( new Event({ days:[0], time: { start: 1140, end: 1240 }, interval: { start: new Date(), end: new Date() } }) );
courses.push( new Event({ days:[0], time: { start: 1200, end: 1300 }, interval: { start: new Date(), end: new Date() } }) );
courses.push( new Event({ days:[0], time: { start: 1240, end: 1320 }, interval: { start: new Date(), end: new Date() } }) );
courses.push( new Event({ days:[0], time: { start: 1300, end: 1700 }, interval: { start: new Date(), end: new Date() } }) );
courses.push( new Event({ days:[0], time: { start: 1840, end: 1920 }, interval: { start: new Date(), end: new Date() } }) );
courses.push( new Event({ days:[0], time: { start: 1920, end: 2000 }, interval: { start: new Date(), end: new Date() } }) );

console.log( scheduleController.schedule(courses, {}) );

// Exmaple building graph object
var graph = {
    "1":  {},
    "2":  {},
    "3":  {},
    "4":  {},
    "5":  {},
    "6":  {},
    "7":  {},
    "8":  {},
    "9":  {},
    "10": {},
    "11": {},
    "12": {}
};
[[1,2], [1,7], [1,8], [2,3], [2,6], [3,4], [3,5], [8,9], [8,12], [9,10], [9,11]].forEach(function (edge) {
    graph[edge[0]][edge[1]] = graph[edge[1]];
    graph[edge[1]][edge[0]] = graph[edge[0]];
});
console.log(graph);

$(document).ready(function() {

    // page is now ready, initialize the calendar...

    $('#calendar').fullCalendar({
        // put your options and callbacks here
        'defaultView': 'agendaWeek'
        ,'height': '300'
    })

});