(function( socketController, undefined ) {
	var self = socketController;
	var url = "/"; 
	var socket = null;
	self.getSocket = function (callback) {
		if (!io)
			return;
		if (!socket) {
			socket = io.connect(url);
			// bind to socket
			socket.on('signal', function(data) {
				if (data.message === "shutdown") {
					console.info("Server is shutting down for maintenance.");
				}
			});
		}
		return callback && callback(socket);
	};

	// Get the initial socket connection
	self.getSocket(function(socket) {
		this.socket = socket;
	});
	
	return self;
})(window.socketController = window.socketController || { } );