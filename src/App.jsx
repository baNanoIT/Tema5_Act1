import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MediaRecorderComponent from '../src/components/mediaRecorder/MediaRecorder'
import SocialLoginComponent from './components/socialLogin/SocialLogin';
import GeolocationComponent from './components/geolocation/Geolocation'
import CameraCapture from './components/camara/Camara'

function App() {
  return (
    <div className="App">
      
       <h2>Cámara</h2>
      <CameraCapture />
{/*       
      <h2>Geolocalización</h2>
      <GeolocationComponent /> */}
      
      {/* <h2>Grabación Multimedia</h2>
      <MediaRecorderComponent />   */}
      
      {/* <h2>Inicio de Sesión</h2>
      <SocialLoginComponent /> */}

    </div>
  );
}

export default App;

