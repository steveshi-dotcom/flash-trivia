import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import happyPuppy from './imgs/cute-pup.jpg';
import he from 'he';

// style components
const QuestionContainer = styled.div`
  display: flex;
`
export const TriviaQuestion = styled.h1`
  display: flex;
  font-size: 1.25em;
  color: black;
  background-color: whitesmoke;
  width: 39.5vw;
  height: 10vh;
  margin: 1.5% 0 .5% 15%;
  padding: 2% 2.5%;
  border-radius: 1em;
  align-items: center;
`
const TriviaTimeLeft = styled.h1`
  font-family: 'Orbitron', sans-serif;
  width: 20%;
  margin: auto auto auto auto;
  font-size: 3.75em;
`
const TriviaTimeLeftPressure = styled(TriviaTimeLeft)`
  color: red;
`
export const PupHolder = styled.img`
  width: 30%;
  height: 40%;
`;

// Current question displayed
// props:: qNum, qType, qQues, qResults
const Question = (props) => {
  const currNumber = props.qNum + 1;
  const currType = props.qType;
  const currQuestion = he.decode(props.qQues);
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (props.qRunTimer.current !== props.qNum) {
      setTimeLeft(60);
      props.qRunTimer.current++;
    }
    const countDown = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    if (timeLeft === 0) {
      clearTimeout(countDown);
      setTimeLeft(60);
      props.qResults(0);
    } else {
      return () => clearTimeout(countDown);
    }
  }, [timeLeft]);

  return(
    <div>
        <QuestionContainer>
          <TriviaQuestion>{currNumber}) {currQuestion}</TriviaQuestion> {/*TODO possible coloring of the qType category*/}
          {timeLeft > 10 ?
            (<TriviaTimeLeft>{timeLeft}</TriviaTimeLeft>) : (<TriviaTimeLeftPressure>{timeLeft}</TriviaTimeLeftPressure>)
          }
        </QuestionContainer>
      <PupHolder src={happyPuppy}/>
      {/*TODO Possible Images generated from ai base on qQues keywords OpenAI??? */}
    </div>
  )
}
export default Question;