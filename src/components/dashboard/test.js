// import React, { useState } from "react";
// import { getToken } from "../../utils/authUtils";
// import withAuth from "../../utils/withAuth";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { Pie } from "react-chartjs-2";
// import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
// Chart.register(ArcElement, Tooltip, Legend);

// const ProtectedPieChart = withAuth(PieChart);

// function PieChart() {
//   const [formData, setFormData] = useState({
//     fechaInicial: "",
//     fechaFinal: "",
//     projectName: "",
//     causal: "",
//     severidad: "",
//     area: "",
//   });

//   const [pieChartData, setPieChartData] = useState({
//     labels: [],
//     datasets: [
//       {
//         data: [],
//         backgroundColor: [
//           // Colores para cada sección del gráfico de pastel
//           "#FF6384",
//           "#36A2EB",
//           "#FFCE56",
//           "#E7E9ED",
//           "#4BC0C0",
//         ],
//       },
//     ],
//   });

//   const token = getToken();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.get(
//         "http://127.0.0.1:8000/api/get-bug/get-bug-reports/",
//         {
//           params: {
//             fecha_inicial: formData.fechaInicial,
//             fecha_final: formData.fechaFinal,
//             project_name: formData.projectName,
//             causal: formData.causal,
//             severidad: formData.severidad,
//             area: formData.area,
//           },
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       processChartData(response.data);
//       processSeverityChartData(response.data);
//       console.log(response.data);
//       // Manejar la respuesta aquí
//     } catch (error) {
//       Swal.fire("Error", "No se pudo obtener los datos.", "error");
//     }
//   };

//   const processChartData = (data) => {
//     // Este objeto almacenará el conteo de cada causal
//     const causalesCount = {};

//     // Itera sobre cada elemento de datos para contar las ocurrencias de cada causal
//     data.forEach((item) => {
//       const causalName = item.CAUSAL; // Asegúrate de que la propiedad es 'CAUSAL' y no 'causal' si es sensible a mayúsculas
//       if (causalName) {
//         if (causalesCount[causalName]) {
//           causalesCount[causalName] += 1;
//         } else {
//           causalesCount[causalName] = 1;
//         }
//       }
//     });

//     // Genera un array de colores basado en el número de causales
//     const backgroundColors = Object.keys(causalesCount).map((causal, index) => {
//       // Aquí podrías tener una función o un objeto que asigne colores específicos a cada causal
//       return getColorForCausal(causal, index);
//     });

//     // Configura el estado del gráfico con los nuevos datos
//     setPieChartData({
//       labels: Object.keys(causalesCount),
//       datasets: [
//         {
//           data: Object.values(causalesCount),
//           backgroundColor: backgroundColors,
//         },
//       ],
//     });
//   };

//   // Función auxiliar para obtener el color basado en la causal
//   function getColorForCausal(causal, index) {
//     const colors = [
//       "#FF6384",
//       "#36A2EB",
//       "#FFCE56",
//       "#E7E9ED",
//       "#4BC0C0",
//       // ... más colores para tus causales
//     ];
//     return colors[index % colors.length]; // Esto repetirá colores si hay más causales que colores definidos
//   }

//   const [severityPieChartData, setSeverityPieChartData] = useState({
//     labels: [],
//     datasets: [
//       {
//         data: [],
//         backgroundColor: [
//           "#FF6384",
//           "#36A2EB",
//           "#FFCE56",
//           // Agrega más colores si es necesario
//         ],
//       },
//     ],
//   });

//   function getColorForSeverity(_, index) {
//     const colors = [
//       "#FF6384",
//       "#36A2EB",
//       "#FFCE56",
//       "#E7E9ED",
//       "#4BC0C0",
//       // ... más colores
//     ];

//     return colors[index % colors.length]; // Esto asegura que el índice siempre esté dentro de los límites del array 'colors'
//   }

