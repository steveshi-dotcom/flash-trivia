import React from 'react';
import styled from 'styled-components';

// Style Components
/*const ChoiceContainer = styled.div`
  display: grid;
`*/
const Choice = styled.button`
  font-size: 1.5rem;
  justify-content: center;
  align-items: center;
  color: black;
  width: 20vw;
  height: 10vh;
  padding: 2%;
  border-radius: 1rem;
  margin: .4% 1%;
`
const ChoiceOne = styled(Choice)`
  background-color: blue;
`
const ChoiceTwo = styled(Choice)`
  background-color: yellow;
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
  console.log(triviaOptions);
  // Check the answer that the user picked
  const checkAnswer = (e) => {
    console.log(e.target.value);
    if (e.target.value === props.qCorrect) {
      console.log("Correct Answer");
    } else {
      console.log("Wrong Answer")
    }
  }

  /*const returnQuestionOption = (curr, ind) => {
    switch (ind) {
      case 0:
        return <ChoiceOne key={ind} value={curr} onClick={(e) => checkAnswer(e)}>{curr}</ChoiceOne>
      case 1:
        return <ChoiceTwo key={ind} value={curr} onClick={(e) => checkAnswer(e)}>{curr}</ChoiceTwo>
      case 2:
        return <ChoiceThree key={ind} value={curr} onClick={(e) => checkAnswer(e)}>{curr}</ChoiceThree>
      default:
        return <ChoiceFour key={ind} value={curr} onClick={(e) => checkAnswer(e)}>{curr}</ChoiceFour>
    }
  }*/
  return(
    <div>
      <ChoiceOne value={triviaOptions[0]} onClick={(e) => checkAnswer(e)}>{triviaOptions[0]}</ChoiceOne>
      <ChoiceTwo value={triviaOptions[1]} onClick={(e) => checkAnswer(e)}>{triviaOptions[1]}</ChoiceTwo>
      <ChoiceThree value={triviaOptions[2]} onClick={(e) => checkAnswer(e)}>{triviaOptions[2]}</ChoiceThree>
      <ChoiceFour value={triviaOptions[3]} onClick={(e) => checkAnswer(e)}>{triviaOptions[3]}</ChoiceFour>
      {/*triviaOptions.map((curr, ind) => returnQuestionOption(curr, ind))*/}
    </div>
  )
}

export default Answer;