import React, { useRef, useState, useEffect } from "react";

const CameraCapture = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    // Solicitar acceso a la cámara
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error al acceder a la cámara:", error);
      }
    };

    startCamera();
    return () => {
      // Detener la cámara cuando se desmonte el componente
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  const capturePhoto = () => {
    if (canvasRef.current && videoRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      // Obtener la foto como una URL de datos
      const photoData = canvas.toDataURL("image/png");
      setPhoto(photoData);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Captura de Foto</h1>
      <video ref={videoRef} autoPlay playsInline style={{ width: "100%", maxWidth: "600px", border: "1px solid #ccc" }} />
      <button onClick={capturePhoto} style={{ margin: "10px", padding: "10px 20px", fontSize: "16px" }}>
        Capturar Foto
      </button>
      <canvas ref={canvasRef} style={{ display: "none" }} />
      {photo && (
        <div>
          <h2>Foto Capturada</h2>
          <img src={photo} alt="Foto capturada" style={{ width: "100%", maxWidth: "600px", border: "1px solid #ccc" }} />
        </div>
      )}
    </div>
  );
};

export default CameraCapture;
