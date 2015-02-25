

var express = require('express');
var socketio = require('socket.io');
var morgan = require('morgan')
var bodyParser = require('body-parser')

var routes = require('./routes/')//(io)

var app = express();

require('./swigConfig')(app)

var server = app.listen(3000, '0.0.0.0', function() {
	console.log("server listening...")
} );

var io = socketio.listen(server);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.use( '/', routes(io));

// change2