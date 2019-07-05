var socket=io.connect("http://localhost:4000");


// Query DOM
var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');


message.addEventListener('keypress', function(){
     if (message.value.length === 0) {
        socket.emit('cancel-typing');
        console.log('cancel-typing', message.value.length);
    } else {
        socket.emit('typing', handle.value);
        console.log('typing', message.value.length);
    }
})

socket.on('cancel-typing', function(data) {
    feedback.innerHTML = "";
})

// Emit events
btn.addEventListener('click', function(){
  socket.emit('chat', {
      message: message.value,
      handle: handle.value
  });
  message.value = "";
});

// Listen for events
socket.on('chat', function(data){
	feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});