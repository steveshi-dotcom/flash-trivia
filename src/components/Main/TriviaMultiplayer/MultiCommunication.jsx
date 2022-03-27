import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import { useLocation } from "react-router-dom";
import qs from 'qs';
import { searchNameParam, searchRoomParam } from "../../Start/HomePage.jsx";
import { v4 as uuidv4 } from 'uuid';
import Peer from 'peerjs';
import socketIOClient from 'socket.io-client';

import Video from "./Video.jsx";

const socket = socketIOClient(`http://localhost:3001`, {secure: false});

// ----styled components----
/** CHAT */
const ChatRootContainer = styled.div` // Root of the Chat rendering where clients send msg to communicate with others
  background-color: black;
  color: black;
  font-size: 1em;
  font-family: Arial,serif;
  display: flex;
  flex-direction: column;
  border-radius: .25em;
  margin-top: 1vh;
`
const ChatHistoryContainer = styled.div` // History of past chat
  width: 40.33vw;
  height: 28.5vh;
  margin-right: auto;
  padding: 3px 0 0 3px;
  overflow-x: hidden;
  overflow-y: auto;
`
// Individual Message from each player
const IndividualChat = styled.p` // Individual chat style components
  display: flex;
  width: 40.33vw;
  margin: .75vh 0 5px .5vw;
  color: white;
`
const IndividualChatFirstName = styled.span`
  font-weight: bold;
  display: flex;
  width: 2.5vw;
  margin-right: 1.5vw;
  text-align: left;
`
const IndividualChatMsg = styled.span`
  text-align: left;
  margin-right: 2vw;
  word-spacing: 0.75px;
`
// Box to insert new message to the group
const InsertChatContainer = styled.div` // Container where user can send a message and post it inside ChatHistory
  display: flex;
  justify-content: center;
  align-items: center;
`
const InsertChatInput = styled.input` // Text-input to type up chat
  background-color: white;
  width: 38.25vw;
  height: 4vh;
  font-size: 1.5em;
  margin: 0;
`
const InsertChatBtn = styled.button` // Send a event to add chat to ChatHistoryContainer
  cursor: pointer;
  width: 2vw;
  height: 4.35vh;
  background-color: deepskyblue;
  border: none;
  margin: 0;
  :hover {
    font-weight: bold;
  }
  :active {
    background-color: limegreen;
  }
`

