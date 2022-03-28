import React from 'react';
import styled from 'styled-components';

import TriviaGame from "./TriviaGame";
import TriviaMultiplayer from "./TriviaMultiplayer";

// Style Component
const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10vh;
`

const Main = (props) => {
  return(
    <div>
      <MainContainer>
        <TriviaGame userDifficulty={props.userDifficulty}/>
        <TriviaMultiplayer />
      </MainContainer>
    </div>
  )
}

export default Main;