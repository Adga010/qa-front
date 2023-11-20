import { useState, useEffect } from "react";
import axios from "axios";

const useChartData = (apiUrl, params) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{ data: [] }],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // La función fetchData se define aquí y se asegura de que solo se ejecuta bajo ciertas condiciones.
    const fetchData = async () => {
      if (!params.fechaInicial || !params.fechaFinal) return;
      setLoading(true);
      try {
        const response = await axios.get(apiUrl, {
          headers: { Authorization: `Bearer ${params.token}` },
          params: {
            fecha_inicial: params.fechaInicial,
            fecha_final: params.fechaFinal,
            project_name: params.projectName,
            causal: params.causal,
            severidad: params.severidad,
            area: params.area,
          },
        });
        setChartData(processChartData(response.data)); // Asegúrate de que processChartData retorna el formato correcto.
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl, params]);
};

const processChartData = (data) => {
  const causalesCount = {};
  data.forEach((item) => {
    const causalName = item.CAUSAL; // Asegúrate de que la propiedad es 'CAUSAL' y no 'causal' si es sensible a mayúsculas
    if (causalName) {
      if (causalesCount[causalName]) {
        causalesCount[causalName] += 1;
      } else {
        causalesCount[causalName] = 1;
      }
    }
  });

  const backgroundColors = Object.keys(causalesCount).map((causal, index) => {
    // Aquí podrías tener una función o un objeto que asigne colores específicos a cada causal
    return getColorForCausal(causal, index);
  });

  return {
    labels: Object.keys(causalesCount),
    datasets: [
      {
        data: Object.values(causalesCount),
        backgroundColor: backgroundColors,
      },
    ],
  };
};

// Asegúrate de que getColorForCausal no intenta establecer ningún estado y simplemente retorna un color.
function getColorForCausal(causal, index) {
  const colors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#E7E9ED",
    "#4BC0C0",
    // ... más colores para tus causales
  ];
  return colors[index % colors.length];
}

export default useChartData;
