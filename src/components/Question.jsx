import React from 'react';
import styled from 'styled-components';

const TriviaQuestion = styled.h1`
  display: flex;
  background-color: deeppink;
  font-size: 35px;
  justify-content: center;
`
/**
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Question = (props) => {
  return(
    <TriviaQuestion>{props.currQuestion}</TriviaQuestion>
  )
}

export default Question;