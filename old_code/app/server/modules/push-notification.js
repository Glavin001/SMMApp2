// Twilio Credentials
var config = require("../../../config");

//require the Twilio module and create a REST client 
var client = require('twilio')(config.twilio.sid, config.twilio.token);

module.exports = function (o) {
    client.messages.create({
        to: o.to,
        from: config.twilio.number,
        body: o.message
    }, function (err, message) {
        console.log("Twilio SMS push error.sid: " + message.sid);
    });
}