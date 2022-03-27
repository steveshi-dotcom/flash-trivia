import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import { useLocation } from "react-router-dom";
import qs from 'qs';
import { searchNameParam, searchRoomParam } from "../../Start/HomePage.jsx";
import { v4 as uuidv4 } from 'uuid';
import Peer from 'peerjs';
import socketIOClient from 'socket.io-client';

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
  margin-top: .25vh;
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
  padding: 0;
`
const VideoHolder1 = styled.video`
  width: 20vw;
  height: 25vh;
  display: flex;
  margin: .25vh;
  text-align: center;
  justify-content: center;
  align-items: center;
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
      updateChatHistory(newPlayerData);
    });
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

    // Listen for any player leaving the game and then updating the rest of the players in the game room
    socket.on("lost-player", (incomingUpdate) => {
      console.log(incomingUpdate);
      updateChatHistory(incomingUpdate);
    });
  }


  // VIDEO PART ---->
  const [remoteStreams, setRemoteStreams] = useState({});
  /**       ??Asynchronocity issue??
   * const appendOtherStream = (otherId, otherStream) => {
   *       console.log(`Within performPeerCall ----> ${otherStream}`);
   *       const othersStreamCopy = othersStream;
   *       othersStreamCopy[otherId] = otherStream;
   *       setOthersStream(Object.assign({}, othersStreamCopy));
   *     }
   *     const performPeerCall = (id) => {
   *       navigator.mediaDevices.getUserMedia({video: true, audio: true})
   *         .then(stream => {
   *           console.log(`Within performPeerCall ---->`);
   *           console.log(stream);
   *           let videoCall = peer.call(id, stream);
   *           videoCall.on('call', peerStream => {
   *             appendOtherStream(id, peerStream);
   *           })
   *         })
   *         .catch(err => console.log(err));
   *     }
   *     peer.on('call', call => {
   *       console.log("GETTING CALL....");
   *       navigator.mediaDevices.getUserMedia({video: true, audio: true})
   *         .then(stream => {
   *           call.answer(stream);
   *           call.on('stream', othersStream => {
   *             appendOtherStream(call.peer, othersStream);
   *           })
   *         })
   *         .catch(err => console.log(err));
   *     });
   *
   *     socket.on('meet-up', (peerId) => {
   *       console.log(peerId);
   *       performPeerCall(peerId);
   *     });
   *     peer.on('open', (id) => {
   *       console.log(id);
   *     })
   *     socket.emit('meet-up');
   */

  /** 'Can't load metadata, video === null???
   *  addVideoStream(video, stream) {
   *         video.srcObject = stream
   *         video.addEventListener('loadedmetadata', () => {
   *           video.play()
   *         })
   *         this.videoGrid.append(video)
   *     }
   *
   *     getVideo(){
   *         const myVideo = document.createElement('video');
   *         return myVideo;
   *     }
   *     connectToNewUser(userId, stream) {
   *         console.log('connectToNewUser',userId)
   *         const call = this.peer.call(userId, stream);
   *         const video = this.getVideo();
   *         call.on('stream', userVideoStream => {
   *           console.log('connectToNewUser','on','stream')
   *           this.addVideoStream(video, userVideoStream)
   *         });
   *         call.on('close', () => {
   *           video.remove()
   *         })
   *
   *         this.peers[userId] = call
   */

  /**
   * peer = new Peer(
   *   {
   *     host: 'yourPersonalGitPodKey.gitpod.io',
   *     port: '443',
   *     path: '/',
   *     secure: true
   *   });
   */

  /**
   * Error: Could not get an ID from the server. If you passed in a 'path' to your self-hosted PeerServer,
   * you'll also need to pass in that same path when creating a new Peer
   */

  useEffect(() => {

    // () VID VID VID VID VID
    const addRemoteStreams = (peerId, video) => {
      const remoteStreamsCopy = remoteStreams;
      remoteStreamsCopy[peerId] = video;
      setRemoteStreams(Object.assign({}, remoteStreamsCopy));
    }

    navigator.mediaDevices.getUserMedia({video: true, audio: true})
      .then(stream => {
        const peer = new Peer(userId, {
          host: 'localhost',
          port: 3002,
          path: '/flash-trivia'
        });
        peer.on('open',id => {
          console.log(id);
        })

        socket.on('meet-up', otherPeerId => {
          console.log("CALLING A PEER");
          console.log(`My id is => ${peer.id} and calling this id => ${otherPeerId}`);
          peer.call(otherPeerId, stream);
        })

        peer.on('call', call => {
          console.log("ANSWERING A CALLLLLLLLL");
          console.log(`My id is => ${peer.id} and getting call from this id => ${call.peer}`);
          call.answer(stream);
          call.on('stream', stream => {
            addRemoteStreams(stream.id, stream);
          })
        })
      })
      .catch(err => console.log(err));
  }, [userId]);

  // Render the lower right chat function on main page
  return(
    <div>
      <VideoRootContainer>
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