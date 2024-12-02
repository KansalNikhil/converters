// import React, { useState } from "react";

// const TextToSpeech = () => {
//   const [text, setText] = useState("");
//   const [isSpeaking, setIsSpeaking] = useState(false);

//   const speak = () => {
//     if (!text.trim()) {
//       alert("Please enter some text to speak.");
//       return;
//     }

//     const utterance = new SpeechSynthesisUtterance(text);

//     // Optional: Set voice and language
//     utterance.lang = "en-US"; // Change for other languages (e.g., "es-ES" for Spanish)
//     utterance.pitch = 1; // 0 to 2 (default is 1)
//     utterance.rate = 1; // 0.1 to 10 (default is 1)
//     utterance.volume = 1; // 0 to 1 (default is 1)

//     // Set event listeners
//     utterance.onstart = () => setIsSpeaking(true);
//     utterance.onend = () => setIsSpeaking(false);

//     // Speak the text
//     window.speechSynthesis.speak(utterance);
//   };

//   const stop = () => {
//     window.speechSynthesis.cancel();
//     setIsSpeaking(false);
//   };

//   return (
//     <div>
//       <h2>Text to Speech</h2>
//       <textarea
//         rows="4"
//         cols="50"
//         placeholder="Type something..."
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//       ></textarea>
//       <br />
//       <button onClick={isSpeaking ? stop : speak}>
//         {isSpeaking ? "Stop Speaking" : "Speak"}
//       </button>
//     </div>
//   );
// };

// export default TextToSpeech;


import React, { useState, useEffect } from "react";

const TextToSpeech = () => {
    const [text, setText] = useState("");
    const [voices, setVoices] = useState([]);
    const [pitch, setPitch] = useState("1");
    const [ rate, setRate] = useState("1");
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [selectedVoice, setSelectedVoice] = useState(null);
    
    // Load voices
    useEffect(() => {
      const loadVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        setVoices(availableVoices);
        setSelectedVoice(availableVoices[0]); // Set a default voice
      };
    
      window.speechSynthesis.onvoiceschanged = loadVoices;
      loadVoices();
    }, []);
    
    const speak = () => {
      if (!text.trim()) {
        alert("Please enter some text to speak.");
        return;
      }
  
      const utterance = new SpeechSynthesisUtterance(text);
      if (selectedVoice) utterance.voice = selectedVoice;
      utterance.pitch = pitch;
      utterance.rate = rate;
    //   utterance.onstart = () => setIsSpeaking(true);
    //   utterance.onend = () => setIsSpeaking(false);
      
      window.speechSynthesis.speak(utterance);
    };    

    const stop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    };
    
  return (
    <div>
      {/* <h2>Text to Speech</h2> */}
      <textarea
        rows="4"
        cols="50"
        placeholder="Type something..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <br />
      <button onClick={isSpeaking ? stop : speak}>
        {isSpeaking ? "Stop Speaking" : "Speak"}
      </button>
      <select onChange={(e) => setSelectedVoice(voices[e.target.value])}>
  {voices.map((voice, index) => (
    <option key={index} value={index}>
      {voice.name} ({voice.lang})
    </option>
  ))}
</select>
<label>
  Pitch:
  <input
    type="range"
    min="0"
    max="2"
    step="0.1"
    value={pitch}
    onChange={(e) => setPitch(e.target.value)}
  />
</label>
<label>
  Rate:
  <input
    type="range"
    min="0.1"
    max="2"
    step="0.1"
    value={rate}
    onChange={(e) => setRate(e.target.value)}
  />
</label>
    </div>
  );
};

export default TextToSpeech;
