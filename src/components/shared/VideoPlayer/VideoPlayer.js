import { duration } from "moment";
import React, { useState, useEffect, useRef } from "react";

const videoContainer = {
  position: "relative",
  width: "100%",
  height: "100%",
  /* padding: 20px; */
  borderRadius: "5px",
  backgroundAttachment: "scroll",
  overflow: "hidden",
};

const videoStyle = {
  minWidth: "100%",
  minHeight: "100%",
  maxHeight: "500px",
  position: "relative",
  zIndex: 1,
};

const overlay = {
  height: "100%",
  width: "100%",
  position: "absolute",
  top: "0px",
  left: "0px",
  zIndex: 2,
  background: "#000000",
  opacity: 0.5,
};

const overLayButton = {
  margin: 0,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const VideoPlayer = (props) => {
  const videoRef = useRef();
  const [CurrentTime, setCurrentTime] = useState(null);
  const [Duration, setDuration] = useState(props.duration || 0);

  const [StopCount, setStopCount] = useState(props.stops || 0);

  const [CheckPoints, setCheckPoints] = useState(props.checkpoints || []);
  const [Passed, setPassed] = useState([]);

  const [Paused, setPaused] = useState(false);

  const handleVideoMounted = (element) => {
    if (element !== null) {
      // element.currentTime = 30;
      console.log("TEST", element);
    }
  };

  const checkProgress = (event) => {
    if (event !== null) {
      // element.currentTime = 30;
      let currentTime = event.target.currentTime;

      setCurrentTime(currentTime);
    }
  };
  useEffect(() => {
    console.log("CurrentTime", CurrentTime);
    console.log("CheckPoint", CheckPoints);
    if (CurrentTime > 0 && CheckPoints != null) {
      if (CurrentTime >= CheckPoints[0]) {
        console.log("STOP");
        videoRef.current.pause();
        setPaused(true);
        // videoRef.current.currentTime = 10;
      }
      return () => {};
    }
  }, [CurrentTime]);

  useEffect(() => {
    if (props.checkpoints == null) {
      let checkpnts = [];
      if (props.duration != null && props.stops != null) {
        let interval = Math.round(props.duration / (props.stops+1));
        console.log(interval, props);
        // for (let i = 1; i <= props.stops; i++){
        //   checkpnts.push(i*interval);
        // }
        // checkpnts = [...Array(10).keys()]
        checkpnts = Array.from({length: props.stops}, (_, i) => interval*(i + 1));
        console.log("checkpoints:", checkpnts);
        setCheckPoints(checkpnts);
      }
    }
  },[]);

  const resumeVideo = () => {
    setPaused(false);
    var currentTime = CurrentTime;
    if (currentTime >= CheckPoints[1]) {
      currentTime = Passed.length > 0 ? Passed[0]: 0;
    }
    console.log(currentTime);
    let newCP = [...CheckPoints];
    let newPassed = [...Passed];

    // newPassed.push(CheckPoints[0]);
    // newCP.shift();
    newPassed = newPassed.concat(CheckPoints.filter((e) => e <= currentTime));
    newCP = CheckPoints.filter((e) => e > currentTime);

    setPassed(newPassed);
    setCheckPoints(newCP);
    console.log("status: ",newCP, newPassed);
    if (newPassed.length > 0) {
      videoRef.current.currentTime = newPassed.slice(-1)[0];
    } else {
      videoRef.current.currentTime = 0;
    }
    videoRef.current.play();
  };

  const resetProgress = () => {
    setCurrentTime(0);
    videoRef.current.pause();
    // setCheckPoints(props.checkpoints);
    if (props.checkpoints == null) {
      let checkpnts = [];
      if (props.duration != null && props.stops != null) {
        let interval = Math.round(props.duration / props.stops+1);
        console.log(interval, props);
        // for (let i = 1; i <= props.stops; i++){
        //   checkpnts.push(i*interval);
        // }
        checkpnts = Array.from({length: props.stops}, (_, i) => interval*(i + 1));
        console.log("checkpoints:", checkpnts);
        setCheckPoints(checkpnts);
      }
    } else {
      setCheckPoints(props.checkpoints);
    }
    setPassed([]);
  };

  const prepareCheckpoints = (e) => {
    setDuration(e.target.duration);
    // console.log(e.target.duration,StopCount);
    // let length = Math.floor(e.target.duration / StopCount);
    // let checkpoints = [];
    // for (let index = 1; index < StopCount; index++) {
    //     checkpoints.push(length * index);
    // }
    // console.log(checkpoints);
    // setCheckPoints(checkpoints);
  };

  return (
    <div style={videoContainer}>
      <div hidden={!Paused} style={overlay}>
        <button
          className="btn btn-danger"
          style={overLayButton}
          onClick={resumeVideo}
        >
          RESUME
        </button>
      </div>
      <video
        style={videoStyle}
        // ref={el => { console.log("el",el); videoRef.current = el; }}
        // ref={handleVideoMounted}
        ref={videoRef}
        id="video"
        controls
        autoPlay
        // currentTime={11.3}
        // width={1000}
        // height={500}
        src={props.src}
        // onProgress={checkProgress}
        onPlay={(e) => {
          console.log("Start", e.target.duration);
          prepareCheckpoints(e);
          checkProgress(e);
        }}
        onPlaying={(e) => {
          console.log("Playing");
          checkProgress(e);
        }}
        onTimeUpdate={(e) => {
          checkProgress(e);
        }}
        onEnded={(e) => {
          console.log("ended");
          resetProgress(e);
          if (typeof props.handleEnded === "function") {
            props.handleEnded(true);
          }
        }}
        // controlsList="nodownload"
      />
      {/* <div class="overlayText">

                <p id="topText">Content above your video</p>
            </div> */}
    </div>
  );
};

export default VideoPlayer;
