var socket = io();

var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room');

$('.room-title').text(room);

socket.on('connect', function() {
	console.log('Connected to socket.io server');
	console.log(name + ' joined ' + room);

	socket.emit('joinRoom', {
		name: name,
		room: room
	});
});

socket.on('message', function(message) {
	console.log('New message:');
	console.log(message.text);

	var timestamp = moment.utc(message.timestamp);
	var $message = $('.messages');

	$message.append('<p><strong>' + message.name + ' ' + timestamp.local().format('h:mm A') + '</strong></p>');
	$message.append('<p>' + message.text + '</p>');
});

// Handles submitting of new message
var $form = $('#message-form');

$form.on('submit', function(event) {
	event.preventDefault();

	var $message = $form.find('input[name=message]');
	
	socket.emit('message', {
		name: name,
		text: $message.val()
	});

	$message.val('');
});