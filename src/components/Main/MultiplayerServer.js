const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  }
});
/*
cd src/components/Main
nodemon MultiplayerServer.js
 */
/*
TODO: FIX these gibberish
0{"sid":"hdDooz1LlE0H0FIrAAAH","upgrades":["websocket"],"pingInterval":25000,"pingTimeout":20000}
Access to XMLHttpRequest at 'http://localhost:3001/socket.io/?EIO=4&transport=polling&t=N-zpZXb'
from origin 'http://localhost:3000' has been blocked by CORS policy: The 'Access-Control-Allow-Origin'
header has a value 'http://localhost:3001' that is not equal to the supplied origin.
polling-xhr.js:157
GET http://localhost:3001/socket.io/?EIO=4&transport=polling&t=N-zpZXb net::ERR_FAILED 200
 */

const users = {};

io.on('connection', (socket) => {
  console.log(`A connected user: ${socket.id}`);

  socket.on('newClientMsg', (clientMsg) => {
    console.log(`${socket.id} has emitted "${clientMsg}"`);
    io.emit('newClientMsg', clientMsg);
  });


  socket.on('disconnect', (reason) => {
    console.log(`A disconnected user: ${socket.id}`);
  });
});

// Listen on the port
server.listen(3001, () => {
  console.log("Listening on the server.");
})