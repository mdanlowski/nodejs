function setup() {
    let cCounter = $('#client-count')[0];
    
    createCanvas(640, 640);

    // socket = io.connect('http://localhost:3000');
    socket = io();

    socket.on('clientMouseDown', function(data) {
        strokeWeight(5);
        stroke(data.clr); 
        line(data.x, data.y, data.px, data.py);
    });



    // technical
    socket.on('DC', function(data) {
        console.log(data.msg);
        cCounter.innerHTML = data.clientCount;
    });
    socket.on('newClient', function(data) {
        console.log(data.msg);
        cCounter.innerHTML = data.clientCount;
    });

    socket.on('chatMessage', function(data){
        console.log('received chat event from server');
        let username = data.username;
        let messageBody = data.msg;
        $('.chat-messages').append("<p><span class='chat-username'>" + username + "</span> said:\n" + messageBody + "</p>");
    });

}

var socket;
var clientColor = 'black';

function draw() {
    // background(0, 255, 100);
}

function mouseDragged(){
    stroke(clientColor);
    strokeWeight(5);

    line(mouseX, mouseY, pmouseX, pmouseY);
    onMouseDown(clientColor, mouseX, mouseY, pmouseX, pmouseY);
}

function onMouseDown(color, xpos, ypos, prevxpos, prevypos) {
    var data = {
        clr : color,
        x : xpos,
        y : ypos,
        px : prevxpos,
        py : prevypos
    };

    socket.emit('clientMouseDown', data);
}

function sendChatMessage(){
    let messageBody = $('#message-body')[0].value;
    console.log(messageBody);

    var data = {
        username : socket.id,
        msg : messageBody,

    };

    socket.emit('chatMessage', data);
    $('#message-body')[0].value = '';
}

function setrgb(r, g, b){
    clientColor = 'rgb(' + r + ',' + g + ',' + b + ')';
    console.log(clientColor);

}