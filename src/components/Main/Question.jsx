import React from 'react';
import styled from 'styled-components';

// Style Component
export const TriviaQuestion = styled.h1`
  display: flex;
  font-size: 1.6rem;
  justify-content: center;
  color: black;
  background-color: whitesmoke;
  max-width: 50vw;
  max-height: 25vh;
  margin: 1% 15%;
  padding: 2% 2.5%;
  border-radius: 1rem;
`

// Current question displayed
// props:: qNum, qType, qQues
const Question = (props) => {
  const currNumber = props.qNum;
  const currType = props.qType;
  const currQuestion = props.qQues;/*TODO Change the gibberish from JSON to special character("$%'..) */
  return(
    <div>
      <TriviaQuestion>{currNumber}) {currQuestion}</TriviaQuestion>  {/*TODO possible coloring of the qType category*/}
      {/*TODO Possible Images generated from ai base on qQues keywords OpenAI??? */}
    </div>
  )
}
export default Question;