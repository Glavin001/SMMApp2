(function( editorController, undefined ) {
	var self = editorController;
	var indentSpaces = 2;
	var editor = null;

	self.initParent = function() {
		var myWindow = window.open("/builder-editor","_blank",
			"width=500,height=500,menubar=no,status=no,resizable=yes,titlebar=yes,toolbar=no");
		//myWindow.document.write("<p>This is 'myWindow'</p>");
		//myWindow.focus();
		//myWindow.opener.document.write("<p>This is the source window!</p>");
		console.log('Init parent with child: ', myWindow);
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
			extraKeys: { "Ctrl-Q": "toggleComment" }
		});

		// Load existing GeoJSON data
		$.getJSON("/data/campus.geojson", function(geojsonFeature) {
			self.loadGeo(geojsonFeature);
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
		var interval = 100;
		setInterval(function() {
			// Check if already 
			if ( $('input.auto-render').prop('checked')  ) {
				// Render
				self.render();
			}
		}, interval);
		self.render(); // First render
		// Render on button press
		$(".render-btn").click(function() {
			self.render();
		});
	};

	// Load JSON
	self.loadGeo = function(geo) {
		var str = JSON.stringify(geo, undefined, indentSpaces);
		editor.setValue(str);	
	};

	// Render GeoJSON
	self.render = function() {
		var w = window.opener;
		var map = w.map;
		var smuLayer = w.smuLayer;
		// Clear old SMU Layer
		smuLayer.clearLayers();
		//map.removeLayer(smuLayer);
		// Create new GeoJSON Layer
		//smuLayer = w.L.geoJson();
		var j = editor.getValue();
		try {
			var geojsonFeature = JSON.parse(j);
			console.log(geojsonFeature);
			smuLayer.addData(geojsonFeature);
			// Add Layer to map
			//smuLayer.addTo(map);
		} catch(err) {
			// Parse was unsuccessful
			console.log("Failed");
		}
	};

})(window.editorController = window.editorController || { } );