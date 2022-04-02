import React from 'react';
import styled from 'styled-components';

// styled components
const TriviaTitle = styled.h1`
    display: flex;
    justify-content: center;
    font-size: 6em;
    font-family: 'Rancho', cursive;
    text-align: center;
    color: #E55B13;
    margin: 5% 0 0 0;
  `

const Header = () => {
  return(
    <div>
      <TriviaTitle>Flash Trivia</TriviaTitle>
    </div>
  )
}
export default Header;