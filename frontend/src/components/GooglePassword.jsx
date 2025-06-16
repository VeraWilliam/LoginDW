import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';

const GooglePassword = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:4000/auth/set-password',
        { email, password },
        { withCredentials: true }
      );
      alert('Contraseña guardada');
      navigate('/success');
    } catch (error) {
      console.error(error);
      alert('Error al guardar la contraseña');
    }
  };

  return (
    <section
      className="hero is-fullheight"
      style={{ background: 'linear-gradient(to right, #8360c3, #2ebf91)' }}
    >
      <div className="hero-body">
        <div className="container">
          <div className="box" style={{ maxWidth: '400px', margin: '0 auto' }}>
            <h2 className="title has-text-centered">Completa tu Registro</h2>
            <form onSubmit={handleSubmit}>
              <div className="field">
                <label className="label">Correo</label>
                <input className="input" type="email" value={email} disabled />
              </div>
              <div className="field">
                <label className="label">Contraseña</label>
                <input
                  className="input"
                  type="password"
                  placeholder="Crea tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>
              <button className="button is-success is-fullwidth mt-4" type="submit">
                Guardar Contraseña
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GooglePassword;
