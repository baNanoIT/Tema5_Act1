import React, { useState } from 'react';

const GeolocationComponent = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => console.error('Error obteniendo ubicación:', error)
      );
    } else {
      console.error('Geolocalización no es soportada por este navegador.');
    }
  };

  return (
    <div>
      <h1>Ubicación Actual</h1>
      <button onClick={getLocation}>Obtener Ubicación</button>
      {location.latitude && (
        <div>
          <p>Latitud: {location.latitude}</p>
          <p>Longitud: {location.longitude}</p>
        </div>
      )}
    </div>
  );
};

export default GeolocationComponent;
