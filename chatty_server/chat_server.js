const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('node-uuid');

const PORT = 3001;

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

let clientCount = 0;

wss.on('connection', (ws) => {
  console.log('Client connected');
  clientCount += 1;
  wss.clients.forEach(function each(client) {
    console.log(clientCount);
    if (client.readyState == ws.OPEN) {
      let upCount = JSON.stringify({type: "clientCount", value: clientCount});
      client.send(upCount);
    }
  });

  ws.on('message', (message) => {
    let inMessage = JSON.parse(message);
    let timestamp = uuid();
    inMessage.timestamp = timestamp;
    wss.clients.forEach(function each(client) {
      if (client.readyState == ws.OPEN) {
        outMessage = JSON.stringify(inMessage);
        client.send(outMessage);
      } else {
        console.log('No connection. No socketserver. No nothin');
      }
    });
  });

  ws.on('close', () => {
    clientCount -= 1;
    wss.clients.forEach(function each(client) {
      if (client.readyState == ws.OPEN) {
        client.send(JSON.stringify({type: "clientCount", value: clientCount}));
      }
    console.log('Client disconnected. Client count: ', clientCount);
    });
  });
});


