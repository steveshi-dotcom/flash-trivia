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

// playerData = { "userId": ?, "userName": ?, "userRoom": ?, "userMsg": ? }

// Keep track of all users
const users = [];

io.on('connection', (socket) => {
  console.log("------------------------------------------------------");
  console.log(`A connected user: ${socket.id}`);


  // A new player has joined, emit the playerData specifically in that room to inform the others
  socket.on("join-game", (dataChunk) => {
    const { userId, userName, userRoom, userMsg} = dataChunk;

    // Inform players in that room that a new player has connected
    console.log("A player has connected");
    console.log(dataChunk);
    socket.join(userRoom);
    io.in(userRoom).emit("new-player", {"userName": userName, "userMsg": userMsg});

    // Send messages to the players in the room
    socket.on("chat-message", (playerPostedChat) => {
      console.log("Sending a new chat");
      console.log(playerPostedChat);
      const sendToOther = {"userName": playerPostedChat.userName, "userMsg": playerPostedChat.userMsg}
      console.log(sendToOther);
      io.emit("chat-message", sendToOther);
    });

    // Inform players in that room that a player has disconnected
    socket.leave(userRoom);
    socket.on("disconnect", () => {
      io.in(userRoom).emit("lost-player", userName)
    });
  });


  //------------------------------------------------------
  socket.on('disconnect', (reason) => {
    console.log(`A disconnected user: ${socket.id}`);
  });
});

// Listen on the port
server.listen(port, () => {
  console.log("Listening on the server.");
});