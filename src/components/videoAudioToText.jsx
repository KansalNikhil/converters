import React, { useRef, useState } from "react";

const VideoAudioToText = () => {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const speechRecognitionRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [transcription, setTranscription] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const startVideo = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
      }
    } catch (err) {
      console.error("Error accessing camera and microphone:", err);
    }
  };

  const startRecording = () => {
    if (!stream) {
      alert("Start the video first!");
      return;
    }

    const mediaRecorder = new MediaRecorder(stream, { mimeType: "video/webm" });
    mediaRecorderRef.current = mediaRecorder;
    setRecordedChunks([]);
    setIsRecording(true);

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        setRecordedChunks((prev) => [...prev, event.data]);
      }
    };

    mediaRecorder.start();

    // Start Speech Recognition
    startSpeechRecognition();
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }

    if (speechRecognitionRef.current) {
      speechRecognitionRef.current.stop();
    }

    setIsRecording(false);
  };

  const startSpeechRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in your browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US"; // Set language
    recognition.continuous = true; // Keep recognizing while recording
    recognition.interimResults = true;

    speechRecognitionRef.current = recognition;

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");
      setTranscription(transcript);
    };

    recognition.onerror = (err) => {
      console.error("Speech recognition error:", err);
    };

    recognition.start();
  };

  const downloadVideo = () => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "recorded-video.webm";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };

  return (
    <div>
      <h2>Video Recorder with Speech-to-Text</h2>
      <div>
        {stream ? (
          <video ref={videoRef} autoPlay muted style={{ width: "100%" }}></video>
        ) : (
          <button onClick={startVideo}>Start Video</button>
        )}
      </div>
      <div>
        {isRecording ? (
          <button onClick={stopRecording}>Stop Recording</button>
        ) : (
          <button onClick={startRecording}>Start Recording</button>
        )}
      </div>
      <video src={recordedChunks} controls ></video>
      <button onClick={downloadVideo} disabled={!recordedChunks.length}>
        Download Video
      </button>
      <h3>Transcription</h3>
      <p>{transcription || "No transcription available yet."}</p>
    </div>
  );
};

export default VideoAudioToText;
