import React, { useState } from "react";
import axios from "axios"; // Asegúrate de que axios está importado
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getToken } from "../../utils/authUtils";
import withAuth from "../../utils/withAuth";
import Swal from "sweetalert2";

const ProtectedDownload = withAuth(Download);

function Download() {
  const [dateRange, setDateRange] = useState([null, null]);

  const [startDate, endDate] = dateRange;
  const [projectName, setProjectName] = useState(""); // Estado para el nombre del proyecto
  const [fileType, setFileType] = useState(""); // Estado para el tipo de archivo
  const token = getToken(); // Obtener el token de autenticación

  // Función para manejar la descarga aquí
  const handleDownload = () => {
    // Validar que la fecha inicial y final están seleccionadas
    if (!startDate || !endDate) {
      Swal.fire("Error", "Por favor, selecciona un rango de fechas.", "error");
      return;
    }

    // Formatear las fechas para la solicitud
    const formattedStartDate = startDate.toISOString().split("T")[0];
    const formattedEndDate = endDate.toISOString().split("T")[0];

    // Validar que se haya seleccionado un tipo de archivo
    if (!fileType) {
      Swal.fire("Error", "Por favor, selecciona un tipo de archivo.", "error");
      return;
    }

    // Construir la URL con los parámetros de consulta
    const queryParams = new URLSearchParams({
      fecha_inicial: formattedStartDate,
      fecha_final: formattedEndDate,
      project_name: projectName, // Asumiendo que quieres enviar un string vacío si no se proporciona un nombre
      tipo_archivo: fileType,
    });

    // Lanzar la solicitud a la API
    const apiUrl = `http://127.0.0.1:8000/api/download-bug/download-bug-reports/?${queryParams}`;
    axios({
      url: apiUrl,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Usar el token para la autenticación
      },
      responseType: "blob", // Importante para manejar la respuesta como un archivo
    })
      .then((response) => {
        // Crear un URL con el archivo recibido y forzar la descarga
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          projectName
            ? `${projectName}.${fileType === "excel" ? "xlsx" : "csv"}`
            : `report.${fileType === "excel" ? "xlsx" : "csv"}`
        );
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        if (error.response) {
          const statusCode = error.response.status;
          const errorMessage =
            error.response.data.detail || "Ocurrió un error desconocido.";

          if (statusCode === 400) {
            Swal.fire("Error en la Solicitud", errorMessage, "error");
          } else if (statusCode === 404) {
            Swal.fire(
              "Información no Disponible.",
              "Verifique que las fechas tengan registros y que el nombre del proyecto sea válido. De lo contrario, la descarga no estará disponible.",
              "info"
            );
          } else {
            Swal.fire("Error", errorMessage, "error");
          }
        } else {
          Swal.fire(
            "Error",
            "Hubo un problema al conectar con el servidor. Por favor, verifica tu conexión y vuelve a intentarlo.",
            "error"
          );
        }
        console.error("Download error:", error);
      });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card shadow-lg border-0 rounded-lg mt-5">
            <div className="card-header">
              <h3 className="text-center font-weight-light my-3">
                Descarga de Novedades.
              </h3>
            </div>
            <div className="card-body">
              {/* Contenedor para el input y el DatePicker */}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {/* Asegúrate de que los estilos se apliquen correctamente para alinear los elementos */}
                <input
                  type="text"
                  className="form-control"
                  style={{ width: "48%" }} // Ocupa menos de la mitad del espacio para dejar espacio al DatePicker
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="Nombre del Proyecto"
                />
                <DatePicker
                  selectsRange={true}
                  startDate={startDate}
                  endDate={endDate}
                  onChange={(update) => setDateRange(update)}
                  isClearable={true}
                  style={{ width: "48%" }} // Ocupa menos de la mitad del espacio
                />
              </div>
              {/* Lista desplegable para el tipo de archivo */}
              <select
                className="form-control mt-3"
                value={fileType}
                onChange={(e) => setFileType(e.target.value)}
              >
                {/* Opción que se visualiza primero y por defecto */}
                <option value="" disabled>
                  Seleccione un tipo de archivo
                </option>
                <option value="excel">Excel</option>
                <option value="csv">CSV</option>
              </select>
              <div className="card-body">
                <div
                  className="card-body alert alert-primary d-flex align-items-center"
                  role="alert"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2"
                    viewBox="0 0 16 16"
                    role="img"
                    aria-label="Warning:"
                  >
                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                  </svg>
                  <div>
                    Al descargar reportes, el campo 'Nombre del Proyecto' es
                    opcional y debe coincidir con un proyecto existente.
                    Asegúrese de que el intervalo de fechas no exceda un periodo
                    de 3 meses.
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleDownload}
              >
                Descargar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProtectedDownload;
