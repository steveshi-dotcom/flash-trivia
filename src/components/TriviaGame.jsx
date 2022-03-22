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

/**
 * Question Queue to track the question when the user starts playing the game.
 * @param props.userDifficulty
 * @returns {JSX.Element}
 * @constructor
 */
const TriviaGame = (props) => {
  const [userDifficulty, setUserDifficulty] = useState(props.userDifficulty);
  const [questionNum, setQuestionNum] = useState(0);
  const [triviaQueue, setTriviaQueue] = useState([]);

  /**
   * Async function to call 50 trivia question from OpenTrivia API, a new batch of question is given for every call
   * @returns {Promise<*>}
   */
  const getTriviaQuestion = async() => {
    let openTrivia_api_call;
    switch (userDifficulty) {
      case 'easy':
        openTrivia_api_call = await fetch(`https://opentdb.com/api.php?amount=50&difficulty=easy&type=multiple`);
        break;
      case 'hard':
        openTrivia_api_call = await fetch(`https://opentdb.com/api.php?amount=50&difficulty=hard&type=multiple`);
        break;
      default:
        openTrivia_api_call = await fetch(`https://opentdb.com/api.php?amount=50&difficulty=medium&type=multiple`);
        break;
    }
    const openTrivia_api_data = await openTrivia_api_call.json();
    if (openTrivia_api_data[tResponse] !== 0) {
      alert("Oops 401 Error occurred, please try again later.")
    }
    return openTrivia_api_data.results;
  }

  // Set the original batch of question, will only get another batch when the previous round is finished
  useEffect(() => {
    // ###i see multiple async coding styles here, Promise&then, await/async
    // just an async "wrapper" but it's necessary, feel free to rename.
    // In VSCode you can double-click var/function names and press F2 on window to refactor and rename all calls of that var/func
    const resetTriviaQueue = async () => {
      const questions = await getTriviaQuestion(); // so this is where await/async can get kinda tricky
      
      setTriviaQueue(questions);
      triviaQueue.map((val, ind) => console.log(`question #${ind+1} --> ${val['question']}`)) // can you try this and screenshot
    }
    resetTriviaQueue().then((result) => console.log("Trivia Batch Finished."));
    // .then((value) => {
    //   setTriviaQueue(value);
    // })
    // eslint-disable-next-line
  }, []);

  // function printTrivia() {
  //   triviaQueue.map((curr, idx) => console.log("question#" + (idx + 1) + "-->" + curr['question']));
  // }
  // printTrivia();

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