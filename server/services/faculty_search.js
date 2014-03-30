//
var facultySearch = require("../modules/faculty-search");
// Service


//fname == first name , lname == last name
module.exports = {
    find: function (params, callback) {
        facultySearch(params.fname, params.lname, function(err, data) {
            return callback(err, data);
        });
    }
};