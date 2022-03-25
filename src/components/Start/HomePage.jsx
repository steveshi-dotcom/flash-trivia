import React, {useState}from 'react';
import styled from 'styled-components';
import Header from './Header';
import {mainUrl} from "../../App";
import {createSearchParams, useNavigate} from "react-router-dom";

// styled components
const HomeContainer = styled.div`
  margin-top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 60vh;
  font-family: Arial,serif;
`
const InformationContainer = styled.div`
  width: 25vw;
  height: 10vh;
  margin: 0 0 2vh 0;
  display: flex;
  justify-content: center;
  align-items: center;
`
const UserQuestion = styled.text`
  font-weight: bold;
  width: 10vw;
  padding: 5%;
  margin-right: 8%;
  font-size: 1.5em;
`
const UserInput = styled.input`
  text-align: left;
  font-size: 1.5em;
  width: 14vw;
  height: 4.5vh;
  border: none;
  background: transparent;
  outline: pink;
  border-bottom: 2px solid black;
`
const JoinBtn = styled.button`
  width: 80px;
  height: 40px;
  align-self: center;
  margin-left: 20vw;
  background: white;
  border-radius: .25em;
  box-shadow: 0 9px #999;
  border: none;
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
  :hover {
    background: mediumslateblue;
  }
  :active {
    background: green;
    box-shadow: 0 0 #666 !important;
    transform: translateY(9px);
  }
`

const searchName = 'name';
const searchRoom = 'room';

const HomePage = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  const navigate = useNavigate();

  // Navigate to the main trivia game page to start the game
  const startTriviaSession = () => {
    if (name.length === 0) {
      alert("Oops, please reenter your name.");
    } else if (isNaN(room) || room < 0) {
      alert("Oops, please reenter room number.");
    } else {
      navigate({
        pathname: mainUrl,
        search: createSearchParams([
          [searchName, name],
          [searchRoom, room]
        ]).toString()
      });
    }
  };

  return(
    <div>
      <Header />
      <HomeContainer>
        <InformationContainer>
          <UserQuestion>Name:</UserQuestion>
          <UserInput type={'text'} onChange={e => setName(e.target.value)} placeHolder={"Hello"}/>
        </InformationContainer>
        <InformationContainer>
          <UserQuestion>Room#:</UserQuestion>
          <UserInput type={'text'} onChange={e => setRoom(e.target.value)}/>
        </InformationContainer>
        <JoinBtn onClick={startTriviaSession}>Start</JoinBtn>
      </HomeContainer>
    </div>
  );
};

export default HomePage;