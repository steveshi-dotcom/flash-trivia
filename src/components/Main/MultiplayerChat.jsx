import React, {useState, useRef} from 'react';
import styled from 'styled-components';

const ChatRootContainer = styled.div` // Root of the Chat rendering where clients send msg to communicate with others
  background-color: black;
  color: white;
  font-size: 1em;
  display: flex;
  flex-direction: column;
`
const ChatHistoryContainer = styled.div` // History of past chat
  width: 40.33vw;
  height: 28.5vh;
  overflow: auto;
  margin-right: auto;
  padding: 3px 0 0 3px;
`
const IndividualChat = styled.p` // Individual chat style components
  display: flex;
  width: 40.33vw;
  justify-content: flex-start;
  margin: 8px 0 5px 3px;
  color: white;
`
const IndividualChatFirstName = styled.span`
  font-weight: bold;
  display: flex;
  width: 6vw;
  text-align: left;
`
const IndividualChatMsg = styled.span`

`
const InsertChatContainer = styled.div` // Container where user can send a message and post it inside ChatHistory
  display: flex;
`
const InsertChatArea = styled.input` // Text-area to type up chat
  background-color: aqua;
  width: 37.5vw;
`
const InsertChatBtn = styled.button` // Send a event to add chat to ChatHistoryContainer
  cursor: pointer;
  background-color: hotpink;
  :hover {
    background-color: chartreuse;
  }
  :focus {
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
        "userName": "Steve",
        "userMessage": "The board game \"Monopoly\" is a variation of what board game?"
      },
      {
        "userId": 1235,
        "userName": "Steven",
        "userMessage": "What was the last Marx Brothers film to feature Zeppo?"
      },
      {
        "userId": 1236,
        "userName": "Bobby",
        "userMessage": "What was the code name given to Sonic the Hedgehog 4 during its development?"
      }]
    );

  const changeNewChat = (e) => {
    console.log(e.target.value);
    newChat.current = e.target.value;
  }

  const postNewChat = () => {
    if (newChat.current.length === 0) {
      setChatHistory([...chatHistory, {"userId": 1236, "userName": "John", "userMessage": newChat.current}]);
    } else {
      setChatHistory([...chatHistory, newChat.current]);
      newChat.current = '';
    }
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
        <InsertChatArea type={"text"} onChange={(e) => changeNewChat(e)} placeHolder={"Post new message here"} />
        <InsertChatBtn onClick={postNewChat}>post</InsertChatBtn>
      </InsertChatContainer>
    </ChatRootContainer>
  )
}
export default MultiplayerChat;