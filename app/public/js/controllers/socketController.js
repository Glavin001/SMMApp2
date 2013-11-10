(function( socketController, undefined ) {
	var self = socketController;
	var url = "/"; 
	var socket = null;
	self.getSocket = function () {
		if (!socket) {
			socket = io.connect(url);
		}
		return socket;
	};

	// Get the initial socket connection
	this.socket = self.getSocket();

	return self;
})(window.socketController = window.socketController || { } );