var express = require('express');
var path = require('path')
var app = express();
var srv = require('http').Server(app);

// Routing
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/index.html');
});

// app.get('/public/style.css', function(req, res) {
// 	res.sendFile(__dirname + '/public/style.css');
// });

// app.use('/public/', express.static(__dirname + '/public'));
// app.use(express.static(__dirname + '/public'));
app.use('/public', express.static(path.join(__dirname, '/public/')));

// srv.listen(process.env.PORT);
srv.listen(process.env.PORT || 3000);
console.log('--> server initialized on port ' + srv.address().port);

// Sockets
var io = require('socket.io')(srv, {});

var clientsConnected = 0;

io.sockets.on('connection', function(socket){

	clientsConnected++;
	console.log('--> client connected: ' + socket.id, '\nclient count: ' + clientsConnected);
	broadcastClientCount(true, socket.id);

	// incoming
	socket.on('clientMouseDown', function(data) {
		socket.broadcast.emit('clientMouseDown', data);
	});

	socket.on('chatMessage', function(data) {
		// capture and reemit chat msgs
		console.log(data);
		io.sockets.emit('chatMessage', data);
	});

	// outgoing
	socket.emit('serverMsg', { 
		msg : 'hello'
	});


	socket.on('disconnect', function() {
		console.log("--> client disconnected");
		clientsConnected--;
		broadcastClientCount(false);
	});

});

// Subroutines
function broadcastClientCount(){
	// broadcast client count to all
	io.sockets.emit(arguments[0] ? 'newClient' : 'DC', {
		msg : arguments[0] ? "A new client just connected" : "A client just disconnected",
		clientCount : clientsConnected 
		}
	);

	if(arguments[0]){
		io.sockets.emit('chatMessage', {
			username : 'Server',
			msg : "Welcome, " + arguments[1] + "! Hello from the server!"
		});

	}
}