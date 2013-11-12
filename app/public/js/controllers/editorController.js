(function( editorController, undefined ) {
	var self = editorController;
	var indentSpaces = 2;
	var editor = null;
	var w = window.opener || window;
	var parent = window.opener;
	var child = null;
	var map = w.map;
	var L = w.L;

	self.initParent = function() {
		child = window.open("/builder-editor","_blank",
			"width=500,height=500,menubar=no,status=no,resizable=yes,titlebar=yes,toolbar=no");
		//myWindow.document.write("<p>This is 'myWindow'</p>");
		//myWindow.focus();
		//myWindow.opener.document.write("<p>This is the source window!</p>");
		console.log('Init parent with child: ', child);
	};

	self.initChild = function() {
		console.log('Init child with parent: ', window.opener);
		var $el = $("#codeEditor");
		editor = CodeMirror.fromTextArea($el.get(0), {
			mode: "application/json",
			lineNumbers: true,
			matchBrackets: true,
			continueComments: "Enter",
			indentUnit: indentSpaces,
			smartIndent: true,
			tabSize: indentSpaces,
			indentWithTabs: true,
			lineWrapping: true,
			tabMode: "indent",
			viewportMargin: Infinity,
		    foldGutter: {
		    	rangeFinder: new CodeMirror.fold.combine(CodeMirror.fold.brace, CodeMirror.fold.comment)
		    },
		    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
			extraKeys: { "Ctrl-Q": "toggleComment" }
		});
  		//editor.foldCode(CodeMirror.Pos(8, 0));

		// Load existing GeoJSON data
		$.getJSON("/data/campus.geojson", function(geojsonFeature) {
			self.loadGeo(geojsonFeature);
			self.render(); // First render
		});
		self.loadGeo({});

		// Handle resizing
		function resizeEditor() {
			var height = $(window).height() - $('.tab-content').offset().top - 1;
			$('.tab-content').height(height);
		};
		var resizeTimer;
		$(window).resize(function() {
		    clearTimeout(resizeTimer);
		    resizeTimer = setTimeout(resizeEditor, 100);
		});
		resizeEditor(); // Resize

		// Start auto render
		//var interval = 100;
		editor.on('change', function(instance, changeObj) {
		//setInterval(function() {
			// Check if already 
			if ( $('input.auto-render').prop('checked')  ) {
				// Render
				self.render();
			} else {
				// Validate JSON even though not rendering
				var j = editor.getValue();
				try {
					var geojsonFeature = JSON.parse(j);
					$(".render-btn").removeClass("btn-danger").addClass('btn-success'); 
				} catch(err) {
					// Parse was unsuccessful
					$(".render-btn").removeClass("btn-success").addClass('btn-danger'); 
				}
			}
		//}, interval);
		});
		// Render on button press
		$(".render-btn").click(function() {
			self.render();
		});

	};

	// Add click event handler
	map.on('click', onMapClick);

	// Load JSON
	self.loadGeo = function(geo) {
		var str = JSON.stringify(geo, undefined, indentSpaces);
		editor.setValue(str);	
	};

	// Render GeoJSON
	self.render = function() {
		var smuLayer = w.smuLayer;
		// Create new GeoJSON Layer
		//smuLayer = w.L.geoJson();
		var j = editor.getValue();
		try {
			var geojsonFeature = JSON.parse(j);
			// Clear old SMU Layer
			smuLayer.clearLayers();
			//map.removeLayer(smuLayer);
			smuLayer.addData(geojsonFeature);
			// Add Layer to map
			//smuLayer.addTo(map);
			$(".render-btn").removeClass("btn-danger").addClass('btn-success'); 
		} catch(err) {
			// Parse was unsuccessful
			//console.warn("GeoJSON is not valid.");
			$(".render-btn").removeClass("btn-success").addClass('btn-danger'); 
		}
	};


	var vertices = [ ];
	function onMapClick(e) {
		console.log('onMapClick', e);
	    var marker = new w.L.marker(e.latlng, {draggable:'true'});
	    marker.on('dragend', function(event){
            // Update position
            var marker = event.target;
            var position = marker.getLatLng();
            console.log(position);
            marker.setLatLng(position,{draggable:'true'}).bindPopup(position).update();

		    renderVertices(vertices);
	    });
	    marker.on('dblclick', function(event) {
	    	// Remove
			var index = vertices.indexOf(marker);
			if (index > -1) {
			    vertices.splice(index, 1);
			}
			map.removeLayer(marker);
		    renderVertices(vertices);
	    });
	    map.addLayer(marker);
	    vertices.push(marker);

	    renderVertices(vertices);
	};
	var polygon = null;
	function renderVertices(v) {
		console.log(v);
		//polygon && polygon.clearLayers();
		polygon && map.removeLayer(polygon);
		var poly = [ ];
		for (var i=0, len=v.length; i<len; i++) {
			console.log(v[i]);
			poly.push(v[i].getLatLng());
		}
		console.log(poly);
		polygon = L.polygon(poly).addTo(map);
	}


})(window.editorController = window.editorController || { } );