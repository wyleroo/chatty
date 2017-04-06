const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('node-uuid');

const PORT = 3001;

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
  // ws.send("Yo yo yo");

  ws.on('message', function incoming(message) {
    // Parse incoming message; add timestamp
    let inMessage = JSON.parse(message);
    let timestamp = uuid();
    inMessage.timestamp = timestamp;
    // Broadcast message to all connected clients. Stringify;
    wss.clients.forEach(function each(client) {
      if (client.readyState == ws.OPEN) {
        outMessage = JSON.stringify(inMessage);
        client.send(outMessage);
      } else {
        console.log('No connection. No socketserver. No nothin');
      }
    });
  });

  ws.on('close', () => console.log('Client disconnected'));
});


