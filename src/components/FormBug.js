import React, { useState } from "react";
import { getToken } from "../utils/authUtils";
import withAuth from "../utils/withAuth";
import axios from "axios";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
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
      console.error(err.response.data);
      Swal.fire({
        title: "Error",
        text: "Hubo un error al registrar el bug",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    }
  };

  return (
    <div>
      <Navbar></Navbar>
      <div id="layoutSidenav">
        <Sidebar></Sidebar>
        <div id="layoutSidenav_content">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-6">
                <div class="card shadow-lg border-0 rounded-lg mt-5">
                  <div class="card-header">
                    <h3 class="text-center font-weight-light my-3">
                      Resporte de Novedades.
                    </h3>
                    <div class="card-body">
                      <form onSubmit={onSubmit}>
                        <div class="form-floating mb-3">
                          <input
                            class="form-control"
                            id="inputDate"
                            type="date"
                            name="fecha"
                            value={formData.fecha}
                            onChange={onChange}
                            required
                          />
                          <label for="inputDate">Fecha</label>
                        </div>
                        <div class="form-floating mb-3">
                          <select
                            class="form-select"
                            id="inputStatus"
                            name="status"
                            value={formData.status}
                            onChange={onChange}
                            required
                          >
                            <option value="">Seleccione un estado</option>
                            <option value="pendiente">Pendiente</option>
                            <option value="finalizado">Finalizado</option>
                          </select>
                          <label for="inputStatus">Estado</label>
                        </div>
                        <div class="form-floating mb-3">
                          <input
                            class="form-control"
                            id="inputProjectName"
                            type="text"
                            placeholder="Nombre del Proyecto"
                            name="projectName"
                            value={formData.projectName}
                            onChange={onChange}
                            required
                          />
                          <label for="inputProjectName">Nombre Proyecto</label>
                        </div>
                        <div class="form-floating mb-3">
                          <input
                            class="form-control"
                            id="inputEncargado"
                            type="text"
                            placeholder="Encargado"
                            name="encargado"
                            value={formData.encargado}
                            onChange={onChange}
                            required
                          />
                          <label for="inputEncargado">Encargado</label>
                        </div>
                        <div class="form-floating mb-3">
                          <textarea
                            class="form-control"
                            id="inputBugDescription"
                            placeholder="Descripción detallada del error encontrado."
                            // style="height: 100px"
                            name="bug"
                            value={formData.bug}
                            onChange={onChange}
                            required
                          ></textarea>
                          <label for="inputBugDescription">
                            Bug Description
                          </label>
                        </div>
                        <div class="form-floating mb-3">
                          <select
                            class="form-select"
                            id="inputArea"
                            name="area"
                            value={formData.area}
                            onChange={onChange}
                            required
                          >
                            <option value="">Seleccione un área</option>
                            <option value="axces">Axces</option>
                            <option value="gestion del riesgo">
                              Gestión del Riesgo
                            </option>
                            <option value="mercadeo">Mercadeo</option>
                            <option value="transversal">Transversal</option>
                          </select>
                          <label for="inputArea">Area</label>
                        </div>
                        <div class="form-floating mb-3">
                          <select
                            class="form-select"
                            id="inputCausal"
                            name="causal"
                            value={formData.causal}
                            onChange={onChange}
                            required
                          >
                            <option value="">Seleccione un Causal</option>
                            <option value="desarrollo">Desarrollo</option>
                            <option value="analisis">Análisis</option>
                            <option value="documentacion">Documentación</option>
                            <option value="testing">Testing</option>
                            <option value="diseño">Diseño</option>
                          </select>
                          <label for="inputCausal">Causal</label>
                        </div>
                        <div class="form-floating mb-3">
                          <select
                            class="form-select"
                            id="inputSeverity"
                            name="severidad"
                            value={formData.severidad}
                            onChange={onChange}
                            required
                          >
                            <option value="">Seleccione una severidad</option>
                            <option value="funcional">Funcional</option>
                            <option value="presentacion">Presentación</option>
                            <option value="bloqueante">Bloqueante</option>
                          </select>
                          <label for="inputSeverity">Severidad</label>
                        </div>
                        <div class="form-floating mb-3">
                          <input
                            class="form-control"
                            id="inputLink"
                            type="url"
                            placeholder="http://enlace-a-repositorio-o-herramienta.com"
                            name="enlace"
                            value={formData.enlace}
                            onChange={onChange}
                            required
                          />
                          <label for="inputLink">
                            Enlace del Reporte/TeamWork
                          </label>
                        </div>
                        <div class="mt-4 mb-0">
                          <div class="d-grid">
                            <button
                              class="btn btn-primary btn-block"
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
          <footer class="py-4 bg-light mt-auto">
            <div class="container-fluid px-4">
              <div class="d-flex align-items-center justify-content-between small">
                <div class="text-muted">Copyright &copy; Your Website 2023</div>
                <div>
                  <a href="/privacy-policy">Privacy Policy</a>
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

export default ProtectedFormBug;
