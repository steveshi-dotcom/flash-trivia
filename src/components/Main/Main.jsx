import React from 'react';
import styled from 'styled-components';
import TriviaGame from "./TriviaGame";
import TriviaMultiplayer from "./TriviaMultiplayer";
import socketIOClient from 'socket.io-client';

const mainSocket = socketIOClient(`https://flash-trivia-v1-server.herokuapp.com/`, {secure: false});

// Style Component
const MainContainer = styled.div`
  display: flex;
  margin-top: 5vh;
`

const Main = (props) => {


  return(
    <MainContainer>
      <TriviaGame userDifficulty={props.userDifficulty} socket={mainSocket} />
      <TriviaMultiplayer socket={mainSocket} />
    </MainContainer>
  )
}
export default Main;