(function( socketController, undefined ) {
	var self = socketController;
	var url = "/"; 
	var socket = null;
	self.getSocket = function (callback) {
		if (!io)
			return;
		if (!socket) {
			socket = io.connect(url);
		}
		return callback && callback(socket);
	};

	// Get the initial socket connection
	self.getSocket(function(socket) {
		this.socket = socket;
	});
	
	return self;
})(window.socketController = window.socketController || { } );