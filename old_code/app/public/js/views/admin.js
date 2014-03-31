$(function () {
    $(document).ready(function() {

        var $versionNumber = $('.version-number');
        var $productionMode = $('.production-mode-enabled');
        var $redis = $('.redis-enabled');
        var $workers = $('.num-of-workers');
        var $port = $('.port-num');
        var $users = $('.num-of-users');
        var $os = $('.operating-system');
        var $uptime = $('.uptime');
        var $memoryUsage = $('.memory-usage');

        // Useful source: http://www.erichynds.com/blog/a-recursive-settimeout-pattern 
        // new hotness
        (function loopsiloop(){
           setTimeout(function(){
                // Load Specs
                $.getJSON("specs.json",function(data) {
                    //console.log(data);
                    $versionNumber.text(data.version);
                    $productionMode.text(data.production?"Yes":"No");
                    $redis.text(data.redis?"Enabled":"Disabled");
                    $workers.text(data.workers);
                    $port.text(data.port);
                    //$users.text(1);
                    $os.text(data.os.type+", "+data.os.arch);
                    $uptime.text(data.uptime+" seconds");
                    $memoryUsage.text( (data.memoryUsage.heapUsed / data.memoryUsage.heapTotal * 100).toFixed(2) +"% (" + (data.memoryUsage.heapUsed/1024/1024).toFixed(1) + " / " + (data.memoryUsage.heapTotal/1024/1024).toFixed(1) + " MB)");
                    // Recurse and refresh display!
                    loopsiloop(); // Recurse
                }).fail(function(jqXHR, status, error) {
                    setTimeout(loopsiloop, 10*1000);
                });
           }, 1000);
        })();

        // Charts
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });
        
        var chart;
        $('#activeUsers').highcharts({
            chart: {
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                events: {
                    load: function() {
    
                        // set up the updating of the chart each second
                        var series = this.series[0];
                        /*
                        setInterval(function() {
                            var x = (new Date()).getTime(), // current time
                                y = Math.random();
                            series.addPoint([x, y], true, true);
                        }, 1000);
                        */
                        var currentUsers = 0;
                        socket.on('currentUsersPerSecond', function(data) {
                            currentUsers = currentUsers + data;
                        });
                        var displayUsersPerSecond = function() {
                            var x = (new Date()).getTime(), // current time
                                y = currentUsers;
                            series.addPoint([x, y], true, true);
                            // Display
                            $users.text(y);
                            // Clear
                            currentUsers = 0;
                        };
                        setInterval(displayUsersPerSecond, 1000);
                    }
                }
            },
            title: {
                text: 'Active Users'
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150
            },
            yAxis: {
                title: {
                    text: 'Active Users'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                formatter: function() {
                        return '<b>'+ this.series.name +'</b><br/>'+
                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) +'<br/>'+
                        Highcharts.numberFormat(this.y, 2);
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: 'Active Users',
                data: (function() {
                    // generate an array of random data
                    var data = [],
                        time = (new Date()).getTime(),
                        i;

                    for (i = -19; i <= 0; i++) {
                        data.push({
                                x: time,
                                y: 0
                        });
                    }

                    return data;
                })()
            }]
        });

        var chart;
        $('#requestsPerSecond').highcharts({
            chart: {
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                events: {
                    load: function() {
    
                        // set up the updating of the chart each second
                        var series = this.series[0];
                        /*
                        setInterval(function() {
                            var x = (new Date()).getTime(), // current time
                                y = Math.random();
                            series.addPoint([x, y], true, true);
                        }, 1000);
                        */
                        var requestsPerSecond = 0;
                        socket.on('requestsPerSecond', function(data) {
                            //console.log('requestsPerSecond: ', data);
                            requestsPerSecond = requestsPerSecond + data;
                        });
                        var displayRequestsPerSecond = function() {
                            var x = (new Date()).getTime(), // current time
                                y = requestsPerSecond;
                            series.addPoint([x, y], true, true);
                            requestsPerSecond = 0;
                        };
                        setInterval(displayRequestsPerSecond, 1000);
                    }
                }
            },
            title: {
                text: 'Requests Per Second'
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150
            },
            yAxis: {
                title: {
                    text: 'Number of Requests'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                formatter: function() {
                        return '<b>'+ this.series.name +'</b><br/>'+
                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) +'<br/>'+
                        Highcharts.numberFormat(this.y, 2);
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: 'Requests Per Second',
                data: (function() {
                    // generate an array of random data
                    var data = [],
                        time = (new Date()).getTime(),
                        i;
                    /*
                    for (i = -19; i <= 0; i++) {
                        data.push({
                            x: time + i * 1000,
                            y: Math.random()
                        });
                    }
                    */
                    for (i = -19; i <= 0; i++) {
                        data.push({
                                x: time,
                                y: 0
                        });
                    }

                    return data;
                })()
            }]
        });

        $('#responseTime').highcharts({
            chart: {
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                events: {
                    load: function () {

                        // set up the updating of the chart each second
                        var series = this.series[0];
                        /*
                        setInterval(function() {
                        var x = (new Date()).getTime(), // current time
                        y = Math.random();
                        series.addPoint([x, y], true, true);
                        }, 1000);
                        */
                        var responseTime = 0;
                        socket.on('responseTime', function (data) {
                            responseTime = responseTime + data;
                        });
                        var displayResponseTime = function () {
                            var x = (new Date()).getTime(), // current time
                                y = responseTime;
                            series.addPoint([x, y], true, true);
                            responseTime = 0;
                        };
                        setInterval(displayResponseTime, 1000);
                    }
                }
            },
            title: {
                text: 'Average Response Time per Second'
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150
            },
            yAxis: {
                title: {
                    text: 'Average Response Time'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                        Highcharts.numberFormat(this.y, 5);
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: 'Average Response Time',
                data: (function () {
                    // generate an array of random data
                    var data = [],
                        time = (new Date()).getTime(),
                        i;

                    for (i = -19; i <= 0; i++) {
                        data.push({
                            x: time,
                            y: 0
                        });
                    }

                    return data;
                })()
            }]
        });

    });

    $('#lagPerSecond').highcharts({
            chart: {
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                events: {
                    load: function() {
    
                        // set up the updating of the chart each second
                        var series = this.series[0];
                        
                        var currentLag = 0;
                        socket.on('currentLagPerSecond', function(data) {
                            currentLag = currentLag + data;
                        });
                        var displayLagPerSecond = function() {
                            var x = (new Date()).getTime(), // current time
                                y = currentLag;
                            series.addPoint([x, y], true, true);
                            // Clear
                            currentLag = 0;
                        };
                        setInterval(displayLagPerSecond, 1000);
                        
                    }
                }
            },
            title: {
                text: 'Request Lag Per Second'
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150
            },
            yAxis: {
                title: {
                    text: 'Request Lag (ms)'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                formatter: function() {
                        return '<b>'+ this.series.name +'</b><br/>'+
                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) +'<br/>'+
                        Highcharts.numberFormat(this.y, 2);
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: 'Request Lag',
                data: (function() {
                    // generate an array of random data
                    var data = [],
                        time = (new Date()).getTime(),
                        i;

                    for (i = -19; i <= 0; i++) {
                        data.push({
                                x: time,
                                y: 0
                        });
                    }

                    return data;
                })()
            }]
        });
    
});