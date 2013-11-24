$(function () {
    $(document).ready(function() {
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
    });
    
});