import React from "react";
import withAuth from "../utils/withAuth";
// import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "../styles.css";

const ProtectedHome = withAuth(Home);

function Home() {
  // const navigate = useNavigate();

  // const handleLogout = () => {
  //   localStorage.removeItem("authToken");
  //   navigate("/");
  // };

  return (
    <div>
      <Navbar></Navbar>
      <div id="layoutSidenav">
        <Sidebar></Sidebar>
        <div id="layoutSidenav_content">
          <main>
            <div class="container-fluid px-4">
              <h1 class="mt-4">Static Navigation</h1>
              <ol class="breadcrumb mb-4">
                <li class="breadcrumb-item">
                  <a href="index.html">Dashboard</a>
                </li>
                <li class="breadcrumb-item active">Static Navigation</li>
              </ol>
              <div class="card mb-4">
                <div class="card-body">
                  <p class="mb-0">
                    This page is an example of using static navigation. By
                    removing the
                    <code>.sb-nav-fixed</code>
                    class from the
                    <code>body</code>, the top navigation and side navigation
                    will become static on scroll. Scroll down this page to see
                    an example.
                  </p>
                </div>
              </div>
              {/* <Sidebar /> */}
              {/* <div style={{ height: "100vh" }}></div>
              <div class="card mb-4">
                <div class="card-body">
                  When scrolling, the navigation stays at the top of the page.
                  This is the end of the static navigation demo.
                </div>
              </div> */}
            </div>
          </main>
          <footer class="py-4 bg-light mt-auto">
            <div class="container-fluid px-4">
              <div class="d-flex align-items-center justify-content-between small">
                <div class="text-muted">Copyright &copy; Your Website 2023</div>
                <div>
                  <a href="/privacy-policy">Privacy Policy</a>
                  <a href="/terms-and-conditions">Terms & Conditions</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>

    // <div className="container-principal">
    //     <Sidebar />

    //     {/* Rest of your content */}
    //     <div className="contenido-principal">
    //         <div className="jumbotron">
    //             <h1 className="display-4">¡Bienvenido a Mi Portal!</h1>
    //             <p className="lead">
    //                 Este es un portal simple creado con React y Bootstrap.
    //             </p>
    //             <hr className="my-4" />
    //             <p>
    //                 Puedes explorar las diferentes secciones para aprender más sobre lo que ofrecemos.
    //             </p>
    //         </div>
    //     </div>
    // </div>
  );
}

export default ProtectedHome;
