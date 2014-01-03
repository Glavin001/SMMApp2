var forever = require('forever-monitor');

var child = new (forever.Monitor)('app.js', {
    max: 3,
    //silent: true,
    watch: true,
    watchDirectory: ".",
    'logFile': 'logs/forever.log', // Path to log output from forever process (when daemonized)
    'outFile': 'logs/forever.out', // Path to log output from child stdout
    'errFile': 'logs/forever.err'
});

child.on('exit', function () {
    console.error('app.js has exited after 3 restarts.');
});

child.start();