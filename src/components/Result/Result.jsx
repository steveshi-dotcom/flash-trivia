import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import GameLoading from "../Main/TriviaGame/GameLoading.jsx";
import he from 'he';
import qs from 'qs';
import { searchScoreParam } from "../Main/TriviaGame.jsx";
import {searchRoomParam} from "../Start/HomePage.jsx";
import {homeUrl} from "../../App.js";

import socket from "../Main/TriviaMultiplayer/socket.js";

// styled components
const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const ScoreBoard = styled.h1`
  font-size: 3.5em;
  font-weight: bold;
  margin-bottom: 1vh;
`
const AnswerBoard = styled.div`
  font-size: 1.5em;
  display: flex;
  flex-direction: column;
`
const Question = styled.text`
  display: flex;
  color: black;
  background: white;
  width: 40vw;
  height: 8vh;
  padding: 2%;
  border-radius: .25em;
  margin: 1vw;
  text-align: left;
`
const Correct = styled.text`
  display: flex;
  font-size: 1.1em;
  color: black;
  background: lawngreen;
  width: 22vw;
  border-radius: .25em;
  margin: 1vw;
  justify-content: center;
  align-items: center;
`
const BackHomeBtn = styled.button`
  cursor: pointer;
  position: fixed;
  bottom: 50vh;
  right: 0;
  width: 10vw;
  height: 10vh;
  border-radius: .25em;
  font-size: 1.5em;
  :hover {
    background: mediumslateblue;
  }
`

const Result = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [displayScore, setDisplayScore] = useState(0);
  const [answerBoard, setAnswerBoard] = useState([]);

  const playerLocation = useLocation();
  useEffect(() => {
    const playerOutput = qs.parse(playerLocation.search.slice(1)); // playerLocation.search: ?name=steve&room=1234
    setDisplayScore(playerOutput[searchScoreParam]);

    socket.emit('obtain-answer-board', playerOutput[searchRoomParam]);
    socket.on('obtain-answer-board', answerBoard => {
      setAnswerBoard(answerBoard);
      //console.log(answerBoard);
      setLoading(false);
    });
  }, [playerLocation]);

  // Show individual questions wih answer
  const showIndividualQuestion = (i_question, i_correct, index) => {
    const QuestionContainer = styled.div`
      display: flex;
      margin-bottom: 2vh;
    `
    return(
      <QuestionContainer key={index}>
        <Question>#{index + 1} {he.decode(i_question)}</Question>
        <Correct>{he.decode(i_correct)}</Correct>
      </QuestionContainer>
    )
  }
  // Navigate back home
  const backHome = () => {
    navigate(homeUrl);
  }

  return(
    <ResultContainer>
      {!loading ? (
        <div>
          <ScoreBoard>Score: {displayScore}%</ScoreBoard>
          <AnswerBoard>
            {answerBoard.map((curr, ind) => {
              return showIndividualQuestion(curr['question'], curr['correct_answer'], ind);
            })}
          </AnswerBoard>
          <BackHomeBtn onClick={backHome}>Go Home</BackHomeBtn>
        </div>
      ) : (
        <GameLoading />
      )}
    </ResultContainer>
  )
}

export default Result;