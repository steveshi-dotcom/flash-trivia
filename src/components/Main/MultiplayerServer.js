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

    // if the userId is already contained within the users[], then disconnect the socket
    const usersCopy = users.filter(curr => {
      return curr.userId === userId;
    });
    if (usersCopy.length !== 0) {
      io.disconnectSockets(true);
    } else {
      users.push(userId);
    }

    // Inform players in that room that a new player has connected
    socket.join(userRoom);
    io.in(userRoom).emit("new-player", {
      "userName": userName,
      "userMsg": userMsg
    });

    // Send message to every player including the sender in the room
    socket.on("chat-message", (playerPostedChat) => {
      const messageBox = {
        "userName": playerPostedChat.userName,
        "userMsg": playerPostedChat.userMsg
      };
      io.in(userRoom).emit("chat-message", messageBox);
    });

    // Inform players in that room that a player has disconnected
    socket.on("disconnect", () => {
      socket.leave(userRoom);
      io.in(userRoom).emit("lost-player", {
        "userName": userName,
        "userMsg": `I have left the game ヾ(・ﻌ・)ゞ at 
        ${new Date().getHours()}:${new Date().getMinutes() < 10 ?
          '0' + new Date().getMinutes()
          : new Date().getMinutes()}`
      });
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