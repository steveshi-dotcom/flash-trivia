import React from 'react';
import styled from 'styled-components'
import {TriviaGameContainer} from "./TriviaGame";
import MultiplayerVideo from "./MultiplayerVideo";
import MultiplayerChat from "./MultiplayerChat";

// style components
const TriviaMultiplayerContainer = styled(TriviaGameContainer)`
  // TriviaGameContainer of 60% on the left side, TriviaMultiplayerContainer will be on the right at 40%
  width: 45%;
`

// Right-hand side of GamePage where the user can talk with 4 other player, or chat to answer the question
const TriviaMultiplayer = () => {
  return(
    <TriviaMultiplayerContainer>
      <MultiplayerVideo />
      <MultiplayerChat />
    </TriviaMultiplayerContainer>
  )
}
export default TriviaMultiplayer;