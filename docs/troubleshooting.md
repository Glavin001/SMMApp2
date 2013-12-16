# Troubleshooting

List of common and easily solvable issues.

## Installation


## Running

======
### Redis not running
Error message:
```bash
events.js:72
        throw er; // Unhandled 'error' event
              ^
Error: Redis connection to 127.0.0.1:6379 failed - connect ECONNREFUSED
    at RedisClient.on_error (/Users/glavin/Documents/Project Dev/SMMApp2/node_modules/socket.io/node_modules/redis/index.js:149:24)
    at Socket.<anonymous> (/Users/glavin/Documents/Project Dev/SMMApp2/node_modules/socket.io/node_modules/redis/index.js:83:14)
    at Socket.EventEmitter.emit (events.js:95:17)
    at net.js:426:14
    at process._tickCallback (node.js:415:13)
```

Solution:
1) Start redis-server, or
2) add the `--disable-redis-server` argument.
For instance, `node app.js --disable-redis-server`.

======

### Dependency not installed
The following error occurs when the Node dependencies are not installed.
Error message: 
```bash
module.js:340
    throw err;
          ^
Error: Cannot find module 'XYZ'
    at Function.Module._resolveFilename (module.js:338:15)
    at Function.Module._load (module.js:280:25)
    at Module.require (module.js:362:17)
    at require (module.js:378:17)
    at Object.<anonymous> (C:\Users\Owner\Projects\SMMApp2\app.js:24:15)
    at Module._compile (module.js:449:26)
    at Object.Module._extensions..js (module.js:467:10)
    at Module.load (module.js:356:32)
    at Function.Module._load (module.js:312:12)
    at Module.runMain (module.js:492:10)
```

Solution:
```bash
npm install
npm update
```

