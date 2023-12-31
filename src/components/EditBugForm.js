import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getToken } from "../utils/authUtils";
import withAuth from "../utils/withAuth";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Swal from "sweetalert2";

const ProtectedEditBugForm = withAuth(EditBugForm);

function EditBugForm() {
  const token = getToken();
  const { id } = useParams(); // Obtiene el id desde la URL
  const [bugData, setBugData] = useState({
    FECHA: "",
    STATUS: "",
    PROJECT_NAME: "",
    BUG: "",
    AREA: "",
    CAUSAL: "",
    SEVERIDAD: "",
    ENLACE: "",
    ENCARGADO: "", // Asegúrate de agregar este campo si es necesario.
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBugData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/update-bug/${id}`,
          {
            method: "GET", // Especificar el método puede ser opcional ya que GET es el método por defecto.
            headers: {
              Authorization: `Bearer ${getToken()}`, // Asegúrate de que el token se incluya aquí
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        const data = await response.json();
        setBugData(data);
      } catch (error) {
        console.error("Error fetching bug data:", error);
      }
    };

    fetchBugData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBugData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/update-bug/${id}`,
        {
          method: "PUT", // o 'PATCH' si solo estás actualizando parcialmente
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Asegúrate de que el token se incluya aquí
          },
          body: JSON.stringify(bugData),
        }
      );
      if (response.ok) {
        Swal.fire({
          title: "¡Éxito!",
          text: "Bug Actualizado con éxito",
          icon: "success",
          confirmButtonText: "Ok",
        });
        navigate("/list-bug"); // Redirecciona a la lista de bugs
      } else {
        console.error("Failed to update bug");
      }
    } catch (error) {
      console.error("Error updating bug:", error);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="card shadow-lg border-0 rounded-lg mt-5">
              <div className="card-header">
                <h3 className="text-center font-weight-light my-3">
                  Actualización de Novedades.
                </h3>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="form-floating mb-3">
                      <input
                        className="form-control"
                        type="date"
                        name="FECHA"
                        value={bugData.FECHA}
                        onChange={handleChange}
                        required
                        readOnly
                        style={{ opacity: 0.5 }}
                      />
                      <label htmlFor="inputDate">Fecha</label>
                    </div>
                    <div className="form-floating mb-3">
                      <select
                        className="form-select"
                        id="inputStatus"
                        name="STATUS"
                        value={bugData.STATUS}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Seleccione un estado</option>
                        <option value="Pendiente">Pendiente</option>
                        <option value="Finalizado">Finalizado</option>
                      </select>
                      <label htmlFor="inputStatus">Estado</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        className="form-control"
                        id="inputProjectName"
                        type="text"
                        placeholder="Nombre del Proyecto"
                        name="PROJECT_NAME"
                        value={bugData.PROJECT_NAME}
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor="inputProjectName">Nombre Proyecto</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        className="form-control"
                        id="inputEncargado"
                        type="text"
                        placeholder="Encargado"
                        name="ENCARGADO"
                        value={bugData.ENCARGADO}
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor="inputEncargado">Encargado</label>
                    </div>
                    <div className="form-floating mb-3">
                      <textarea
                        className="form-control"
                        id="inputBugDescription"
                        placeholder="Descripción detallada del error encontrado."
                        // style="height: 100px"
                        name="BUG"
                        value={bugData.BUG}
                        onChange={handleChange}
                        required
                      ></textarea>
                      <label htmlFor="inputBugDescription">
                        Bug Description
                      </label>
                    </div>
                    <div className="form-floating mb-3">
                      <select
                        className="form-select"
                        id="inputArea"
                        name="AREA"
                        value={bugData.AREA}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Seleccione un área</option>
                        <option value="Axces">Axces</option>
                        <option value="Gestion del Riesgo">
                          Gestión del Riesgo
                        </option>
                        <option value="Mercadeo">Mercadeo</option>
                        <option value="Transversal">Transversal</option>
                      </select>
                      <label htmlFor="inputArea">Area</label>
                    </div>
                    <div className="form-floating mb-3">
                      <select
                        className="form-select"
                        id="inputCausal"
                        name="CAUSAL"
                        value={bugData.CAUSAL}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Seleccione un Causal</option>
                        <option value="Desarrollo">Desarrollo</option>
                        <option value="Analisis">Análisis</option>
                        <option value="Documentacion">Documentación</option>
                        <option value="Testing">Testing</option>
                        <option value="Diseño">Diseño</option>
                      </select>
                      <label htmlFor="inputCausal">Causal</label>
                    </div>
                    <div className="form-floating mb-3">
                      <select
                        className="form-select"
                        id="inputSeverity"
                        name="SEVERIDAD"
                        value={bugData.SEVERIDAD}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Seleccione una severidad</option>
                        <option value="Funcional">Funcional</option>
                        <option value="Presentacion">Presentación</option>
                        <option value="Bloqueante">Bloqueante</option>
                      </select>
                      <label htmlFor="inputSeverity">Severidad</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        className="form-control"
                        id="inputLink"
                        type="url"
                        placeholder="http://enlace-a-repositorio-o-herramienta.com"
                        name="ENLACE"
                        value={bugData.ENLACE}
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor="inputLink">
                        Enlace del Reporte/TeamWork
                      </label>
                    </div>
                    <div className="mt-4 mb-0">
                      <div className="d-grid">
                        <button
                          className="btn btn-primary btn-block"
                          type="submit"
                        >
                          Actualizar Bug
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProtectedEditBugForm;
