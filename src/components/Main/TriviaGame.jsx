import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import GameLoading from "./TriviaGame/GameLoading.jsx";
import Question from './TriviaGame/Question.jsx';
import Answer from './TriviaGame/Answer.jsx';
import {createSearchParams, useNavigate} from "react-router-dom";
import {resultUrl} from "../../App.js";

// Properties of each question from OpenTrivia API
const tResponse = 'response_code';  // Response of API request
const tType = 'type';
const tQuestion = 'question';
const tCorrect = 'correct_answer';
const tIncorrect = 'incorrect_answers';

// Styled Components
export const TriviaGameContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 60%;
  height: 99%;
  padding: 0 0 5% 0;
`

export const searchScoreParam = 'score';

// Question Queue to track the question when the user starts playing the game.
const TriviaGame = (props) => {
  // navigation function use to navigate through pages
  const navigate = useNavigate();

  // States of the TriviaGame Function
  const [loading, setLoading] = useState(true);
  const [userDifficulty, setUserDifficulty] = useState(props.userDifficulty);
  const [triviaRound, setTriviaRound] = useState(0);
  const [triviaQueue, setTriviaQueue] = useState([]);
  const [questionNum, setQuestionNum] = useState(0);
  const [userPoints, setUserPoints] = useState(0);
  const runTimer = useRef(0);

  // Async function to return an array of 50 trivia question from OpenTrivia API, a new batch of question every call
  const getTriviaQuestion = async() => {
    const openTrivia_call = await fetch(`https://opentdb.com/api.php?amount=50&difficulty=${userDifficulty}&type=multiple`)
    const openTrivia_data = await openTrivia_call.json();
    if (openTrivia_data[tResponse] !== 0) { // When the api_call failed to send any question send an error
      alert("Oops 401 Error occurred, please try again later.");
    }
    await setTriviaQueue(openTrivia_data.results);

    // Load up the rendering of the question after triviaQueues finish up fetching the question
    setTimeout(() => {
      setLoading(false);
    }, 5000); // Allow the user to look at the puppy pic a bit longer :)
  }

  // New round of trivia game, only started on the first round or every new round
  useEffect(() => {
    setUserDifficulty(props.userDifficulty);
    getTriviaQuestion().then(res => console.log("BEEP BEEP BOP, Finished loading up the questions."));
    setQuestionNum(0);
    setUserPoints(0);
    runTimer.current = 0;
    // eslint-disable-next-line
  }, [triviaRound]);

  // Add up points for the user, and move on to the next question, go to results when finished
  const handlePoints = (e) => {
    if (e === 1) {
      setUserPoints(userPoints + 2);
    } else {
    }
    // Consider whether to move on to the next question or that finish up the game when it reaches the maximum
    if (questionNum < 49) {
      setQuestionNum(questionNum + 1);
    } else {
      finishCurrentRound();
    }
  }

  // Finish the current round and move on to the result page
  // where the user can view their current score as well as
  // look at the answers to the questions
  const finishCurrentRound = () => {
    setTriviaRound(triviaRound + 1);
    navigate({
      pathname: resultUrl,
      search: createSearchParams([
        [searchScoreParam, userPoints]
      ]).toString()
    });
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