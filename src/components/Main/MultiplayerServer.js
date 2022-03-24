const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  }
});
/*
cd src/components/Main
nodemon MultiplayerServer.js
 */

const users = {};

io.on('connection', (socket) => {
  console.log(`A connected user: ${socket.id}`);

  socket.on('newClientMsg', (clientMsg) => {
    console.log(`${socket.id} has emitted "${clientMsg}"`);
    io.emit('newClientMsg', clientMsg);
  });
});

// Listen on the port
server.listen(3001, () => {
  console.log("Listening on the server.");
})