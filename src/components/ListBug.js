import React, { useMemo, useState, useEffect } from "react";
import withAuth from "../utils/withAuth";
import { getToken } from "../utils/authUtils";
import "../styles.css";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
// import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
import { useTable, usePagination } from "react-table";
import { Table, Button } from "react-bootstrap";
import Alert from "./alerts/Alert";

// Este componente está envuelto con la función withAuth para proteger la ruta
const ProtectedListBug = withAuth(ListBug);

function ListBug() {
  const [bugs, setBugs] = useState([]);
  const [error, setError] = useState(null);
  const token = getToken(); // Obtener el token de autenticación
  let navigate = useNavigate();
  const [load, setload] = useState(false);

  const columns = useMemo(
    () => [
      {
        Header: "Fecha",
        accessor: "FECHA", // El "accessor" es el "key" en los datos
      },
      {
        Header: "Status",
        accessor: "STATUS",
      },
      {
        Header: "Área",
        accessor: "AREA",
      },
      {
        Header: "Nombre del Proyecto",
        accessor: "PROJECT_NAME",
      },
      {
        Header: "Descripción del Error",
        accessor: "BUG",
      },
      {
        Header: "Causal",
        accessor: "CAUSAL",
      },
      {
        Header: "Severidad",
        accessor: "SEVERIDAD",
      },
      {
        Header: "Enlace",
        accessor: "ENLACE",
        Cell: ({ value }) => (
          <a href={value} target="_blank" rel="noopener noreferrer">
            Enlace
          </a>
        ),
      },
      {
        Header: "Acciones",
        Cell: ({ row }) => (
          <div className="action-buttons">
            <Button
              variant="primary"
              onClick={() => handleUpdate(row.original.id)}
            >
              <i className="fas fa-edit"></i>
            </Button>
            {""}
            <Alert
              title="¿Estás seguro?"
              text="¡No podrás revertir esto!"
              onConfirm={() => handleDelete(row.original.id)}
              onCancel={() => console.log("Cancelado")}
              variant="btn-danger" // Clase de Bootstrap para el color rojo
              className="fas fa-trash" // Clases adicionales que quieras aplicar
              icon="warning"
            />

            {/* <Button
              variant="danger"
              onClick={() => handleDelete(row.original.id)}
            >
              <i className="fas fa-trash"></i>
            </Button> */}
          </div>
        ),
      },
    ],
    []
  );

  const data = useMemo(() => bugs, [bugs]);

  const tableInstance = useTable({ columns, data }, usePagination);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // En lugar de usar 'rows', usa 'page'
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = tableInstance;

  const handleUpdate = (id) => {
    // Redirecciona al usuario al formulario de edición
    navigate(`/edit-bug/${id}`);
  };

  // Función para manejar la eliminación
  const handleDelete = async (id) => {
    // Si el usuario confirma, procede con la eliminación
    deleteBug(id);
  };

  useEffect(() => {
    // Mutar parta volver a cargar.
    if (load) return;
    const loadData = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/report-bug/register",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Uso del token de autenticación en el encabezado
            },
          }
        );

        if (!response.ok) {
          throw new Error("Hubo un problema al cargar los datos.");
        }

        const data = await response.json();
        setBugs(data);
      } catch (err) {
        setError(err.message);
      }
    };

    loadData();

    // Teardown function para limpiar la instancia de DataTables
  }, [token, load]);

  // Función para manejar la eliminación

  const deleteBug = async (id) => {
    setload(true);
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/delete-bug/${id}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Hubo un problema al eliminar el registro.");
      }

      // Filtrar el estado de bugs para quitar el eliminado
      // const updatedBugs = bugs.filter((bug) => bug.id != id);
      // setBugs(updatedBugs);

      // Swal.fire("Eliminado!", "El registro ha sido eliminado.", "success");
    } catch (err) {
      // Swal.fire("Error!", `Error: ${err.message}`, "error");
    }
    setload(false);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <main>
        <div className="container-fluid px-4">
          <h1 className="mt-4">Tables</h1>
          <ol className="breadcrumb mb-4">
            <li className="breadcrumb-item">
              <a href="index.html">Dashboard</a>
            </li>
            <li className="breadcrumb-item active">Tables</li>
          </ol>

          <div className="card mb-4">
            <div className="card-body">
              DataTables is a third party plugin that is used to generate the
              demo table below. For more information about DataTables, please
              visit the
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://datatables.net/"
              >
                official DataTables documentation
              </a>
            </div>
          </div>
          <div className="card mb-4">
            <div className="card-header">
              <i className="fas fa-table me-1"></i>
              DataTable Example
            </div>
            <div className="card-body">
              <Table {...getTableProps()} striped bordered hover>
                <thead>
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th {...column.getHeaderProps()}>
                          {column.render("Header")}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {page.map((row) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          return (
                            <td {...cell.getCellProps()}>
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <div className="pagination">
                <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                  {"<<"}
                </Button>{" "}
                <Button
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}
                >
                  {"<"}
                </Button>{" "}
                <Button onClick={() => nextPage()} disabled={!canNextPage}>
                  {">"}
                </Button>{" "}
                <Button
                  onClick={() => gotoPage(pageCount - 1)}
                  disabled={!canNextPage}
                >
                  {">>"}
                </Button>{" "}
                <span>
                  Page{" "}
                  <strong>
                    {pageIndex + 1} of {pageOptions.length}
                  </strong>{" "}
                </span>
                <span>
                  | Go to page:{" "}
                  <input
                    type="number"
                    defaultValue={pageIndex + 1}
                    onChange={(e) => {
                      const page = e.target.value
                        ? Number(e.target.value) - 1
                        : 0;
                      gotoPage(page);
                    }}
                    style={{ width: "50px" }}
                  />
                </span>{" "}
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                  }}
                >
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      Show {pageSize}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProtectedListBug;
