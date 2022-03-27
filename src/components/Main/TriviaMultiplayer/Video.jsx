import React, {useEffect, useRef} from 'react';
import styled from "styled-components";

/** VIDEO */
const VideoHolder1 = styled.video`
  width: 20vw;
  height: 25vh;
  display: flex;
  margin: .25vh;
  text-align: center;
  justify-content: center;
  align-items: center;
`

// props: stream
const Video = (props) => {
  const vidRef = useRef(undefined);

  useEffect(() => {
    let video = vidRef.current;
    video.srcObject = props.stream;
    video.play();

  }, [vidRef.current])

  return(
    <div>
      <VideoHolder1 ref={vidRef} />
    </div>
  )
}

export default Video;