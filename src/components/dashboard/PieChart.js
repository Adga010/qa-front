// PieChart.js
import React from "react";
import { Pie } from "react-chartjs-2";

function PieChart({ data, title }) {
  const options = {
    maintainAspectRatio: false, // Esto permite que el gráfico llene el contenedor
    responsive: true, // Esto hace que el gráfico sea responsivo
    plugins: {
      legend: {
        display: true, // Si deseas mostrar la leyenda
      },
      title: {
        display: true, // Si deseas mostrar un título dentro del canvas del gráfico
        text: title,
      },
    },
  };
  return (
    <div>
      <div className="card mb-3">
        <div className="card-header">{title}</div>
        <div className="card-body">
          <Pie
            data={data}
            options={({ maintainAspectRatio: false }, { options })}
            style={{ height: "300px" }}
          />
        </div>
      </div>
    </div>
  );
}

export default PieChart;
