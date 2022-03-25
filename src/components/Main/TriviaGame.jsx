import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import GameLoading from "./GameLoading";
import Question from './Question';
import Answer from './Answer';
import rightAnswer from './imgs/rightMeme.jpeg';
import wrongAnswer from './imgs/wrongMeme.jpeg';

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
  text-align: center;
  width: 60%;
  height: 99%;
  padding: 0 0 5% 0;
`

// Question Queue to track the question when the user starts playing the game.
const TriviaGame = (props) => {
  // States of the TriviaGame Function
  const [loading, setLoading] = useState(true);
  const [userDifficulty, setUserDifficulty] = useState(props.userDifficulty);
  const [triviaRound, setTriviaRound] = useState(0);
  const [triviaQueue, setTriviaQueue] = useState([]);
  const [questionNum, setQuestionNum] = useState(0);
  const [userPoints, setUserPoints] = useState(0);
  const [memeTime, setMemeTime] = useState({"display": false});
  const runTimer = useRef(0);

  // Async function to return an array of 50 trivia question from OpenTrivia API, a new batch of question every call
  const getTriviaQuestion = async() => {
    const openTrivia_api_call = await fetch(`https://opentdb.com/api.php?amount=50&difficulty=${userDifficulty}&type=multiple`)
    const openTrivia_api_data = await openTrivia_api_call.json();
    if (openTrivia_api_data[tResponse] !== 0) { // When the api_call failed to send any question send an error
      alert("Oops 401 Error occurred, please try again later.");
    }
    await setTriviaQueue(openTrivia_api_data.results);

    // Load up the rendering of the question after triviaQueues finish up fetching the question
    setTimeout(() => {
      setLoading(false);
    }, 1); // Allow the user to look at the puppy pic a bit longer :)
  }

  // New round of trivia game, only started on the first round or every new round
  useEffect(() => {
    setUserDifficulty(props.userDifficulty);
    getTriviaQuestion().then((res) => console.log("Bleep Beep Bop, Questions processed"));
    setQuestionNum(0);
    setUserPoints(0);
    runTimer.current = 0;
    // eslint-disable-next-line
  }, [triviaRound]);

  // Add up points for the user, and move on to the next question, go to results when finished
  const handlePoints = (e) => {
    if (e === 1) {
      console.log("right answer");
      setUserPoints(userPoints + 2);
      setMemeTime({"display": true, "type": 1, "unknownMeme": sendUserTheirGift(1)})
    } else {
      console.log("wrong answer");
      setMemeTime({"display": true, "type": 0,  "unknownMeme": sendUserTheirGift(0)})
    }
    // Consider whether to move on to the next question or that finish up the game when it reaches the maximum
    if (questionNum < 49) {
      setQuestionNum(questionNum + 1);
    } else {
      finishCurrentRound();
    }
  }

  // Send the user a meme of the result of what they picked (right/wrong), option to move on or a timer??
  const sendUserTheirGift = async(e) => {
    if (e === 1) {
      return <img src={rightAnswer} alt={"right-answer"} />;
    } else {
      return <img src={wrongAnswer} alt={"wrong-answer"} />
    }
  }

  // Finish the current round and move on to the result page
  // where the user can either laugh about the good game 🙂
  // or cry on their stupidity😞
  const finishCurrentRound = () => {
    console.log("All question answered");
    setTriviaRound(triviaRound + 1);
    /** TODO Go to result page, leaving the main page*/
  }

  // Render Trivia Game (Left Section of Main)
  return(
    <TriviaGameContainer>
      {!loading ? (
        <div>
          <Question qNum={questionNum}
                    qType={triviaQueue[questionNum][tType]}
                    qQues={triviaQueue[questionNum][tQuestion]}
                    qResults={(e) => handlePoints(e)}
                    qRunTimer={runTimer}
          />
          <Answer qCorrect={triviaQueue[questionNum][tCorrect]}
                  qIncorrect={triviaQueue[questionNum][tIncorrect]}
                  qResult={(e) => handlePoints(e)}
          />
        </div>
      ) : (
        <GameLoading />
      )}
    </TriviaGameContainer>
  )
}
export default TriviaGame;