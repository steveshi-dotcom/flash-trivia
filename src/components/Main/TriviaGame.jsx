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
export const TriviaGameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 60%;
  height: 100%;
  border: 4px solid black;
`;

// Question Queue to track the question when the user starts playing the game.
const TriviaGame = (props) => {
  const [loading, setLoading] = useState(true);
  const [userDifficulty, setUserDifficulty] = useState(props.userDifficulty);
  const [triviaRound, setTriviaRound] = useState(0);
  const [triviaQueue, setTriviaQueue] = useState([]);
  const [questionNum, setQuestionNum] = useState(1);
  const [userPoints, setUserPoints] = useState(0);

  // Async function to return an array of 50 trivia question from OpenTrivia API, a new batch of question every call
  const getTriviaQuestion = async() => {
    const openTrivia_api_call = await fetch(`https://opentdb.com/api.php?amount=50&difficulty=${userDifficulty}&type=multiple`)
    const openTrivia_api_data = await openTrivia_api_call.json();
    if (openTrivia_api_data[tResponse] !== 0) { // When the api_call failed to send any question send an error
      alert("Oops 401 Error occurred, please try again later.");
    }
    await setTriviaQueue(openTrivia_api_data.results);
    /*
    console.log(openTrivia_api_data.results); // Synchronous
    console.log(triviaQueue);                 // TriviaQueue not updated yet??????
    */
    setLoading(false);
  }

  // Set the original batch of question, will only get another batch when the previous round is finished
  useEffect(() => {
    getTriviaQuestion().then((res) => console.log(res));
    /*const resetTriviaQueue = async () => {
      let questions = [];
      try {
        questions = await getTriviaQuestion();
      } catch (e) {
        console.log(e);
      }
      setTriviaQueue(questions);
      setLoading(false);
      console.log(triviaQueue)
      //triviaQueue.map((val, ind) => console.log(`question #${ind+1} --> ${val['question']}`));
    }*/
    // eslint-disable-next-line
  }, [triviaRound]);

  function handleResult(e) {
    if (e === 1) {
      setUserPoints(userPoints + 2);
    }
  }
  return(
    <TriviaGameContainer>
      {!loading ? (
        <div>
          <Question qNum={questionNum}
                    qType={triviaQueue[questionNum][tType]}
                    qQues={triviaQueue[questionNum][tQuestion]}
                    qUserResult={(e) => handleResult(e)}
          />
          <Answer qCorrect={triviaQueue[questionNum][tCorrect]}
                  qIncorrect={triviaQueue[questionNum][tIncorrect]}

          />
        </div>
      ) : (
        <div id={"question-loading"}>This WebPage is currently high, come back later</div>
      )}
    </TriviaGameContainer>
  )
}
export default TriviaGame;