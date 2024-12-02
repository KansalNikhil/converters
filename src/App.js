import React, { useState, useRef } from "react";
import AudioToTextConvert from'./components/audioToTextConvert.jsx';
import AudioRecorder from "./components/audioRecorder.jsx";
import VideoRecorder from "./components/videoRecorder.jsx";
import TextToSpeech from "./components/textToSpeech.jsx";
import VideoAudioToText from "./components/videoAudioToText.jsx";

const App = () => {

  return (
    <div>
      <div><h2>Audio To Text Converter</h2><div><TextToSpeech /></div></div>
      <div><h2>Text to Speech Converter</h2><div><AudioToTextConvert /></div></div>
      <div><h2>Video to Text Converter</h2><div><VideoAudioToText /></div></div>
      <div><h2>Audio Recorder</h2><div><AudioRecorder /></div></div>
      <div><h2>Video Recorder</h2><div><VideoRecorder /></div></div>
    </div>
  );
};

export default App;