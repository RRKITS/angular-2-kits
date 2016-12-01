var express = require('express');
var path = require('path');
var app = express();
var request = require('request');
var bodyParser = require("body-parser");

/**
 * Using additional modules
 */
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

/**
 * Socket io
 */

var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket){
	io.emit('connected', {'name': socket.id});

	socket.on('message', function(message){
		//for each connection
		io.emit('message', socket.id + ' said - ' + message);
		//for each connection but current
		//socket.broadcast.emit('message', socket.id + ' said - ' + message);
		//only for current connection
		//socket.emit('message', socket.id + ' said - ' + message);
	});
});

http.listen(8000);
