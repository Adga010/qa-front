// FilterForm.js
import React, { useState } from "react";

function FilterForm({ onFilterSubmit }) {
  const [formData, setFormData] = useState({
    fechaInicial: "",
    fechaFinal: "",
    projectName: "",
    causal: "",
    severidad: "",
    area: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row g-3">
        {/* Fecha Inicial */}
        <div className="col-md-6">
          <input
            className="form-control"
            type="date"
            id="fechaInicial"
            name="fechaInicial"
            value={formData.fechaInicial}
            onChange={handleChange}
            required
          />
          <label htmlFor="fechaInicial">Fecha Inicial</label>
        </div>

        {/* Fecha Final */}
        <div className="col-md-6">
          <input
            className="form-control"
            type="date"
            name="fechaFinal"
            value={formData.fechaFinal}
            onChange={handleChange}
            required
          />
          <label htmlFor="fechaFinal" className="form-label">
            Fecha Final
          </label>
        </div>

        {/* Proyecto */}
        <div className="col-md-6">
          <input
            className="form-control"
            type="text"
            name="projectName"
            placeholder="Nombre del Proyecto"
            value={formData.projectName}
            onChange={handleChange}
          />
          <label htmlFor="projectName" className="form-label"></label>
        </div>

        {/* Causal */}
        <div className="col-md-6">
          <select
            className="form-select"
            name="causal"
            value={formData.causal}
            onChange={handleChange}
          >
            <option value="">Seleccione una Causal</option>
            <option value="desarrollo">Desarrollo</option>
            <option value="analisis">Análisis</option>
            <option value="documentacion">Documentación</option>
            <option value="testing">Testing</option>
            <option value="diseño">Diseño</option>
          </select>
          <label htmlFor="causal" className="form-label"></label>
        </div>

        {/* Severidad */}
        <div className="col-md-6">
          <select
            className="form-select"
            name="severidad"
            value={formData.severidad}
            onChange={handleChange}
          >
            {/* Opciones */}
            <option value="">Seleccione una Severidad</option>
            <option value="funcional">Funcional</option>
            <option value="presentacion">Presentación</option>
            <option value="bloqueante">Bloqueante</option>
          </select>
          <label htmlFor="severidad" className="form-label"></label>
        </div>

        {/* Área */}
        <div className="col-md-6">
          <select
            className="form-select"
            name="area"
            value={formData.area}
            onChange={handleChange}
          >
            {/* Opciones */}
            <option value="">Seleccione un Área</option>
            <option value="gestion del riesgo">Gestión del Riesgo</option>
            <option value="transversal">Transversal</option>
            <option value="mercadeo">Mercadeo</option>
            <option value="axces">Axces</option>
          </select>
          <label htmlFor="area" className="form-label"></label>
        </div>
      </div>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4 mb-4">
        <button className="btn btn-primary btn-block" type="submit">
          Consultar
        </button>
      </div>
    </form>
  );
}

export default FilterForm;
