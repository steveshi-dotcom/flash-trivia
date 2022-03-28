import React from 'react';
import styled from 'styled-components';
import puppyWaitEye from '../imgs/TriviaGameWait.jpg'

// Style component
const LoadingContainer = styled.img`
  width: 100%;
  height: 100%;
`
const LoadingText = styled.h1`
  color: black;
  font-size: 2em;
`

// Loading page when the page is waiting to fetch the data from OpenTrivia, a puppy with text wait patiently...
const GameLoading = () => {
  return(
    <div>
      <LoadingContainer src={puppyWaitEye}/>
      <LoadingText>Beep Bop Bop, fetching questions, please wait patiently...</LoadingText>
    </div>
  )
}
export default GameLoading;