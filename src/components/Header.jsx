import React from 'react';
import styled from 'styled-components';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const TriviaTitle = styled.h1`
    display: flex;
    justify-content: center;
    font-size: 3.25rem;
    font-family: 'Rancho', cursive;
    text-align: center;
    color: ghostwhite;
    margin: 0;
    padding-top: 3%;
  `

const Header = () => {
  return(
    <div>
      <TriviaTitle>Flash Trivia😞something-else😞</TriviaTitle>
      {/*<FontAwesomeIcon icon="fa-solid fa-circle-question" />*/}
    </div>
  )
}
export default Header;