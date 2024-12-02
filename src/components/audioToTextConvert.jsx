import React, { useState, useRef } from "react";

const AudioToTextConvert = () => {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  // Initialize Speech Recognition
  const initializeRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in your browser.");
      return;
    }
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true; // Keeps listening until stopped
    recognitionRef.current.interimResults = true; // Captures partial text
    recognitionRef.current.lang = "en-US"; // Set language
  };

  const startListening = () => {
    if (!recognitionRef.current) initializeRecognition();

    recognitionRef.current.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");
      setText(transcript);
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current.start();
    setIsListening(true);
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
  };

  return (
    <div>
      {/* <h2>Speech to Text</h2> */}
      <button onClick={isListening ? stopListening : startListening}>
        {isListening ? "Stop Listening" : "Start Listening"}
      </button>
      <p>
        <strong>Transcript:</strong> {text}
      </p>
    </div>
  );
};

export default AudioToTextConvert;