/** VIDEO */
const VideoRootContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`


// MultiCommunication part of the Main where player can communicate with four other player via video/chat
const MultiCommunication = () => {
  // unique uuid for each player, use for keeping track of users in socket for chat and peer identification for video
  const [userId, setUserId] = useState(`${uuidv4()}`);

  // const representing value of the three properties that will be emitted to the socket server
  const [userName, setUserName] = useState('');
  const [userRoom, setUserRoom] = useState('');
  const userMsg = useRef('');

  // chatHistory: container for chat history among 5 players
  // each index stores an object with just userName + userMsg prop
  const [chatHistory, setChatHistory] = useState([]);

  // Update the chatHistory by setting the new state as the copy of the history with incomingMsg appended to it
  const updateChatHistory = (incomingMsg) => {
    const chatHistoryCopy = chatHistory;
    chatHistoryCopy.push(incomingMsg);
    setChatHistory([...chatHistoryCopy]);
  }

  // () Obtain the player information from the url such as: http://localhost:3000/game/?name=steve&room=1234
  // Effect() After a player joined, get their information and inform other players in the chat room
  const playerLocation = useLocation();
  useEffect(() => {
    const playerInput = qs.parse(playerLocation.search.slice(1)); // playerLocation.search: ?name=steve&room=1234
    setUserName(playerInput[searchNameParam]);
    setUserRoom(playerInput[searchRoomParam]);

    // emit an 'join-game' event that will place the player in their room with their team
    socket.emit("join-game", {
      userId: userId,
      userName: playerInput[searchNameParam],
      userRoom: playerInput[searchRoomParam],
      userMsg: `I have joined the game at 
        ${new Date().getHours()}:${new Date().getMinutes() < 10 ?
        '0' + new Date().getMinutes()
        : new Date().getMinutes()}
        `
    });

    // Listen for 'new-player' event signifying a new player joining their game and send an update to chatHistory
    socket.on("new-player", (newPlayerData) => {
      console.log("Informing the others that an new player has joined.");
      updateChatHistory(newPlayerData);
    });

    socket.on("old-player", (oldPlayerData) => {
      console.log("Informing the others that an old player has left.");
      updateChatHistory(oldPlayerData);
      removeRemoteStream(oldPlayerData["userId"]);
    })
  }, [playerLocation]);

  // () post the new chat into the chatHistory and emitting to all players within the room
  const postNewChat = () => {
    const postedChat = {
      userId: userId,
      userName: userName,
      userMsg: "(◔_◔)"
    };
    if (userMsg.current.length !== 0) {
      postedChat['userMsg'] = userMsg.current;
    }
    socket.emit("chat-message", postedChat);
    document.getElementById("chatInput").value = '';

    // Listen for any incoming messages from other players
    socket.on("chat-message", (incomingChat) => {
      console.log(`I have received an chat event from the server at ${new Date().getMilliseconds()}-->${incomingChat.userMsg}`);
      //const newIndividualChat = { userName: incomingChat['userName'], userMsg: incomingChat['userMsg'] }
      updateChatHistory(incomingChat);
    });
  }

  // VIDEO PART ---->
  // C1: When a player joins, send peerInfo to others. Other call this new peer and add incoming streams to remote
  //     Other will append the incoming stream to remoteStream
  // C2: When a player joins, call all other peers and add the streams beside caller....

  // CHOOSE C1 <-----

  // Stores remote streams of all other-player
  const [remoteStreams, setRemoteStreams] = useState({});
  const videoRef = useRef(undefined);
  useEffect(() => {
    // Getting local streams, existing players within room call new player, new player accept incoming call from others
    navigator.mediaDevices.getUserMedia({video: true, audio: true})
      .then(stream => {
        // Make new peer object with unique uuid and at server localhost:3002/flash-trivia or whatever in the future
        const peer = new Peer(userId, {
          host: 'localhost',
          port: 3002,
          path: '/flash-trivia'
        });

        // Check Peer is on, if not it is not connected to the server and dataConnection won't transport mediaStream
        peer.on('open',id => {
          //console.log(id);
        });

        // Listen for meet-up event, then call other peer using the id. Add their responding stream to remoteStream
        socket.on('meet-up', otherPeerId => {
          // console.log(`Initiating CALL ==== MyID is => ${peer.id} \n CallerId is => ${otherPeerId}`);
          const call = peer.call(otherPeerId, stream);
          call.on('stream', stream => {
            addRemoteStream(call.peer, stream);
          })
        });

        // Accept new peer calls and provide local media stream to them, add their calling stream to remoteStreams
        peer.on('call', call => {
          // console.log(`Intercepting CALL ==== MyID is => ${peer.id} \n CallerId is => ${call.peer}`);
          call.answer(stream);
          call.on('stream', stream => {
            addRemoteStream(call.peer, stream);
          })
        });
      })
      .catch(err => console.log(err));
  }, [userId]);

  // () remoteStreams adding/removing 4.5
  const addRemoteStream = (peerId, video) => {
    const remoteStreamsCopy = remoteStreams;
    remoteStreamsCopy[peerId] = video;
    setRemoteStreams(Object.assign({}, remoteStreamsCopy));
  }
  const removeRemoteStream = (peerId) => {  // NEVER CALLED: lost-player event was never intercepted from server
    console.log("Removing STREAM");
    console.log(peerId);
    const remoteStreamsCopy = remoteStreams;
    delete remoteStreamsCopy[peerId];
    setRemoteStreams(Object.assign({}, remoteStreamsCopy));
  }

  // Dummy effect to check if all streams are stored. stores playerNum - 1(sender)
  useEffect(() => {
    console.log(remoteStreams); // theoretically should store all other streams beside the player within remoteStreams
  }, [remoteStreams]);

  // Listen for any player leaving the game and then updating the rest of the players in the game room
  socket.on("lost-player", (incomingUpdate) => {
    updateChatHistory(incomingUpdate);
    removeRemoteStream(incomingUpdate['userId']);
  });

  // Render the right-hand side: video/chat function
  return(
    <div>
      <VideoRootContainer>
        {Object.keys(remoteStreams).map((curr, ind) => {
          const currStream = remoteStreams[curr];
          return <Video stream={currStream} key={ind} />
        })}
      </VideoRootContainer>
      <ChatRootContainer>
        <ChatHistoryContainer>
          {chatHistory.map((curr, ind) => {
            return <IndividualChat key={ind}>
              <IndividualChatFirstName>{curr['userName']}:</IndividualChatFirstName>
              <IndividualChatMsg>{curr['userMsg']}</IndividualChatMsg>
            </IndividualChat>
          })}
        </ChatHistoryContainer>
        <InsertChatContainer>
          <InsertChatInput id={"chatInput"} type={"text"} onChange={(e) => userMsg.current = e.target.value} />
          <InsertChatBtn onClick={postNewChat}>post</InsertChatBtn>
        </InsertChatContainer>
      </ChatRootContainer>
    </div>
  )
}

export default MultiCommunication;