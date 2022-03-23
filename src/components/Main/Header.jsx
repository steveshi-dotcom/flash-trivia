import React from 'react';
import styled from 'styled-components';

// styled components
const TriviaTitle = styled.h1`
    display: flex;
    justify-content: center;
    font-size: 3.5rem;
    font-family: 'Rancho', cursive;
    text-align: center;
    color: #E55B13;
    margin: 0 0 .5% 0;
    padding-top: .25%;
  `

// Header as (Flash Trivia) -> ? icon??
const Header = () => {
  return(
    <div>
      <TriviaTitle>Flash Trivia😁😁</TriviaTitle>
      {/*<FontAwesomeIcon icon="fa-solid fa-circle-question" />*/}
    </div>
  )
}
export default Header;