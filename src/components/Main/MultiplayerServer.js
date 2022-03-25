import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';

const app = express();
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


const port = 3002;

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
server.listen(port, () => {
  console.log("Listening on the server.");
});