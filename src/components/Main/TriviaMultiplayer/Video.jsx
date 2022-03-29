import React, {useEffect, useRef} from 'react';
import styled from "styled-components";

// styled components
const VideoHolder1 = styled.video`
  width: 20vw;
  height: 25vh;
  margin: 0 .75vw 0 0;
`

// props: stream
const Video = (props) => {
  const vidRef = useRef(undefined);

  useEffect(() => {
    vidRef.current.srcObject = props.stream;
    vidRef.current.addEventListener("loadedmetadata", () => {
      vidRef.current.play();
    });
  }, [vidRef.current])

  return(
      <VideoHolder1 ref={vidRef} />
  )
}
export default Video;