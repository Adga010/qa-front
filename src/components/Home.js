import React from "react";
import withAuth from "../utils/withAuth";
import { useNavigate } from "react-router-dom";

const ProtectedHome = withAuth(Home);

function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Borrar el token de autenticación del localStorage
    localStorage.removeItem("authToken");
    // Redirigir al usuario a la página de inicio de sesión
    navigate("/");
  };
  return (
    <div>
      {/* Barra de navegación */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button className="navbar-brand btn btn-link">Mi Portal</button>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <button className="nav-link btn btn-link">
                Inicio <span className="sr-only">(current)</span>
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link">Acerca de</button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link">Contacto</button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Jumbotron */}
      <div className="jumbotron">
        <h1 className="display-4">¡Bienvenido a Mi Portal!</h1>
        <p className="lead">
          Este es un portal simple creado con React y Bootstrap.
        </p>
        <hr className="my-4" />
        <p>
          Puedes explorar las diferentes secciones para aprender más sobre lo
          que ofrecemos.
        </p>
        <button className="btn btn-primary btn-lg" onClick={handleLogout}>
          Cerrar Sesión
        </button>
        <div></div>
      </div>
    </div>
  );
}

export default ProtectedHome;
