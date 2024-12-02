// import React, { useState, useRef } from "react";

// const VideoRecorder = () => {
//   const [isRecording, setIsRecording] = useState(false);
//   const [audioBlob, setAudioBlob] = useState(null);
//   const mediaRecorderRef = useRef(null);
//   const audioChunks = useRef([]);

//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video:true,audio: true });
//       mediaRecorderRef.current = new MediaRecorder(stream);

//       mediaRecorderRef.current.ondataavailable = (event) => {
//         console.log(event);
//         if (event.data.size > 0) {
//           audioChunks.current.push(event.data);
//         }
//       };

//       mediaRecorderRef.current.onstop = () => {
//         const audioBlob = new Blob(audioChunks.current, { type: "video/mp3" });
//         setAudioBlob(audioBlob);
//         mediaRecorderRef.current.stop();
//         audioChunks.current = [];
//       };

//       mediaRecorderRef.current.start();
//       setIsRecording(true);
//     } catch (err) {
//       console.error("Error accessing microphone:", err);
//     }
//   };

//   const stopRecording = () => {
//     mediaRecorderRef.current.stop();
//     setIsRecording(false);
//   };

//   return (
//     <div>
//       {/* <h2>Audio Recorder</h2> */}
//       <button onClick={isRecording ? stopRecording : startRecording}>
//         {isRecording ? "Stop Recording" : "Start Recording"}
//       </button>
//       {audioBlob && (
//         <div>
//           <h3>Recorded Audio</h3>
//           <video controls src={URL.createObjectURL(audioBlob)}></video>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VideoRecorder;

import React, { useRef, useEffect, useState } from "react";

const VideoRecorder = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);

  useEffect(() => {
    // Cleanup stream when component unmounts
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  const startVideo = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio:true,
      });
      setStream(mediaStream);
      console.log(videoRef.current);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const stopVideo = () => {
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      setStream(null);
    }
  };

  const captureImage = () => {
    console.log(videoRef.current);
    console.log(canvasRef.current);
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the current video frame to the canvas
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Save the image as a data URL
    const imageDataUrl = canvas.toDataURL("image/png");
    setCapturedImage(imageDataUrl);
  };

  return (
    <div>
      {/* <h2>Video Recorder</h2> */}
      <div>
        {stream ? (
          <>
            <video ref={videoRef} src={stream} autoPlay muted style={{ width: "100%" }}></video>
            <button onClick={stopVideo}>Stop Video</button>
            <button onClick={captureImage}>Capture Image</button>
          </>
        ) : (
          <button onClick={startVideo}>Start Video</button>
        )}
      </div>
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
      {capturedImage && (
        <div>
          <h3>Captured Image</h3>
          <img src={capturedImage} alt="Captured" style={{ maxWidth: "100%" }} />
        </div>
      )}
    </div>
  );
};

export default VideoRecorder;
