var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
      res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    var sender = "unKnown";

    socket.on('disconnect', function(){
        console.log(sender + ' disconnected');
    });
    
    socket.on('nickname', function(name){
        sender = name;
        console.log(sender + ' connected')
        socket.broadcast.emit('chat message', sender + ' connected');
    });

    socket.on('change', function(){
        socket.broadcast.emit('chat message', sender + " is typing")
        console.log(sender + ' is typing')
    });

    socket.on('chat message', function(msg){
        socket.broadcast.emit('chat message', sender + " : " + msg)
        console.log('message by ' + sender + ' : ' + msg);
    );
});

http.listen(3000, function(){
      console.log('listening on *:3000');
});
