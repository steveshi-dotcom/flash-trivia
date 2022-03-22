import React from 'react';
import styled from 'styled-components'
import {TriviaGameContainer} from "./TriviaGame";

// style components
const TriviaMultiplayerContainer = styled(TriviaGameContainer)`
  // TriviaGameContainer of 60% on the left side, TriviaMultiplayerContainer will be on the right at 40%
  width: 40%;
`

const TriviaMultiplayer = () => {
  return(
    <TriviaMultiplayerContainer>
      Hello From TriviaMultiplayer
    </TriviaMultiplayerContainer>
  )
}
export default TriviaMultiplayer;