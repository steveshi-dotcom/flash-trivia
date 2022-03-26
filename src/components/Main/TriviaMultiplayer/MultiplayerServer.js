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
cd src/components/Main/TriviaMultiplayer
nodemon MultiplayerServer.js
 */

const port = 3001;
let users = [];     // Keep track of all users

const disconnectDuplicate = (newUserId) => {
  const usersCopy = users.filter(curr => {
    return curr.userId === newUserId;
  });
  if (usersCopy.length !== 0) {
    return true;
  } else {
    return false;
  }
};

io.on('connection', (socket) => {
  console.log("------------------------------------------------------");
  console.log(`A connected user: ${socket.id}`);

  // A new player has joined, emit the playerData specifically in that room to inform the others
  socket.on("join-game", (dataChunk) => {
    const { userId, userName, userRoom, userMsg} = dataChunk;

    // if the userId is already contained within the users[], then disconnect the socket
    if (disconnectDuplicate(userId)) {
      io.disconnectSockets(true);
    } else {
      users.push({"userId": userId, "userName": userName, "userRoom": userRoom});
    }

    // Inform the other players in the game room that a player has joined in with them
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
      console.log(playerPostedChat);
      console.log("EMITTING");
      io.in(userRoom).emit("chat-message", messageBox);
    });

    // Sending peer id and other meta info to others in the room so one/one connection can be established with each
    socket.on("join-peers", playerPeerInfo => {
      console.log("Emitting peer info to other players in the room." + userRoom);
      console.log(playerPeerInfo);
      io.to(userRoom).emit("join-peers", playerPeerInfo);
    });

    // Inform the other players in the game room that a player has left
    socket.on("disconnect", () => {
      socket.leave(userRoom);
      users.filter(curr => {
        return curr.userId !== userId;
      })
      // msg updating the chatroom that the player has left
      const playerLeavingUpdate = `I have left the game ヾ(・ﻌ・)ゞ at
        ${new Date().getHours()}:${new Date().getMinutes() < 10 ?
        '0' + new Date().getMinutes()
        : new Date().getMinutes()}`;
      io.in(userRoom).emit("lost-player", {
        "userName": userName,
        "userMsg": playerLeavingUpdate
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