  import React from 'react';
  import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

  const SocialLoginComponent = () => {
    const handleSuccess = (credentialResponse) => {
      console.log('Autenticación exitosa:', credentialResponse);
    };

    const handleError = () => {
      console.error('Error en la autenticación');
    };

    return (
      <GoogleOAuthProvider clientId="269742554510-mas63dam8nncbf0q8hc5t4nv8pemv8m2.apps.googleusercontent.com">
        <div>
          <h1>Iniciar Sesión con Google</h1>
          <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
        </div>
      </GoogleOAuthProvider>
    );
  };

  export default SocialLoginComponent;
