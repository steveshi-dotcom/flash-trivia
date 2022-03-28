import React, {useEffect, useState} from 'react';
import { useLocation } from "react-router-dom";
import styled from 'styled-components';
import qs from 'qs';
import { searchScoreParam } from "../Main/TriviaGame.jsx";
import {searchNameParam, searchRoomParam} from "../Start/HomePage.jsx";
import Answer from "../Main/TriviaGame/Answer.jsx";

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
`
const AnswerBoard = styled.div`
  background: white;
  font-size: 1.5em;
`
const T_Question = styled.text`
  
`
const T_Answer = styled.text`

`

const Result = () => {
  const playerLocation = useLocation();
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    const scoreInput = qs.parse(playerLocation.search.slice(1)); // playerLocation.search: ?name=steve&room=1234
    setDisplayScore(scoreInput[searchScoreParam]);
  }, [playerLocation]);

  return(
    <ResultContainer>
      <ScoreBoard>Score: {displayScore}%</ScoreBoard>
      <AnswerBoard>
        <T_Question>How much does an elephant weigh on average?</T_Question><T_Answer>1 pound</T_Answer>
      </AnswerBoard>
    </ResultContainer>
  )
}

export default Result;