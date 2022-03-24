import React, {useState, useRef} from 'react';
import styled from 'styled-components';
import socketIOClient from 'socket.io-client';

const ChatRootContainer = styled.div` // Root of the Chat rendering where clients send msg to communicate with others
  background-color: black;
  color: white;
  font-size: 1em;
  font-family: Arial,serif;
  display: flex;
  flex-direction: column;
  border-radius: .25em;
`
const ChatHistoryContainer = styled.div` // History of past chat
  width: 40.33vw;
  height: 28.5vh;
  overflow: auto;
  margin-right: auto;
  padding: 3px 0 0 3px;
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
  width: 3vw;
  margin-right: 2vw;
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

// Chat part of Multiplayer component where the user will be able to communicate with four other player
const MultiplayerChat = () => {
  /**
   * Individual Chat:
   * {
   *   userId: {arbitrary ID assigned}
   *   userName: {arbitrary Name}
   *   userMessage: {arbitrary Message}
   * }
   */
  //const [chatHistory, setChatHistory] = useState();

  const newChat = useRef('');
  const [chatHistory, setChatHistory] = useState(
    [{
        "userId": 1234,
        "userName": "Jonathan",
        "userMessage": "Grammarly Checks Your Writing For All Kinds Of Potential Mistakes & Eliminates Them. Compose Credible, Mistake-free Writing With Real Time Suggestions As You Type."
      },
      {
        "userId": 1235,
        "userName": "Steven",
        "userMessage": "What was the last Marx Brothers film to feature Zeppo?What was the last Marx Brothers film to feature Zeppo?"
      },
      {
        "userId": 1236,
        "userName": "Bobby",
        "userMessage": "What was the code name given to Sonic the Hedgehog 4 during its development?"
      }]
    );

  const changeNewChat = (e) => {
    newChat.current = e.target.value;
  }

  const postNewChat = () => {
    if (newChat.current.length === 0) {
      setChatHistory([...chatHistory, {"userId": 1236, "userName": "John", "userMessage": "(◔_◔)"}]);
    } else {
      console.log("Hello");
      setChatHistory([...chatHistory, {"userId": 1236, "userName": "John", "userMessage": newChat.current}]);
    }
    newChat.current = '';
  }

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
        <InsertChatInput type={"text"} onChange={(e) => changeNewChat(e)} placeHolder={"Post new message here"} />
        <InsertChatBtn onClick={postNewChat}>post</InsertChatBtn>
      </InsertChatContainer>
    </ChatRootContainer>
  )
}

export default MultiplayerChat;