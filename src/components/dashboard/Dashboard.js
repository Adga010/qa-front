// Dashboard.js
import React, { useState } from "react";
import FilterForm from "./FilterForm";
import PieChart from "./PieChart";
import DoughnutChart from "./DoughnutChart";
import BartChart from "./BartChart";
import axios from "axios";
import Swal from "sweetalert2";
import { getToken } from "../../utils/authUtils";

function Dashboard() {
  // Estado para envolver los graficos.
  const [showCharts, setShowCharts] = useState(false);

  const [pieChartData, setPieChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#E7E9ED",
          "#4BC0C0",
        ],
      },
    ],
  });
  const [severityPieChartData, setSeverityPieChartData] = useState({
    labels: [],
    datasets: [
      { data: [], backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"] },
    ],
  });

  const [areaDoughnutChartData, setAreaDoughnutChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          // Asegúrate de tener suficientes colores para todas las áreas posibles
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#E7E9ED",
          "#4BC0C0",
          "#A3E635",
          "#B2912F",
        ],
      },
    ],
  });

  const [projectBarChartData, setProjectBarChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Número de Bugs",
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  });

  const processChartData = (data, type) => {
    const count = {};
    data.forEach((item) => {
      // Asegúrate de que la clave exista en el objeto y no sea undefined.
      const key = item[type.toUpperCase()]; // Usando toUpperCase() para coincidir con tus datos
      if (key) {
        count[key] = (count[key] || 0) + 1;
      } else {
        // Si la clave es undefined, puedes decidir si quieres contarla o no.
        // Si no quieres contarla, simplemente no hagas nada aquí.
        // Si quieres contarla como 'undefined', puedes descomentar la siguiente línea:
        // count['undefined'] = (count['undefined'] || 0) + 1;
      }
    });

    const chartData = {
      labels: Object.keys(count),
      datasets: [
        {
          data: Object.values(count),
          backgroundColor:
            type === "CAUSAL"
              ? pieChartData.datasets[0].backgroundColor
              : type === "SEVERIDAD"
              ? severityPieChartData.datasets[0].backgroundColor
              : areaDoughnutChartData.datasets[0].backgroundColor, // Agregado para el área
        },
      ],
    };

    if (type === "CAUSAL") {
      setPieChartData(chartData);
    } else if (type === "SEVERIDAD") {
      setSeverityPieChartData(chartData);
    } else if (type === "AREA") {
      // Agregado para el área
      setAreaDoughnutChartData(chartData);
    }
    if (type === "PROJECT_NAME") {
      const projectCount = {};
      data.forEach((item) => {
        const projectName = item.PROJECT_NAME;
        if (projectName) {
          projectCount[projectName] = (projectCount[projectName] || 0) + 1;
        }
      });

      const chartData = {
        labels: Object.keys(projectCount),
        datasets: [
          {
            label: "Número de Bugs",
            data: Object.values(projectCount),
            backgroundColor: "#36A2EB",
            borderColor: "#247BA0",
            borderWidth: 1,
          },
        ],
      };
      setProjectBarChartData(chartData);
    }
  };

  const fetchChartData = async (formData) => {
    const token = getToken();
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/get-bug/get-bug-reports/",
        {
          params: {
            fecha_inicial: formData.fechaInicial,
            fecha_final: formData.fechaFinal,
            project_name: formData.projectName,
            causal: formData.causal,
            severidad: formData.severidad,
            area: formData.area,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      processChartData(response.data, "CAUSAL");
      processChartData(response.data, "SEVERIDAD");
      processChartData(response.data, "AREA");
      processChartData(response.data, "PROJECT_NAME");
      setShowCharts(true); // Mostrar gráficos cuando hay datos
      console.log(response.data);
    } catch (error) {
      console.error(error.response?.data?.detail);
      setShowCharts(false); // Ocultar gráficos si hay un error
      Swal.fire(
        "Error",
        "No se pudo obtener los datos: " +
          (error.response?.data?.detail || "Error desconocido"),
        "error"
      );
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow-lg border-0 rounded-lg mt-5">
            <div className="card-header ">
              <h3 className="text-center font-weight-light my-3">
                Dashboard de Novedades.
              </h3>
              <div className="card-body">
                <FilterForm onFilterSubmit={fetchChartData} />
                {showCharts && ( // Renderizar gráficos sólo si showCharts es true
                  <div className="row margin-top">
                    <div className="col-md-6">
                      <PieChart data={pieChartData} title="Causal" />{" "}
                    </div>
                    <div className="col-md-6">
                      <PieChart data={severityPieChartData} title="Severidad" />{" "}
                    </div>
                    <div className="col-md-6">
                      <DoughnutChart
                        data={areaDoughnutChartData}
                        title="Area"
                      />{" "}
                      {/* Nuevo gráfico de pastel para el área */}
                    </div>
                    <BartChart
                      data={projectBarChartData}
                      title="Cantidad de Bug por Proyecto"
                    ></BartChart>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
