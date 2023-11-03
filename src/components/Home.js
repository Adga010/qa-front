import React from "react";
import withAuth from "../utils/withAuth";
import { useNavigate } from "react-router-dom";
import Sidebar from './Sidebar';
import '../styles.css';

const ProtectedHome = withAuth(Home);

function Home() {
  // const navigate = useNavigate();

  // const handleLogout = () => {
  //   localStorage.removeItem("authToken");
  //   navigate("/");
  // };

  return (
    <div className="container-principal">
        <Sidebar />

        {/* Rest of your content */}
        <div className="contenido-principal">
            <div className="jumbotron">
                <h1 className="display-4">¡Bienvenido a Mi Portal!</h1>
                <p className="lead">
                    Este es un portal simple creado con React y Bootstrap.
                </p>
                <hr className="my-4" />
                <p>
                    Puedes explorar las diferentes secciones para aprender más sobre lo que ofrecemos.
                </p>
            </div>
        </div>
    </div>
  );
}

export default ProtectedHome;
