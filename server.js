var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');
var app = express();
var server = http.Server(app);
var io = socketIO(server);
var server_port = process.env.PORT || process.env.PORT || 80;
var server_host = process.env.HOST || '0.0.0.0';
var testport = 5000;
app.use('/static', express.static(__dirname + '/static'));
// Routing
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, '/static/index.html'));
});
// Starts the server.
server.listen(server_port, function() {
  console.log('Starting server on port 5000');
});
// Add the WebSocket handlers
io.on('connection', function(socket) {
});
String.prototype.trunc = String.prototype.trunc ||
      function(n){
          return (this.length > n) ? this.substr(0, n-1) + '' : this;
      };


var players = {};
io.on('connection', function(socket) {
  socket.on('new player', function() {
    players[socket.id] = {
      x: 300,
      y: 300,
	  timeout:0,
	  
	  name:"nobody",
	  message: "",
    };
  });
  socket.on('disconnect', function() {
    delete players[socket.id];
  });
  socket.on('movement', function(data) {
	  
	

    var player = players[socket.id] || {};
	
	
    if (data.left) {
      player.x -= 5;

    }
    if (data.up) {
      player.y -= 5;
	  
    }
    if (data.right) {
      player.x += 5;
	 
    }
    if (data.down) {
      player.y += 5;
	
    }
	if (data.chat) {
		io.sockets.emit('message', player.message);
		
	}
  });
  
  socket.on('msg', function(data) {
    var player = players[socket.id] || {};
    
      player.message = data.message.trunc(75);
	  player.name = data.name.trunc(15);
    
    
  });
});


setInterval(function() {
  io.sockets.emit('state', players);
  
}, 1000 / 60);
