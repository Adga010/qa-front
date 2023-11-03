import '../styles.css';
import { useNavigate } from "react-router-dom";
import { FaHome, FaDatabase, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBug } from '@fortawesome/free-solid-svg-icons';

function Sidebar() {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/");
    };


    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{ width: '280px' }}>
            <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                {/* Aquí puedes incluir tu propio SVG o eliminar esta parte si no la necesitas */}
                <span className="fs-4">Sidebar</span>
            </a>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <a href="home" className="nav-link" aria-current="page">
                        <FaHome className="me-2" /> Home
                    </a>
                </li>
                <li className="nav-item">
                    <a href="list-bug" className="nav-link" aria-current="page">
                        <FontAwesomeIcon icon={faBug} /> Reporte de Bugs
                    </a>
                </li>
                {/* ... Aquí irían el resto de tus links ... */}
            </ul>
            <hr />
            <div className="dropdown">
                <a href="#" className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
                    <strong>mdo</strong>
                </a>
                <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
                    <li><a className="dropdown-item" href="#">Perfil</a></li>
                    <li><a className="dropdown-item" href="#">Configuración</a></li>
                    <li><a className="dropdown-item" href="#" onClick={handleLogout}>Cerrar sesión</a></li>
                </ul>

            </div>
        </div>
    );
}

export default Sidebar;