var socket = io();

socket.on('connect', function() {
	console.log('Connected to socket.io server');
});

socket.on('message', function(message) {
	console.log('New message:');
	console.log(message.text);

	var timestamp = moment.utc(message.timestamp);
	$('.messages').append('<p><strong>' + timestamp.local().format('h:mm A') + '</strong>: ' + message.text + '</p>');
});

// Handles submitting of new message
var $form = $('#message-form');

$form.on('submit', function(event) {
	event.preventDefault();

	var $message = $form.find('input[name=message]');
	
	socket.emit('message', {
		text: $message.val()
	});

	$message.val('');
});