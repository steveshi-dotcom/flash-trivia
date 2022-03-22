import React from 'react';
import styled from 'styled-components';

import Header from "./Header";
import TriviaGame from "./TriviaGame";
import TriviaMultiplayer from "./TriviaMultiplayer";

// Style Component
const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
`
const Main = (props) => {
  return(
    <div>
      <Header />
      <MainContainer>
        <TriviaGame userDifficulty={props.userDifficulty}/>
        <TriviaMultiplayer />
      </MainContainer>
    </div>
  )
}

export default Main;