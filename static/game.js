var socket = io();

var movement = {
  up: false,
  down: false,
  left: false,
  right: false,
  chat: false
}
document.addEventListener('keydown', function(event) {
  switch (event.keyCode) {
    case 37: // A
      movement.left = true;
      break;
    case 38: // W
      movement.up = true;
      break;
    case 39: // D
      movement.right = true;
      break;
    case 40: // S
      movement.down = true;
      break;
	case 13: //enter
	  movement.chat =true;
	  break;
  }
});
document.addEventListener('keyup', function(event) {
  switch (event.keyCode) {
    case 37: // A
      movement.left = false;
      break;
    case 38: // W
      movement.up = false;
      break;
    case 39: // D
      movement.right = false;
      break;
    case 40: // S
      movement.down = false;
      break;
	case 13: //enter
	  movement.chat =false;
	  break;
  }
});

socket.emit('new player');
setInterval(function() {
	
  message = document.getElementById('chatbox').value;
  socket.emit('movement', movement);
  socket.emit('msg', message )
}, 1000 / 60);


//

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;
var context = canvas.getContext('2d');
socket.on('state', function(players) {
  context.clearRect(0, 0, 800, 600);
  context.fillStyle = 'green';
  for (var id in players) {
    var player = players[id];
	
    context.beginPath();
    context.arc(player.x-20, player.y, 10, 0, 2 * Math.PI);
	ctx.fillText(player.message,player.x,player.y);
    context.fill();
  }
});

