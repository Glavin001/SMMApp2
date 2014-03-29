/**
Custom Configuration
This will take in the argument `config` and manipulate it's configuration values.
*/
module.exports = function(config) {

    // Server configuration
    config.server.production = true;
    config.server.multiCore = true;
    config.server.maxLag = 10;
    config.server.autoScaling = true;

    // Twilio
    config.twilio.sid = "ACb08acfcdb50c00b820068d14fa4b5956";
    config.twilio.token = "598cfa4d5ea98c2e6adb5afa52956b51";
    config.twilio.number = "+17787620482"; // A number you bought from Twilio and can use for outbound communication
    
};