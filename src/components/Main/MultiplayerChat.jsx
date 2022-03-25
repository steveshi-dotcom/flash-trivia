import React, {useState, useRef, useEffect} from 'react';
import styled from 'styled-components';
import { useLocation } from "react-router-dom";
import qs from 'qs';
import { searchNameParam, searchRoomParam } from "../Start/HomePage";
import { v4 as uuidv4 } from 'uuid';
import socketIOClient, {connect} from 'socket.io-client';
const socket = socketIOClient("http://localhost:3002", {secure: false});

// ----styled components----
const ChatRootContainer = styled.div` // Root of the Chat rendering where clients send msg to communicate with others
  background-color: black;
  color: black;
  font-size: 1em;
  font-family: Arial,serif;
  display: flex;
  flex-direction: column;
  border-radius: .25em;
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

// Const representing an {}'s property to send to socket server for each player
export const s_userId = 'userId';
export const s_userName = 'userName';
export const s_userRoom = 'userRoom';
export const s_userMsg = 'userMessage';

// Const representing sockets events that will be emitted for the server
export const pl_connect = 'player_connected';
export const pl_disconnect = 'player_disconnected';
export const pl_newMessage = 'player_sent_message';


// Chat part of Multiplayer component where the client will be able to communicate with four other player
const MultiplayerChat = (props) => {

  // const representing value of the four properties that will be emitted to the socket server
  const [userId, setUserId] = useState(`${uuidv4()}`);
  const [userName, setUserName] = useState('');
  const [userRoom, setUserRoom] = useState('');

  // userMsg: user inputting new chat to broadcast to other
  // chatHistory: container with chat history among 5 players
  const [userMsg, setUserMsg] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  // () Obtain the player information from the url such as: http://localhost:3000/game/?name=steve&room=1234
  const playerLocation = useLocation();
  const setPlayerInformation = () => {
    const playerInput = qs.parse(playerLocation.search.slice(1)); // playerLocation.search: ?name=steve&room=1234
    setUserName(playerInput[searchNameParam]);
    setUserRoom(playerInput[searchRoomParam]);
  }

  // () inform a new player has joined in the chat room
  const informNewPlayer = (newPlayerData) => {
    //setChatHistory([...chatHistory, newPlayerData]);
    console.log("joining us today:");
    console.log(newPlayerData);
  }

  // () post the new chat into the chatHistory and emitting to all players within the room
  const postNewChat = () => {
    if (userMsg.length === 0) {
      setChatHistory([...chatHistory, {"userId": 1236, "userName": "John", "userMessage": "(◔_◔)"}]);
    } else {
      console.log("Hello");
      setChatHistory([...chatHistory, {"userId": 1236, "userName": "John", "userMessage": userMsg}]);
    }
    setUserMsg('');
  }

  // Effect() After a player joined, get their information and inform other players in the chat room
  useEffect(() => {
    setPlayerInformation();
    const newPlayerData = {s_userId: userId, s_userName: userName, s_userRoom: userRoom};
    socket.emit(pl_connect, newPlayerData);
    socket.on(pl_connect, (newPlayerData) => {
      informNewPlayer(newPlayerData);
    });
  }, [userName, userRoom]);


  // Render the lower right chat function on main page
  return(
    <ChatRootContainer>
      <ChatHistoryContainer>
        {chatHistory.map((curr, ind) => {
          return <IndividualChat key={ind}>
            <IndividualChatFirstName>{curr.userName}:</IndividualChatFirstName>
            <IndividualChatMsg>{curr.userMessage}</IndividualChatMsg>
          </IndividualChat>
        })}
      </ChatHistoryContainer>
      <InsertChatContainer>
        <InsertChatInput type={"text"} onChange={(e) => setUserMsg(e.target.value)} value={userMsg}/>
        <InsertChatBtn onClick={postNewChat}>post</InsertChatBtn>
      </InsertChatContainer>
    </ChatRootContainer>
  )
}

export default MultiplayerChat;