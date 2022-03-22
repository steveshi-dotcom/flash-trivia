import React from 'react';
import styled from 'styled-components';

const TriviaQuestion = styled.h1`
  display: flex;
  font-size: 35px;
  justify-content: center;
  color: white;
`
// Current question displayed
// props:: questionNum, questionType, question
const Question = (props) => {

  return(
    <TriviaQuestion>{props.qNum}){props.qType}{props.qQues}</TriviaQuestion>
  )
}

export default Question;