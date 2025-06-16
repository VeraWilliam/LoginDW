import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/auth/login",
        { email, password },
        { withCredentials: true }
      );
      alert(response.data.message || "Inicio de sesión exitoso");
      navigate("/success");
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        error.message ||
        "Error en inicio de sesión";
      alert(msg);
      console.error("Login error:", error);
    }
  };

  return (
    <section
      className="section"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f4f8",
      }}
    >
      <div className="box" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="title has-text-centered mb-5">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Correo</label>
            <div className="control">
              <input
                className="input"
                type="email"
                placeholder="Ingrese su correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Contraseña</label>
            <div className="control">
              <input
                className="input"
                type="password"
                placeholder="Ingrese su contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="field mt-5">
            <button className="button is-link is-fullwidth" type="submit">
              Iniciar Sesión
            </button>
          </div>
        </form>

        <div className="has-text-centered mt-4">
          <p>o</p>
        </div>

        <div className="field mt-4">
          <a
            href="http://localhost:4000/auth/google"
            className="button is-light is-fullwidth"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #ccc",
              fontWeight: "500",
            }}
          >
            
            Iniciar sesión con Google
          </a>
        </div>
      </div>
    </section>
  );
};

export default Login;
