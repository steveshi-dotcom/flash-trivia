import React from 'react';
import styled from 'styled-components';

import TriviaGame from "./TriviaGame";
import TriviaMultiplayer from "./TriviaMultiplayer";

// Style Component
const MainContainer = styled.div`
  display: flex;
  margin-top: 5vh;
`

const Main = (props) => {
  return(
    <MainContainer>
      <TriviaGame userDifficulty={props.userDifficulty}/>
      <TriviaMultiplayer />
    </MainContainer>
  )
}
export default Main;