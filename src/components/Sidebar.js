import "../styles.css";
import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   FaHome,
//   FaDatabase,
//   FaUser,
//   FaCog,
//   FaSignOutAlt,
// } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faBook, faBug } from "@fortawesome/free-solid-svg-icons";

function Sidebar() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <div id="layoutSidenav_nav">
      <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
        <div class="sb-sidenav-menu">
          <div class="nav">
            <div class="sb-sidenav-menu-heading">Core</div>
            <a class="nav-link" href="index.html">
              <div class="sb-nav-link-icon">
                <i class="fas fa-tachometer-alt"></i>
                {/* <FontAwesomeIcon icon={faBook} />{" "} */}
              </div>
              Dashboard
            </a>
            <div class="sb-sidenav-menu-heading">Interface</div>
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
                className={`ms-auto ${isNavCollapsed ? "" : "rotate-icon"}`} // You will add CSS for the rotate-icon class
              />
            </button>
            <div
              className={`collapse ${!isNavCollapsed ? "show" : ""}`}
              id="collapseLayouts"
              aria-labelledby="headingOne"
              data-bs-parent="#sidenavAccordion"
            >
              <nav class="sb-sidenav-menu-nested nav">
                <a class="nav-link" href="list-bug">
                  Listado de Bugs
                </a>
                <a class="nav-link" href="report-bug">
                  Reporta un Bug
                </a>
              </nav>
            </div>

            <div class="sb-sidenav-menu-heading">Addons</div>
            <a class="nav-link" href="charts.html">
              <div class="sb-nav-link-icon">
                <i class="fas fa-chart-area"></i>
              </div>
              Charts
            </a>
            <a class="nav-link" href="tables.html">
              <div class="sb-nav-link-icon">
                <i class="fas fa-table"></i>
              </div>
              Tables
            </a>
          </div>
        </div>
        <div class="sb-sidenav-footer">
          <div class="small">Logged in as:</div>
          Start CDN
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;
