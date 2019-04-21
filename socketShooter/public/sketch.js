/* A way - new player sends his object to the server, then server broadcasts it and his position
 *   later on only guid and new position are sent, and stored in every client's in array of objects
 * B way - data is broadcasted and players are drawn "on the spot"
*/
function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("canvas-container")
  background("white");

  socket.emit("newPlayerConnected", {guid: plr.guid, color: plr.clr}); // A way
  console.log(plr.clr)
}

function draw(){
  // let beginOfLoopFC = frameCount;
  // background(0,222,100);
  plr.update(socket);
  
  // DRAW OTHER PLAYERS
  // if(frameCount - beginOfLoopFC > 20){
    socket.on('otherPlayerMoved', function(data) {
      // let clr = data.color;
      // try { fill(clr); } catch(e) { /*console.log(e.name);*/ }
      ellipse(data.x,data.y,30,30);
      
      // try { fill(plr.color); } catch(e) { }
    });
  // }
}

/* GLOBALS / CONFIG */
var socket = io();
let playerGuid = Date.now().toString().substr(5) + "_" + Math.random().toString().substr(2,3);
let randomColor = [
  Math.ceil(Math.random()*255), Math.ceil(Math.random()*255), Math.ceil(Math.random()*255)
];
randomColor = HTML5COLORS[Math.floor(Math.random()*HTML5COLORS.length)];
var plr = new Player(guid = playerGuid, 300, 300, 100, 10, randomColor, projectileEmitter);



var projectileEmitter = {
  projectileType  : "bullet",
  projectileSpeed : 8,
  fireMode  : "auto",
  fireRate  : 5,
  damage 	  : 10
}




// dump 
/*
var playerColor = 'black';

function draw() {
    // background(0, 255, 100);
}

function mouseDragged(){
    stroke(playerColor);
    strokeWeight(5);

    line(mouseX, mouseY, pmouseX, pmouseY);
    onMouseDown(playerColor, mouseX, mouseY, pmouseX, pmouseY);
}

function onMouseDown(color, x, y, prevx, prevy) {
    var data = {
        clr : color,
        x : x,
        y : y,
        px : prevx,
        py : prevy
    };

    socket.emit('playerMouseDown', data);
}

function sendChatMessage(){
    let messageBody = $('#message-body')[0].value;
    if(!messageBody.length || messageBody.match(/(^\s*$)/)){
      alert("Cannot send empty message");
      return;
    }
    console.log(messageBody);

    var data = {
        username : socket.username,
        msg : messageBody.trim(),
    };

    socket.emit('chatMessage', data);
    $('#message-body')[0].value = null;
}

function setrgb(r, g, b){
  console.log(r)
  console.log(r[0])
  console.log(r.substr(0,3))
  console.log(r.substr(3,2))
  console.log(r.substr(5,3))

    if(r[0] == "#"){
      hex
      g = unhex(r.substr(3,2));
      b = unhex(r.substr(5,2));
      r = unhex(r.substr(1,2));
    }
    playerColor = 'rgb(' + r + ',' + g + ',' + b + ')';
    console.log(playerColor);

}

function readKey(e){
  var k = e.key;
  k==="Enter" ? sendChatMessage() : null;
};*/