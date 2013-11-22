// Map 
var simpleGraph = { };
$.getJSON("/data/pathNodes.geojson", function(graphJson) {

	console.log(graphJson);

	// Compile to simple JSON structure.
	simpleGraph = { }; // Clear
	var features = graphJson.features;
	for (var i=0, iLen=features.length; i<iLen; i++)
	{
		var feature = features[i];
		var properties = feature.properties;
		var geometry = feature.geometry;
		var id = properties.id;
		var to = (properties.to || "").split(',');
		//console.log(to);
		var startPoint = L.latLng(geometry.coordinates[1], geometry.coordinates[0]);
		// Iterate thru relationships
		var rels = { }; 
		for (var j=0, jLen=to.length; j<jLen; j++) 
		{
			var currId = to[j];
			//console.log(currId);
			// Find node
			var currNode = null;
			for (var n=0, nLen=features.length; n<nLen; n++) 
			{
				if ( currId === features[n].properties.id )
				{
					currNode = features[n];
					break;
				}
			}
			if (currNode !== null)
			{
				// Found
				var endPoint = L.latLng(currNode.geometry.coordinates[1], currNode.geometry.coordinates[0]);
				var distance = startPoint.distanceTo(endPoint);
				//console.log(distance);
				rels[currId] = distance;
			}
		}
		simpleGraph[id] = rels;
	}
	
	console.log(simpleGraph);

	/*
	var graphJson = {a:{b:3,c:1},b:{a:2,c:1},c:{a:4,b:1}};
	var graph = new Graph(graphJson);
	console.log( graph.findShortestPath('c', 'a', 'b') );
	*/

	var smuGraph = new Graph(simpleGraph);
	//var directions = smuGraph.findShortestPath('LA-Entrance-1', 'Outside-2', 'Outside-8');
	//var directions = smuGraph.findShortestPath('LA-Entrance-1', 'McNally-East-Entrance-1', 'McNally-North-Entrance-1') || [ ];
	var directions = smuGraph.findShortestPath('Outside-17', /*'A-Entrance-1', 'McNally-East-Entrance-2',*/ 'Outside-6') || [ ];
	console.log( directions );

	var poly = [ ];
	for (var i=0, iLen=directions.length; i<iLen; i++)
 	{
 		var currId = directions[i];
 		console.log(currId);
 		var currNode = null;
		for (var j=0, jLen=features.length; j<jLen; j++)
 		{
 			var feature = features[j];
 			if (feature.properties.id === currId)
 			{
 				currNode = feature;
 			}
 		}
 		if (currNode) {
 			var point = L.latLng( currNode.geometry.coordinates[1], currNode.geometry.coordinates[0] );
 			console.log(point);
 			poly.push( point );
 		} else {
 			console.log("Error! Could not find '"+currId+"'.");
 			break;
 		}
 	}
	var polygon = L.polyline(poly, {
				weight: 20,
				color: "#428bca"
		}).addTo(map)

	
	var directionsLayer = L.geoJson();
	$.getJSON("/data/pathNodes.geojson", function(geojsonFeature) {
		directionsLayer = L.geoJson(geojsonFeature, {
			style: {
				weight: 10,
				color: "#428bca"
			}
		}).addTo(map);
	});
	

});
