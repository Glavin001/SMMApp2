// See Leaflet API documentation: http://leafletjs.com/reference.html
// Settings
var apiKey = "9ac9ffb52a5044958ed21e71aa77805b";
var smuLocation = L.latLng(44.63132547176038, -63.57957065105438);
var mapId = "map"; // HTML DOM element with id=mapId
// Setup map
var cloudmadeUrl = 'http://{s}.tile.cloudmade.com/'+apiKey+'/997@2x/256/{z}/{x}/{y}.png';
var cloudmadeAttribution = 'Map data &copy; 2011 OpenStreetMap contributors, Imagery &copy; 2011 CloudMade';
//     'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
var normalTileLayer = L.tileLayer(cloudmadeUrl, {
    attribution: cloudmadeAttribution, 
    maxZoom: 19
});
/*
var midnightTileLayer  = L.tileLayer(cloudmadeUrl, {
	styleId: 999, 
	attribution: cloudmadeAttribution, 
	maxZoom: 18 
});
*/
// 
var map = L.map(mapId, {
	center: smuLocation,
	maxZoom: 22,
	zoom: 17,
	layers: [ normalTileLayer ]
});

var features = L.featureGroup([]).addTo(map);
var buildings = L.featureGroup([]).addTo(features);
var walkWays = L.featureGroup([]).addTo(features);

var baseMaps = {
    "Normal": normalTileLayer,
    //"SMU": features
   	// , "Night View": midnightTileLayer
};
if (baseMaps.length == 0) {
	baseMaps = null;
}

var overlayMaps = {
    "Buidlings": buildings,
    "Walk Ways": walkWays 
};
L.control.layers(baseMaps, overlayMaps).addTo(map);

// Center around SMU campus
//map.setView(smuLocation, 17);

/*
// Geolocation
map.locate({setView: true, maxZoom: 18});
function onLocationFound(e) {
    var radius = e.accuracy / 2;

    L.marker(e.latlng).addTo(map)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();

    L.circle(e.latlng, radius).addTo(map);
}
map.on('locationfound', onLocationFound);
function onLocationError(e) {
    alert(e.message);
}
map.on('locationerror', onLocationError);
*/

map.on('mousemove', function(e) {
    //console.log("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng);
});

var poly = [];
map.on('click', function(e) {
    // console.log("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng);
    poly.push(e.latlng);
});

var history = [];
$("body").keyup(function(event){
    if(event.keyCode == 13) {
    	// Output
    	console.log(poly);
    	history.push(poly);
    	// Draw
		var polygon = L.polyline(poly).addTo(buildings);
		poly = []; // Clear
    }
});

function exportPoly() {
	var e = [ ];
	for (var i=0, iLen=history.length; i<iLen; i++) {
		var y = [ ];
		for (var j=0, jLen=history[i].length; j<jLen; j++) {
			var x = [history[i][j].lat, history[i][j].lng];
			y.push(x);
		}
		e.push(y);
	}
	console.log(JSON.stringify(e));
}


//var smuData = [[[44.631520166251335,-63.58042359352112],[44.63063449192218,-63.580069541931145],[44.63063449192218,-63.57991933822632],[44.63153543637987,-63.58023047447204]],[[44.63113841173226,-63.57840657234192]],[[44.63221495303214,-63.580241203308105],[44.63231611634771,-63.5802760720253],[44.63235238239906,-63.580099046230316],[44.632258854115285,-63.58006685972213],[44.63227412404945,-63.57990860939025],[44.63217105191579,-63.579857647418976],[44.63213669449724,-63.58001053333283],[44.63205652710815,-63.57997566461563],[44.63200689962131,-63.58015537261963],[44.63210233705833,-63.5801875591278],[44.63206797959909,-63.58034044504166],[44.63217677815026,-63.580404818058014],[44.632220679262254,-63.580241203308105]]];
//L.multiPolygon(smuData).addTo(buildings);
var myLayer = L.geoJson().addTo(buildings);
$.getJSON("/data/campus.geojson", function(geojsonFeature) {
	myLayer.addData(geojsonFeature);
});


