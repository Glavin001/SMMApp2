// Twilio Credentials
var creds = require("./twilio-cred");

//require the Twilio module and create a REST client 
var client = require('twilio')(creds.glavin.sid, creds.glavin.token);

module.exports = function (o) {
    client.messages.create({
        to: o.to,
        from: creds.glavin.number,
        body: o.message
    }, function (err, message) {
        console.log("Twilio SMS push error.sid: " + message.sid);
    });
}