//   const processSeverityChartData = (data) => {
//     const severitiesCount = data.reduce((acc, item) => {
//       const severityName = item.SEVERIDAD;
//       if (severityName) {
//         acc[severityName] = (acc[severityName] || 0) + 1;
//       }
//       return acc;
//     }, {});

//     const backgroundColors = Object.keys(severitiesCount).map(
//       (severity, index) => {
//         // Asume que tienes una función que devuelve el color correspondiente
//         return getColorForSeverity(severity, index);
//       }
//     );

//     setSeverityPieChartData({
//       labels: Object.keys(severitiesCount),
//       datasets: [
//         {
//           data: Object.values(severitiesCount),
//           backgroundColor: backgroundColors,
//         },
//       ],
//     });
//   };

//   return (
//     <div className="container">
//       <div className="row justify-content-center body flex-grow-1 px-3">
//         <div className="col-lg-10">
//           <div className="card shadow-lg border-0 rounded-lg mt-5">
//             <div className="card-header ">
//               <h3 className="text-center font-weight-light my-3">
//                 Dashboard de Novedades.
//               </h3>
//               <div className="card-body">
//                 <form onSubmit={handleSubmit}>
//                   {/* Campos de formulario */}
//                   <input
//                     type="date"
//                     name="fechaInicial"
//                     value={formData.fechaInicial}
//                     onChange={handleChange}
//                   />
//                   <input
//                     type="date"
//                     name="fechaFinal"
//                     value={formData.fechaFinal}
//                     onChange={handleChange}
//                   />
//                   <input
//                     type="text"
//                     name="projectName"
//                     placeholder="Nombre del Proyecto"
//                     value={formData.projectName}
//                     onChange={handleChange}
//                   />

//                   {/* Select para Causal */}
//                   <select
//                     name="causal"
//                     value={formData.causal}
//                     onChange={handleChange}
//                   >
//                     <option value="">Seleccione una Causal</option>
//                     <option value="desarrollo">Desarrollo</option>
//                     <option value="analisis">Análisis</option>
//                     <option value="documentacion">Documentación</option>
//                     <option value="testing">Testing</option>
//                     <option value="diseño">Diseño</option>
//                   </select>

//                   {/* Select para Severidad */}
//                   <select
//                     name="severidad"
//                     value={formData.severidad}
//                     onChange={handleChange}
//                   >
//                     <option value="">Seleccione una Severidad</option>
//                     <option value="funcional">Funcional</option>
//                     <option value="presentacion">Presentación</option>
//                     <option value="bloqueante">Bloqueante</option>
//                   </select>

//                   {/* Select para Área */}
//                   <select
//                     name="area"
//                     value={formData.area}
//                     onChange={handleChange}
//                   >
//                     <option value="">Seleccione un Área</option>
//                     <option value="gestion del riesgo">
//                       Gestión del Riesgo
//                     </option>
//                     <option value="transversal">Transversal</option>
//                     <option value="mercadeo">Mercadeo</option>
//                     <option value="axces">Axces</option>
//                   </select>

//                   <button type="submit">Consultar</button>
//                 </form>
//               </div>
//             </div>
//           </div>
//           <div className="row">
//             {/* Gráfico de Doughnut */}
//             <div className="col-md-6">
//               <div className="card mb-3">
//                 <div className="card-header">Doughnut Chart</div>
//                 <div className="card-body">
//                   <Pie
//                     data={pieChartData}
//                     options={{ maintainAspectRatio: false }}
//                     style={{ height: "300px" }}
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Gráfico de Pie */}
//             {/* Gráfico de Pastel para Severidad */}
//             <div className="col-md-6">
//               <div className="card mb-3">
//                 <div className="card-header">Severity Pie Chart</div>
//                 <div className="card-body">
//                   <Pie
//                     data={severityPieChartData}
//                     options={{ maintainAspectRatio: false }}
//                     style={{ height: "300px" }}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProtectedPieChart;