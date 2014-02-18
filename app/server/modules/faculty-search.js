var XHR = XMLHttpRequest();
var FD = FormData();

module.exports = function (argument) {
	for (name in argument) {
		FD.append(name,data[name]);
	}

	XHR.addEventListner('load', function (e) {
		console.log("Sent XHR request successfully");
	});
	XHR.addEventListner('error', function (e) {
		console.log("Sent XHR request unsuccessfully");
	});

	XHR.open('POST', "http://smuphone.smu.ca/sscript/search.asp");
	XHR.send(FD);
}