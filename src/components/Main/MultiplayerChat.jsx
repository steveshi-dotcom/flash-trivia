import React, {useState, useRef, useEffect} from 'react';
import styled from 'styled-components';
import qs from 'qs';  // Decode userName & userRoom from url
import { v4 as uuidv4 } from 'uuid' // Generate unique id for placing players into rooms in socket
import socketIOClient from 'socket.io-client';
const socket = socketIOClient("http://localhost:3002", {secure: false});

// styled components
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

// Chat part of Multiplayer component where the client will be able to communicate with four other player
const MultiplayerChat = (props) => {

  // Information of each Individual Player joining the main trivia game page
  const [userId, setUserId] = useState(`${uuidv4()}`);
  const [userName, setUserName] = useState('');
  const [userRoom, setUserRoom] = useState('');

  // newChat: user inputting new chat to broadcast to other
  // chatHistory: container with chat history among 5 players
  const [newChat, setNewChat] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const eachTeam =

  const postNewChat = () => {
    if (newChat.length === 0) {
      setChatHistory([...chatHistory, {"userId": 1236, "userName": "John", "userMessage": "(◔_◔)"}]);
    } else {
      console.log("Hello");
      setChatHistory([...chatHistory, {"userId": 1236, "userName": "John", "userMessage": newChat}]);
    }
    setNewChat('');
  }

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connecting");
    });
  });


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
        <InsertChatInput type={"text"} onChange={(e) => setNewChat(e.target.value)} value={newChat}/>
        <InsertChatBtn onClick={postNewChat}>post</InsertChatBtn>
      </InsertChatContainer>
    </ChatRootContainer>
  )
}

export default MultiplayerChat;