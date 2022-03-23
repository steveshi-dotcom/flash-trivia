import React from 'react';
import styled from 'styled-components';
import happyPuppy from './imgs/cute-pup.jpg';

// Style Component
export const TriviaQuestion = styled.h1`
  display: flex;
  font-size: 1.25em;
  color: black;
  background-color: whitesmoke;
  width: 39.5vw;
  height: 10vh;
  margin: 1.5% 15% .5% 15%;
  padding: 2% 2.5%;
  border-radius: 1em;
  align-items: center;
`
export const PupHolder = styled.img`
  width: 30%;
  max-width: 50%;
  height: 30%;
  max-height: 50%;
  margin: 10px;
`;
// Current question displayed
// props:: qNum, qType, qQues
const Question = (props) => {
  const currNumber = props.qNum + 1;
  const currType = props.qType;
  const currQuestion = props.qQues;/*TODO Change the gibberish from JSON to special character("$%'..) */
  return(
    <div>
      <TriviaQuestion>{currNumber}) {currQuestion}</TriviaQuestion>  {/*TODO possible coloring of the qType category*/}
      <PupHolder src={happyPuppy}/>
      {/*TODO Possible Images generated from ai base on qQues keywords OpenAI??? */}
    </div>
  )
}
export default Question;