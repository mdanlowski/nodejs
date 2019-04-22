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
var playersConnected = 0;
// STATIC DATA IS PUT HERE TO AVOID HAVING TO SEND IT BACK AND FORTH BETWEEN PLAYERS
var ALLPLAYERS = {};

io.sockets.on('connection', function(socket){
	/* ------------ NEW PLAYER SETUP ---- */
	playersConnected++;
  console.log("--> player connected\t" + socket.id + "\t| " + playersConnected);
  socket.on("newPlayerConnected", function(newPlayerData){
		// copy all players data only without the most recent player
		let earlierPlayers = ALLPLAYERS;
		// add most recent player to the hash
		ALLPLAYERS[socket.id] = newPlayerData;
		newPlayerData.id = socket.id;
		// broadcast newest player to already connected players
		socket.broadcast.emit('playerConnected', newPlayerData);
		// send older players to newest player
		socket.emit('beforePlayers', earlierPlayers);

  });

	/* ------------ INCOMING ------------ */
	socket.on('playerMoveEvent', function(data){
    data.id = socket.id
		socket.broadcast.emit('otherPlayerMoved', data);
		//console.log(JSON.stringify(data));
	});

	socket.on('disconnect', function() {
		console.log("<-- player disconnected\t| " + socket.id + "\t| " + playersConnected);
		delete ALLPLAYERS[socket.id];
		io.sockets.emit('playerDisconnected', socket.id);
		playersConnected--;
	});


	socket.on('playerMouseDown', function(data) {
		socket.broadcast.emit('playerMouseDown', data);
	});

	socket.on('chatMessage', function(data) {
		// capture and reemit chat msgs
		//console.log(data);
		io.sockets.emit('chatMessage', data);
	});

	/* ------------ OUTGOING ------------ */
	socket.emit('serverMsg', { 
		msg : 'hello'
	});


});

