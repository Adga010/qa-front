import React, { useState } from "react";
import axios from "axios";
import { getToken } from "../../utils/authUtils";
import withAuth from "../../utils/withAuth";
import Swal from "sweetalert2";

const ProtectedUploadFile = withAuth(UploadFile);

function UploadFile() {
  const token = getToken(); // Obtener el token de autenticación
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0); // Nuevo estado para el progreso de carga
  const [key, setKey] = useState(Date.now());

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setUploadProgress(0); // Resetea el progreso cuando se selecciona un nuevo archivo
  };

  const handleUpload = async () => {
    if (!file) {
      //   alert("Por favor, selecciona un archivo para subir.");
      Swal.fire({
        title: "Error!",
        text: "Por favor, selecciona un archivo para subir.",
        icon: "error",
        confirmButtonText: "Ok",
      });

      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/upload-bug/upload-bug-reports",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted); // Actualiza el estado de progreso
          },
        }
      );

      console.log("Archivo subido con éxito:", response.data);

      // Mostrar alerta de éxito
      Swal.fire({
        title: "¡Éxito!",
        text: "El archivo se ha cargado correctamente.",
        icon: "success",
        confirmButtonText: "Ok",
      });
      setFile(null);
      setUploadProgress(0);
      setKey(Date.now()); // Esto hará que el input se "resetee"
    } catch (error) {
      let errorMessage = "Ocurrió un error desconocido.";

      // Verificar si el error tiene una respuesta y un detalle
      if (error.response && error.response.data && error.response.data.detail) {
        errorMessage = error.response.data.detail;
      }

      Swal.fire({
        title: "Fallo!",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "Ok",
      });
      setFile(null);
      setUploadProgress(0);
      setKey(Date.now()); // Esto hará que el input se "resetee"
      console.error("Hubo un error al subir el archivo:", error);
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
                  Cargue de Novedades.
                </h3>
                <div className="card-body">
                  <div className="input-group mb-3">
                    <input
                      type="file"
                      key={key}
                      className="form-control"
                      id="inputGroupFile02"
                      onChange={handleFileChange}
                    />
                    <button
                      className="input-group-text"
                      htmlFor="inputGroupFile02"
                      onClick={handleUpload}
                    >
                      Subir
                    </button>
                  </div>
                  {uploadProgress > 0 && uploadProgress <= 100 && (
                    <div className="progress">
                      <div
                        className="progress-bar progress-bar-striped progress-bar-animated"
                        role="progressbar"
                        aria-valuenow={uploadProgress}
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{ width: `${uploadProgress}%` }}
                      >
                        {uploadProgress}%
                      </div>
                    </div>
                  )}
                </div>
                <div
                  className="alert alert-primary d-flex align-items-center"
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
                    Asegúrese de que el archivo .xlsx para cargar no contenga
                    celdas vacías. Los campos de estado, área, causal y
                    severidad deben coincidir con los valores predefinidos y no
                    se admiten datos no conformes.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProtectedUploadFile;
