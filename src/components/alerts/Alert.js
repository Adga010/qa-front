import React from "react";
import Swal from "sweetalert2";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Button } from "react-bootstrap";

// Agrega props para variant y className
const Alert = ({
  title,
  text,
  onConfirm,
  onCancel,
  variant,
  className,
  icon,
}) => {
  const showAlert = () => {
    Swal.fire({
      title,
      text,
      icon,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed && onConfirm) {
        onConfirm();
      } else if (result.dismiss === Swal.DismissReason.cancel && onCancel) {
        onCancel();
      }
    });
  };

  // Usa las props variant y className para aplicar clases al botón
  return (
    <div>
      {/* Utiliza backticks y ${} para insertar las variables de prop en la cadena de la clase */}
      <Button className={`${variant}`} onClick={showAlert}>
        <i className={`${className}`}></i>
      </Button>
    </div>
  );
};

export default Alert;
