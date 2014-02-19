var XHR = XMLHttpRequest();
var FD = FormData();

module.exports = function (fname,lname) {
	FD.append('txtFirstName',fname);
	FD.append('txtLastName',lname);
	FD.append('cmdSubmit','Submit');

	XHR.addEventListener('load', function (e) {
		console.log("Sent XHR request successfully");
	});

	XHR.addEventListener('error', function (e) {
		console.log("Sent XHR request, got error");
	});

	XHR.open('POST', "http://smuphone.smu.ca/sscript/search.asp");
	XHR.send(FD);
}