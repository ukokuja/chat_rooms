const express = require('express');

const app = express();
const server = app.listen(8080, function () {
  console.log('server running on port 8080');
});
const io = require('socket.io')(server);

const START = 'START'
const CONV_ID = "conversation_"
const SEND_MESSAGE = 'SEND_MESSAGE'
const MESSAGE = 'MESSAGE'
const DISCONNECT = 'disconnect'


var redis = require('redis');
var redisClient = redis.createClient(process.env.PORT, process.env.HOST);
var clients = [];

let pub = redis.createClient(process.env.PORT, process.env.HOST);
let sub = redis.createClient(process.env.PORT, process.env.HOST);
sub.subscribe('global');

sub.on('message', function(channel, msg) {
  // Broadcast the message to all connected clients on this server.
  for (var i=0; i<clients.length; i++) {
    clients[i].emit(MESSAGE, JSON.parse(msg))
  }
});

function onSocketStart(socket, sessionData) {
  socket.on(START, function (data) {
    sessionData.roomId = data
    redisClient.get(CONV_ID + sessionData.roomId, function (err, reply) {
      if (err) throw err;
      if (reply) {
        sessionData.msgs = JSON.parse(reply)
      }
      socket.emit('MESSAGES', sessionData.msgs)
    });
  });
}

function onMessage(socket, sessionData) {
  socket.on(SEND_MESSAGE, function (data) {
    sessionData.msgs.push(data)
    redisClient.set(CONV_ID + sessionData.roomId, JSON.stringify(sessionData.msgs))
    pub.publish('global', JSON.stringify(data));
  });
}


redisClient.on('connect', function () {
  io.on('connection', function (socket) {
    clients.push(socket);
    let sessionData = {
      msgs: [],
      roomId: -1
    }
    onSocketStart(socket, sessionData);
    onMessage(socket, sessionData);
  });
});