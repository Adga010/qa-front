import React, { useState, useRef, useEffect } from "react";
import withAuth from "../utils/withAuth";
import { getToken } from "../utils/authUtils";
import "../styles.css";
import $ from "jquery"; // Asegúrate de que jQuery está instalado y DataTables está disponible
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net"; // Importar el plugin DataTables
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import '@fortawesome/fontawesome-free/css/all.min.css';



// Este componente está envuelto con la función withAuth para proteger la ruta
const ProtectedListBug = withAuth(ListBug);

function ListBug() {
  const [bugs, setBugs] = useState([]);
  const [error, setError] = useState(null);
  const token = getToken(); // Obtener el token de autenticación
  const dataTableInstance = useRef(null);

  // Función para manejar la actualización
  const handleUpdate = (id) => {
    // Aquí iría la lógica para manejar la actualización del registro con el id especificado
    console.log(`Actualizar el registro con id: ${id}`);
    // Por ejemplo, podrías abrir un modal de edición o cambiar el estado para editar
  };

  // Función para manejar la eliminación
  const handleDelete = (id) => {
    // Aquí iría la lógica para manejar la eliminación del registro con el id especificado
    console.log(`Eliminar el registro con id: ${id}`);
    // Por ejemplo, podrías mostrar un mensaje de confirmación antes de eliminar
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/report-bug/register/",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Uso del token de autenticación en el encabezado
            },
          }
        );

        if (!response.ok) {
          throw new Error("Hubo un problema al cargar los datos.");
        }

        const data = await response.json();
        setBugs(data);
      } catch (err) {
        setError(err.message);
      }
    };

    loadData();

    // Teardown function para limpiar la instancia de DataTables
    return () => {
      if (dataTableInstance.current) {
        dataTableInstance.current.destroy();
        dataTableInstance.current = null;
      }
    };
  }, [token]);

  useEffect(() => {
    if (bugs.length > 0 && !dataTableInstance.current) {
      // Se asegura de que el elemento con ID 'datatablesSimple' esté presente
      const tableElement = $("#datatablesSimple");
      if (tableElement.length) {
        dataTableInstance.current = tableElement.DataTable({
          // ...Opciones de DataTables...
        });
      }
    }

    // Función de limpieza en el retorno de useEffect.
    return () => {
      if (dataTableInstance.current) {
        dataTableInstance.current.destroy();
        dataTableInstance.current = null;
      }
    };
  }, [bugs]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Navbar />
      <div id="layoutSidenav">
        <Sidebar />
        <div id="layoutSidenav_content">
          <main>
            <div className="container-fluid px-4">
              <h1 className="mt-4">Tables</h1>
              <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item">
                  <a href="index.html">Dashboard</a>
                </li>
                <li className="breadcrumb-item active">Tables</li>
              </ol>
              <div className="card mb-4">
                <div className="card-body">
                  DataTables is a third party plugin that is used to generate
                  the demo table below. For more information about DataTables,
                  please visit the
                  <a target="_blank" href="https://datatables.net/">
                    official DataTables documentation
                  </a>
                  .
                </div>
              </div>
              <div className="card mb-4">
                <div className="card-header">
                  <i className="fas fa-table me-1"></i>
                  DataTable Example
                </div>
                <div className="card-body">
                  <table id="datatablesSimple" className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Fecha</th>
                        <th>Status</th>
                        <th>Área</th>
                        <th>Nombre del Proyecto</th>
                        <th>Descripción del Error</th>
                        <th>Causal</th>
                        <th>Severidad</th>
                        <th>Enlace</th>
                        {/* <th>Encargado</th> */}
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bugs.map((bug) => (
                        <tr key={bug.id}>
                          <td>{bug.FECHA}</td>
                          <td>{bug.STATUS}</td>
                          <td>{bug.AREA}</td>
                          <td>{bug.PROJECT_NAME}</td>
                          <td>{bug.BUG}</td>
                          <td>{bug.CAUSAL}</td>
                          <td>{bug.SEVERIDAD}</td>
                          <td>
                            <a
                              href={bug.ENLACE}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Enlace
                            </a>
                          </td>
                          {/* <td>{bug.ENCARGADO}</td> */}
                          <td>
                            <button onClick={() => handleUpdate(bug.id)}>
                              <i className="fas fa-edit"></i>{" "}
                              {/* Icono de actualizar */}
                            </button>
                            <button onClick={() => handleDelete(bug.id)}>
                              <i className="fas fa-trash"></i>{" "}
                              {/* Icono de eliminar */}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </main>
          <footer className="py-4 bg-light mt-auto">
            <div className="container-fluid px-4">
              <div className="d-flex align-items-center justify-content-between small">
                <div className="text-muted">
                  Copyright &copy; Your Website 2023
                </div>
                <div>
                  <a href="/privacy-policy">Privacy Policy</a>
                  &middot;
                  <a href="/terms-and-conditions">Terms & Conditions</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default ProtectedListBug;
