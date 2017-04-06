// server.js

const express = require('express');
const SocketServer = require('ws').Server;

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.send("Yo yo yo");

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});











// exampleSocket.onmessage = function (event) {
//   console.log(event.data);
// }

// // Send text to all users through the server
// function sendText() {
//   // Construct a msg object containing the data the server needs to process the message from the chat client.
//   var msg = {
//     type: "message",
//     text: document.getElementById("text").value,
//     id:   clientID,
//     date: Date.now()
//   };

//   // Send the msg object as a JSON-formatted string.
//   exampleSocket.send(JSON.stringify(msg));

//   // Blank the text input element, ready to receive the next line of text from the user.
//   document.getElementById("text").value = "";
// }