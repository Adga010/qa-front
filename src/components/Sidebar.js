import "../styles.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faBook, faBug } from "@fortawesome/free-solid-svg-icons";

function Sidebar() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <div id="layoutSidenav_nav">
      <nav
        className="sb-sidenav accordion sb-sidenav-dark"
        id="sidenavAccordion"
      >
        <div className="sb-sidenav-menu">
          <div className="nav">
            <div className="sb-sidenav-menu-heading">Core</div>
            <a className="nav-link" href="index.html">
              <div className="sb-nav-link-icon">
                <i className="fas fa-tachometer-alt"></i>
                {/* <FontAwesomeIcon icon={faBook} />{" "} */}
              </div>
              Dashboard
            </a>
            <div className="sb-sidenav-menu-heading">Interface</div>
            <button
              className={`nav-link ${isNavCollapsed ? "collapsed" : ""}`}
              onClick={handleNavCollapse}
              aria-expanded={!isNavCollapsed}
              aria-controls="collapseLayouts"
            >
              <div className="sb-nav-link-icon">
                <FontAwesomeIcon icon={faBug} />{" "}
                {/* This is an example icon, replace with your own choice */}
              </div>
              Reporte de Bugs
              <FontAwesomeIcon
                icon={faAngleRight}
                className={`ms-auto ${isNavCollapsed ? "" : "rotate-icon"}`} // You will add CSS for the rotate-icon className
              />
            </button>
            <div
              className={`collapse ${!isNavCollapsed ? "show" : ""}`}
              id="collapseLayouts"
              aria-labelledby="headingOne"
              data-bs-parent="#sidenavAccordion"
            >
              <nav className="sb-sidenav-menu-nested nav">
                <Link className="nav-link" to="/list-bug">
                  Listar Bugs
                </Link>
                <Link className="nav-link" to="/report-bug">
                  Reportar Bug
                </Link>
              </nav>
            </div>

            <div className="sb-sidenav-menu-heading">Addons</div>
            <Link className="nav-link" to="/upload-bug">
              <div className="sb-nav-link-icon">
                <i className="fas fa-chart-area"></i>
              </div>
              Carga de Bugs
            </Link>
            <a className="nav-link" href="tables.html">
              <div className="sb-nav-link-icon">
                <i className="fas fa-table"></i>
              </div>
              Tables
            </a>
          </div>
        </div>
        <div className="sb-sidenav-footer">
          <div className="small">Logged in as:</div>
          Start CDN
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;
