import React from 'react';
import styled from 'styled-components';
import he from 'he';

// Style Components
const ChoiceContainer = styled.div`
  justify-content: center;
`
const Choice = styled.button`
  font-size: 1.25em;
  font-weight: bold;
  color: white;
  width: 22vw;
  height: 15vh;
  padding: 2%;
  border-radius: 1rem;
  margin: .4% 1.5%;
`
const ChoiceOne = styled(Choice)`
  background-color: blue;
`
const ChoiceTwo = styled(Choice)`
  background-color: purple;
`
const ChoiceThree = styled(Choice)`
  background-color: green;
`
const ChoiceFour = styled(Choice)`
  background-color: red;
`

// Current choice for the question displayed
// props:: qCorrect, qIncorrect
const Answer = (props) => {
  // Randomly order the answer
  const triviaOptions = [props.qCorrect, ...props.qIncorrect]
    .map(curr => {
      return {curr, order: Math.random()}
    })
    .sort((p, q) => {
      return p.order - q.order;
    })
    .map(({curr}) => curr);

  // Check to see if the answer is correct and send the result back to TriviaGame component to handle points
  const checkAnswer = (e) => {
    const rightAnswer = e.target.value === props.qCorrect;
    if (rightAnswer) {
      return 1;
    } else {
      return 0;
    }
  }

  // Render the four different answer choices for the player
  return(
    <ChoiceContainer>
      <ChoiceOne value={triviaOptions[0]} onClick={(e) => props.qResult(checkAnswer(e))}>
        {he.decode(triviaOptions[0])}
      </ChoiceOne>
      <ChoiceTwo value={triviaOptions[1]} onClick={(e) => props.qResult(checkAnswer(e))}>
        {he.decode(triviaOptions[1])}
      </ChoiceTwo>
      <ChoiceThree value={triviaOptions[2]} onClick={(e) => props.qResult(checkAnswer(e))}>
        {he.decode(triviaOptions[2])}
      </ChoiceThree>
      <ChoiceFour value={triviaOptions[3]} onClick={(e) => props.qResult(checkAnswer(e))}>
        {he.decode(triviaOptions[3])}
      </ChoiceFour>
    </ChoiceContainer>
  )
}
export default Answer;