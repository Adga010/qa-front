// PieChart.js
import React from "react";
import { Doughnut } from "react-chartjs-2";

function DoughnutChart({ data, title }) {
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
          <Doughnut
            data={data}
            options={({ cutoutPercentage: 50 }, { options })}
            style={{ height: "300px" }}
          />
        </div>
      </div>
    </div>
  );
}

export default DoughnutChart;
