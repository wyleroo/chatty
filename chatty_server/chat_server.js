const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('node-uuid');

const PORT = 3001;

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState == SocketServer.OPEN) {
      client.send(data);
    }
  });
};

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.send("Yo yo yo");

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    let inMessage = JSON.parse(message);
    let timestamp = uuid();
    inMessage.timestamp = timestamp;
    wss.broadcast(inMessage);
  });

  ws.on('close', () => console.log('Client disconnected'));
});


