// PieChart.js
import React from "react";
import { Bar } from "react-chartjs-2";

function BartChart({ data, title }) {
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
        <div className="col-md-12">
          <Bar
            data={data}
            options={{
              // Opciones de Chart.js para el gráfico de barras
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                    },
                  },
                ],
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default BartChart;
