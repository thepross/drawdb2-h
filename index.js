var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/'));
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });

    socket.on('draw', function (data) {
        socket.broadcast.emit('draw', data);
    });
});

const port = process.env.PORT || 3000;
http.listen(port, function(){
    console.log('listening on *:' + port);
});