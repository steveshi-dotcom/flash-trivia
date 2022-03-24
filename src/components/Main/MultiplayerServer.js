// Boiler
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>')
});

io.on('connection', () => {
  console.log("Socket connected, listening on the server currently");
});

server.listen(3000, () => console.log("Listening on the server"));