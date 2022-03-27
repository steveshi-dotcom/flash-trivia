import React, {useEffect, useState} from 'react';
import { useLocation } from "react-router-dom";
import styled from 'styled-components';
import qs from 'qs';
import { searchScoreParam } from "../Main/TriviaGame.jsx";
import {searchNameParam, searchRoomParam} from "../Start/HomePage.jsx";
import Answer from "../Main/TriviaGame/Answer.jsx";

// styled components
const ScoreBoard = styled.h1`
  font-size: 3.5em;
  font-weight: bold;
`
const AnswerBoard = styled.div`
  display: flex;
  background: white;
  justify-content: center;
  align-items: center;
  width: 10vw;
`
const InvidualAnswers = styled.p`

`

const Result = () => {
  const playerLocation = useLocation();
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    const scoreInput = qs.parse(playerLocation.search.slice(1)); // playerLocation.search: ?name=steve&room=1234
    setDisplayScore(scoreInput[searchScoreParam]);
  }, [playerLocation]);

  return(
    <div style={{alignItems: "center", justifyContent: "center"}}>
      <ScoreBoard>Score: {displayScore}%</ScoreBoard>
      <AnswerBoard>
        <InvidualAnswers>asfd</InvidualAnswers>
      </AnswerBoard>
    </div>
  )
}

export default Result;