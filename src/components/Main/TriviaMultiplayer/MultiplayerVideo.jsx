import React from 'react';
import styled from 'styled-components';
import Peer from "peerjs";


// Video part of Multiplayer component where the user will be able to communicate with four other player
const VideoRootContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`
const VideoHolder1 = styled.div`
  width: 20vw;
  height: 25vh;
  display: flex;
  margin-top: 10px;
  background-color: deeppink;
  text-align: center;
  justify-content: center;
  align-items: center;
`
const VideoHolder2 = styled(VideoHolder1)`
  margin-left: 5px;
`
const VideoHolder3 = styled(VideoHolder1)`
  margin-bottom: 10px;
  margin-right: 5px;
`
const VideoHolder4 = styled(VideoHolder1)`
  margin-bottom: 10px;
  margin-left: 5px;
`
const MultiplayerVideo = () => {
  const peer = new Peer()

  return(
    <VideoRootContainer>
      <VideoHolder1>Player Video 1</VideoHolder1>
      <VideoHolder2>Player Video 2</VideoHolder2>
      <VideoHolder3>Player Video 3</VideoHolder3>
      <VideoHolder4>Player Video 4</VideoHolder4>
    </VideoRootContainer>
  )
};

export default MultiplayerVideo;