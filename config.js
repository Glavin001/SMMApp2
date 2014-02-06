/**
Configuration Module
*/

// Dependencies
var pjson = require('./package.json');
var program = require('commander');
var fs = require('fs');
var numCPUs = require('os').cpus().length;
// Start configuration
var config = {}

// Server (Basic)
config.server = { };
config.server.production = ((process.env.NODE_ENV=="production"?true:false) || false);
config.server.port = process.env.WEB_PORT || 8080;
config.server.multiCore = false;
config.server.workers = numCPUs;

// AutoScaling: 
// Uses only 1 worker until under heavy load, 
// then scales up to (config.server.workers) number of workers. 
// When disabled, and multiCore enabled, the maximum number of workers will be running at all times.
config.server.autoScaling = false;

// Toobusy, https://github.com/lloyd/node-toobusy
config.server.toobusy = false; // Enable toobusy by default
config.server.maxLag = 70; // Maximum amount of time in milliseconds that the event queue is behind, before we consider the process too busy.

// Advanced
/** 
Redis
For more options see: https://github.com/mranney/node_redis#rediscreateclientport-host-options 
*/
config.redis = {
    enabled: false,
    port: 6379,
    host: "127.0.0.1",
    options: { }
};
// MongoDB
config.mongodb = {
    enabled: true,
    port: 27017,
    host: 'localhost',
    database: 'smmapp'
};
// Twilio
config.twilio = {
    enabled: false,
    sid: undefined,
    token: undefined,
    number: undefined
};
// E-Mail
config.email = {
    enabled: false,
    smtp: {
        service: "Gmail",
        auth: {
            user: "gmail.user@gmail.com",
            pass: "userpass"
        }
    }
};
// Facebook
config.facebook = {
    enabled: false,
    appId: "YOUR_APP_ID",
    secret: "YOUR_APP_SECRET"
};
// Twitter
config.twitter = {
    enabled: false
    , consumerKey: '...'
    , consumerSecret: '...'
    , accessToken: '...'
    , accessTokenSecret: '...'
};
// Google (Google Account, Gmail, Google+, etc)
config.google = {
    enabled: false,
    apiKey: "API_KEY"
}

/*
config.twitter = {};
config.redis = {};
config.web = {};

config.default_stuff =  ['red','green','blue','apple','yellow','orange','politics'];
config.twitter.user_name = process.env.TWITTER_USER || 'username';
config.twitter.password=  process.env.TWITTER_PASSWORD || 'password';
config.redis.uri = process.env.DUOSTACK_DB_REDIS;
config.redis.host = 'hostname';
config.redis.port = 6379;
config.web.port = process.env.WEB_PORT || 9980;
*/

/**
Load Custom Configuration
*/

try {
    // Attempt to load custom configuration file
    var customConfig = require('./config.custom')(config);
    console.log("Custom configuration was successfully loaded from './config.custom.js'.");
} catch(e) {
    console.warn("Custom configuration not found or was invalid.");
    //console.log("Use `cp config.custom.sample.js config.custom.js` to create a custom configuration from the sample.");
    //process.exit(1); // Use the default, gracefully and silently fallback.

    // Check if custom configuration file exists
    fs.exists("./config.custom", function(exists) {
      if (!exists) {
        // Does not exist
        // Create it by copying from config.custom.sample.js
        console.log("Custom configuration file does not exist so one is being created from config.custom.sample.js");
        fs.createReadStream('./config.custom.sample.js').pipe(fs.createWriteStream('config.custom.js'));
      }
    });
}

/**
Allow for command line arguments to overwrite current configuration
*/
// Process command line arguments
config.processArgs = function(argv) {
    program
        .version(pjson.version)
        .option('-p, --port <port>', 'Custom Port number for website. Default is ['+config.server.port+'].', Number, config.server.port)
        .option('--production', "Turn on Production mode.", Boolean, config.server.production)
        .option('--multi-core', "Turn on Multi-Core support.", Boolean, config.server.multiCore)
        .option('--workers <workers>', "Custom number of Worker nodes. Default is number of CPUs ["+config.server.workers+"]. Requires multi-core enabled.", Number, config.server.workers)
        .option('--disable-redis', "Turn off usage of Redis. Will disable Multi-Core support.", Boolean, !config.redis.enabled)
        .option('--custom-config <absolutePathToConfig>', "Load a custom configuration module. Remember to use ./ in front of filename.js", String)
        .option('--disable-toobusy', "Turn off TooBusy.", Boolean, !config.server.toobusy)
        .option('--max-lag <lag>', "Maximum time (milliseconds) that the event queue is behind, before the request is considered too busy.  Default is ["+config.server.maxLag+"] ms. Requires TooBusy enabled.", Number, config.server.maxLag)
        .option('--display-config', "Print the current configuration.", Boolean, false)
        .parse(argv);

    /*
    // Allow configuration to toggle Multi-Core.
    if (program.multiCore === undefined) {
        program.multiCore = config.multiCore;
    }
    // Allow configuration to toggle Redis Store
    if (program.disableRedisStore === undefined) {
        program.disableRedisStore = config.disableRedisStore;
    }
    // Allow configuration to toggle Production mode
    if (program.production === undefined) {
        program.production = config.production_mode;
    }
    */

    // Allow argments to load a custom configuration file
    if (program.customConfig !== undefined) {
        try {
            // Attempt to load custom configuration file
            var customConfig = require(program.customConfig)(config);
            console.log("Custom configuration was successfully loaded from '"+program.customConfig+"'.");
        } catch(e) {
            console.warn("Custom configuration at '"+program.customConfig+"' was not found or was invalid.");
        }
    }

    // Allow arguments to edit Port
    if (program.port !== undefined) {
        config.server.port = program.port;
    }
    // Allow arguments to toggle Production mode
    if (program.production !== undefined) {
        config.server.production = program.production_mode;
    }
    // Allow arguments to toggle Multi-Core.
    if (program.multiCore !== undefined) {
        config.server.multiCore = program.multiCore;
    }
    // Allow arguments to edit Workers
    if (program.workers !== undefined) {
        config.server.workers = program.workers;
    }   
    // Allow arguments to toggle Redis Store
    if (program.disableRedisStore !== undefined) {
        config.redis.enabled = !program.disableRedisStore;
    }
    // Allow arguments to toggle TooBusy
    if (program.disableToobusy !== undefined) {
        config.server.toobusy = !program.disableToobusy;
    }
    // Allow arguments to edit Workers
    if (program.maxLag !== undefined) {
        config.server.maxLag = program.maxLag;
    }   

    // Display the current configuration
    if (program.displayConfig) {
        console.log(JSON.stringify(config, null, 4));
        process.exit(0);
    }

};

// Export module
module.exports = config;