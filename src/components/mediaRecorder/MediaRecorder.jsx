import React, { useState, useRef } from 'react';

const MediaRecorderComponent = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [videoURL, setVideoURL] = useState('');
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunks = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      videoRef.current.srcObject = stream;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        chunks.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks.current, { type: 'video/mp4' });
        chunks.current = [];
        const url = URL.createObjectURL(blob);
        setVideoURL(url);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    const tracks = videoRef.current.srcObject.getTracks();
    tracks.forEach((track) => track.stop());
    setIsRecording(false);
  };

  return (
    <div>
      <h2>Grabación de Cámara</h2>
      <video ref={videoRef} autoPlay muted style={{ width: '100%', maxWidth: '600px' }} />
      <div>
        {!isRecording ? (
          <button onClick={startRecording}>Iniciar Grabación</button>
        ) : (
          <button onClick={stopRecording}>Detener Grabación</button>
        )}
      </div>
      {videoURL && (
        <div>
          <h3>Video Grabado:</h3>
          <video src={videoURL} controls style={{ width: '100%', maxWidth: '600px' }} />
        </div>
      )}
    </div>
  );
};

export default MediaRecorderComponent;