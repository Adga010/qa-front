// import React from "react";
// import withAuth from "../utils/withAuth";
// // import { useNavigate } from "react-router-dom";
// import Sidebar from './Sidebar';
// import '../styles.css';

// const ProtectedListBug = withAuth(ListBug);

// function ListBug() {
//     // Ejemplo de datos de la API
//     const bugs = [
//         {
//             "FECHA": "2023-10-20",
//             "STATUS": "pendiente",
//             "AREA": "axces",
//             "PROJECT_NAME": "Nombre del Proyecto",
//             "BUG": "Descripción detallada del error encontrado...",
//             "CAUSAL": "desarrollo",
//             "SEVERIDAD": "funcional",
//             "ENLACE": "http://ejemplo.com/enlace-a-referencia",
//             "ENCARGADO": "Nombre del Encargado"
//         },
//         // ... puedes agregar más entradas aquí para simular múltiples registros
//     ];

//     return (
//         <div className="container-principal">
//             <Sidebar />

//             {/* Rest of your content */}
//             <div className="contenido-principal">
//                 <h1 className="display-4">Lista de Errores</h1>
//                 <table class="table">
//                     <thead class="table-light">
//                         <tr>
//                             <th>Fecha</th>
//                             <th>Status</th>
//                             <th>Área</th>
//                             <th>Nombre del Proyecto</th>
//                             <th>Descripción del Error</th>
//                             <th>Causal</th>
//                             <th>Severidad</th>
//                             <th>Enlace</th>
//                             <th>Encargado</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {bugs.map((bug, index) => (
//                             <tr key={index}>
//                                 <td>{bug.FECHA}</td>
//                                 <td>{bug.STATUS}</td>
//                                 <td>{bug.AREA}</td>
//                                 <td>{bug.PROJECT_NAME}</td>
//                                 <td>{bug.BUG}</td>
//                                 <td>{bug.CAUSAL}</td>
//                                 <td>{bug.SEVERIDAD}</td>
//                                 <td><a href={bug.ENLACE} target="_blank" rel="noopener noreferrer">Enlace</a></td>
//                                 <td>{bug.ENCARGADO}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// }

// export default ProtectedListBug;


import React, { useState, useEffect } from "react";
import withAuth from "../utils/withAuth";
import { getToken } from "../utils/authUtils";
import Sidebar from './Sidebar';
import '../styles.css';

const ProtectedListBug = withAuth(ListBug);

function ListBug() {
    const [bugs, setBugs] = useState([]);
    const [error, setError] = useState(null);
    const token = getToken();
    console.log(token);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/report-bug/register/", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(respuesta => {
            if (!respuesta.ok) {
                throw new Error("Hubo un problema al cargar los datos.");
            }
            return respuesta.json();
        })
        .then(data => setBugs(data))
        .catch(err => setError(err.message));
    }, []);
    

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container-principal">
            <Sidebar />

            <div className="contenido-principal">
                <h1 className="display-4">Lista de Errores</h1>
                <table className="table">
                    <thead className="table-light">
                        <tr>
                            <th>Fecha</th>
                            <th>Status</th>
                            <th>Área</th>
                            <th>Nombre del Proyecto</th>
                            <th>Descripción del Error</th>
                            <th>Causal</th>
                            <th>Severidad</th>
                            <th>Enlace</th>
                            <th>Encargado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bugs.map((bug, index) => (
                            <tr key={bug.id}>
                                <td>{bug.FECHA}</td>
                                <td>{bug.STATUS}</td>
                                <td>{bug.AREA}</td>
                                <td>{bug.PROJECT_NAME}</td>
                                <td>{bug.BUG}</td>
                                <td>{bug.CAUSAL}</td>
                                <td>{bug.SEVERIDAD}</td>
                                <td><a href={bug.ENLACE} target="_blank" rel="noopener noreferrer">Enlace</a></td>
                                <td>{bug.ENCARGADO}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ProtectedListBug;
