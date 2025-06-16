import React from 'react';
import { useNavigate } from 'react-router-dom';

const Success = () => {
  const navigate = useNavigate();

  const handleBackToLogin = () => {
    navigate('/');
  };

  return (
    <section
      className="hero is-fullheight"
      style={{ background: 'linear-gradient(to right, #00c6ff, #0072ff)' }}
    >
      <div className="hero-body">
        <div className="container has-text-centered">
          <div className="box" style={{ maxWidth: '400px', margin: '0 auto' }}>
            <h1 className="title has-text-success">¡Registro Exitoso!</h1>
            <p className="subtitle">Tu contraseña fue guardada correctamente.</p>
            <button
              className="button is-link is-fullwidth mt-4"
              onClick={handleBackToLogin}
            >
              Volver al inicio
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Success;
