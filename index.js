var express=require("express");
var socket=require("socket.io");
var app=express();

app.use(express.static("public"));

var server=app.listen(4000,function(){
	console.log("App has started");
})

var io=socket(server);
io.on("connection",function(socket){
	console.log("connection made");

	//Handle Chat Event
	socket.on("chat",function(data){
		io.sockets.emit("chat",data);
	})

	// Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });

    socket.on('cancel-typing', function() {
        socket.broadcast.emit('cancel-typing');
    });

})


