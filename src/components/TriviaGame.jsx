import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Question from './Question';
import Answer from './Answer';

// Properties of each question from OpenTrivia API
const tResponse = 'response_code';  // Response of API request
const tType = 'type';
const tQuestion = 'question';
const tCorrect = 'correct_answer';
const tIncorrect = 'incorrect_answers';

// Styled Components
const TriviaGameContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

// Question Queue to track the question when the user starts playing the game.
const TriviaGame = (props) => {
  const [userDifficulty, setUserDifficulty] = useState(props.userDifficulty);
  const [questionNum, setQuestionNum] = useState(0);
  const [triviaQueue, setTriviaQueue] = useState([]);

  // Async function to return an array of 50 trivia question from OpenTrivia API, a new batch of question every call
  const getTriviaQuestion = async() => {
    const openTrivia_api_call = await fetch(`https://opentdb.com/api.php?amount=50&difficulty=${userDifficulty}&type=multiple`)
    const openTrivia_api_data = await openTrivia_api_call.json();
    if (openTrivia_api_data[tResponse] !== 0) { // When the api_call failed to send any question send an error
      alert("Oops 401 Error occurred, please try again later.")
    }
    return openTrivia_api_data.results;
  }

  // Set the original batch of question, will only get another batch when the previous round is finished
  useEffect(() => {
    const resetTriviaQueue = async () => {
      let questions = [];
      try {
        questions = await getTriviaQuestion();
      } catch (e) {
        console.log(e);
      }
      setTriviaQueue(questions);
      triviaQueue.map((val, ind) => console.log(`question #${ind+1} --> ${val['question']}`));
    }
    resetTriviaQueue();
    // eslint-disable-next-line
  }, []);

  return(
    <div>
      <TriviaGameContainer>
          <Question currType={triviaQueue[tType]} currQuestion={triviaQueue[tQuestion]}/>
          <Answer currCorrect={triviaQueue[tCorrect]} currIncorrect={triviaQueue[tIncorrect]} />
        </TriviaGameContainer>
    </div>

  )
}
export default TriviaGame;