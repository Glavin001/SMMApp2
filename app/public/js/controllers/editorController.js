(function( editorController, undefined ) {
	var self = editorController;
	var indentSpaces = 2;

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
		var editor = CodeMirror.fromTextArea($el.get(0), {
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

		$.getJSON("/data/campus.geojson", function(geojsonFeature) {
			var str = JSON.stringify(geojsonFeature, undefined, indentSpaces);
			editor.setValue(str);
		});

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
	};

})(window.editorController = window.editorController || { } );