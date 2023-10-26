// src/components/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Para manejar el estado de carga

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Verificación básica en el cliente (solo para propósitos de demostración)
    if (username !== "eve.holt@reqres.in" || password !== "cityslicka") {
      setIsLoading(false);
      Swal.fire("Error", "Credenciales incorrectas.", "error");
      return;
    }

    fetch("https://reqres.in/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        if (data.token) {
          localStorage.setItem("authToken", data.token);
          navigate("/home");
        } else {
          Swal.fire("Error", "Error en el inicio de sesión.", "error");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error:", error);
        Swal.fire("Error", "Error durante el inicio de sesión.", "error");
      });
  };

  return (
    <div className="container mt-5">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Usuario (email)</label>
          <input
            type="email" // Cambiamos a tipo 'email' para validación básica
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? "Iniciando..." : "Iniciar sesión"}
        </button>
      </form>
    </div>
  );
}

export default Login;
