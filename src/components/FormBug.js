import React, { useState } from "react";
import { getToken } from "../utils/authUtils";
import withAuth from "../utils/withAuth";
import axios from "axios";
import Swal from "sweetalert2";

const ProtectedFormBug = withAuth(FormBug);

function FormBug() {
  // Estado inicial para los valores del formulario
  const token = getToken(); // Obtener el token de autenticación
  const [formData, setFormData] = useState({
    fecha: "",
    status: "",
    projectName: "",
    bug: "",
    area: "",
    causal: "",
    severidad: "",
    enlace: "",
    encargado: "",
    reportado: "",
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Mapear los nombres de los campos al formato que el servidor espera
    const dataToSubmit = {
      FECHA: formData.fecha,
      STATUS: formData.status,
      PROJECT_NAME: formData.projectName,
      BUG: formData.bug,
      AREA: formData.area,
      CAUSAL: formData.causal,
      SEVERIDAD: formData.severidad,
      ENLACE: formData.enlace,
      ENCARGADO: formData.encargado,
      REPORTADO: formData.reportado,
    };

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      // Convertir el objeto dataToSubmit a JSON
      const body = JSON.stringify(dataToSubmit);
      const res = await axios.post(
        "http://127.0.0.1:8000/api/report-bug/register/",
        body,
        config
      );

      // Muestra un SweetAlert al usuario y restablece los campos
      Swal.fire({
        title: "¡Éxito!",
        text: "Bug registrado con éxito",
        icon: "success",
        confirmButtonText: "Ok",
      });

      // Restablecer el estado de formData
      setFormData({
        fecha: "",
        status: "",
        projectName: "",
        bug: "",
        area: "",
        causal: "",
        severidad: "",
        enlace: "",
        encargado: "",
        reportado: "",
      });

      console.log("Data Submitted", res.data);
    } catch (err) {
      console.error(err.response.data); // Esto imprimirá el error completo en la consola para el registro.

      // Puedes seguir imprimiendo el mensaje original de error en la consola si lo deseas:
      const originalErrorMessage =
        err.response && err.response.data && err.response.data.PROJECT_NAME
          ? err.response.data.PROJECT_NAME[0] // Asume que el mensaje es el primer elemento del array
          : "Hubo un error al registrar el bug";
      console.error("Error original: ", originalErrorMessage);

      // Mensaje personalizado para la alerta
      const customErrorMessage = "El Nombre del Proyecto ingresado NO existe.";

      Swal.fire({
        title: "Error",
        text: customErrorMessage, // Usa el mensaje personalizado
        icon: "error",
        confirmButtonText: "Cerrar",
      });
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
                  Resporte de Novedades.
                </h3>
                <div className="card-body">
                  <form onSubmit={onSubmit}>
                    <div className="form-floating mb-3">
                      <input
                        className="form-control"
                        id="inputDate"
                        type="date"
                        name="fecha"
                        value={formData.fecha}
                        onChange={onChange}
                        required
                      />
                      <label htmlFor="inputDate">Fecha</label>
                    </div>
                    <div className="form-floating mb-3">
                      <select
                        className="form-select"
                        id="inputStatus"
                        name="status"
                        value={formData.status}
                        onChange={onChange}
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
                        name="projectName"
                        value={formData.projectName}
                        onChange={onChange}
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
                        name="encargado"
                        value={formData.encargado}
                        onChange={onChange}
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
                        name="bug"
                        value={formData.bug}
                        onChange={onChange}
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
                        name="area"
                        value={formData.area}
                        onChange={onChange}
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
                        name="causal"
                        value={formData.causal}
                        onChange={onChange}
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
                        name="severidad"
                        value={formData.severidad}
                        onChange={onChange}
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
                        name="enlace"
                        value={formData.enlace}
                        onChange={onChange}
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
                          Report Bug
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

export default ProtectedFormBug;
