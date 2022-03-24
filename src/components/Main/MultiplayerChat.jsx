import React from 'react';
import styled from 'styled-components';

// styled components
const ChatRootContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
`
const GroupChatContainer = styled.div`
  background-color: white;
  width: 40.33vw;
  height: 28.5vh;
  overflow: auto;
`
const IndividualChat = styled.p`
  width: 40.33vw;
`
const InsertChatContainer = styled.div`
  display: flex;
`
const InsertChatArea = styled.textarea`
  background-color: aqua;
  width: 37.5vw;
`
const InsertChatBtn = styled.button`
  cursor: pointer;
  background-color: hotpink;
  :hover {
    background-color: chartreuse;
  }
  :focus {
    transform: ;
  }
`

// Chat part of Multiplayer component where the user will be able to communicate with four other player
const MultiplayerChat = () => {
  return(
    <ChatRootContainer>
      <GroupChatContainer> Bunch of random chat

      </GroupChatContainer>
      <InsertChatContainer>
        <InsertChatArea>Type Here</InsertChatArea>
        <InsertChatBtn>post</InsertChatBtn>
      </InsertChatContainer>
    </ChatRootContainer>
  )
}
export default MultiplayerChat;