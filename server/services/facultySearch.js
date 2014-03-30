//
var facultySearch = require("../modules/faculty-search");
// Service

var tagsToReplace = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;'
};

// Escapes HTML so that evil people can't inject mean things into the page
function escapeHtml(str) {
  return str.replace(/[&<>]/g, function (tag) {
    return tagsToReplace[tag] || tag;
  });
}

function TodoStore() {
  this.todos = [];
  this.lastId = 0;
}

var FS;

//fname == first name , lname == last name
TodoStore.prototype.find = function (params, callback) {
  FS = facultySearch(params.fname,params.lname);
  callback(FS);
}

module.exports = TodoStore;