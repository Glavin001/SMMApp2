(function( editorController, undefined ) {
	var self = editorController;

	self.initParent = function() {
		var myWindow = window.open("/builder-editor","_blank","width=500,height=500");
		//myWindow.document.write("<p>This is 'myWindow'</p>");
		//myWindow.focus();
		//myWindow.opener.document.write("<p>This is the source window!</p>");
		console.log('Init parent with child: ', myWindow);
	};

	self.initChild = function() {
		console.log('Init child with parent: ', window.opener);
		
		var editor = CodeMirror.fromTextArea($("#codeEditor").get(0), {
			mode: "application/json",
			lineNumbers: true,
			matchBrackets: true,
			continueComments: "Enter",
			indentUnit: 4,
			smartIndent: true,
			tabSize: 4,
			indentWithTabs: true,
			lineWrapping: true,
			tabMode: "indent",
			viewportMargin: Infinity
		});

	};

})(window.editorController = window.editorController || { } );