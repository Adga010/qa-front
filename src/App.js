// src/App.js
import Login from "./components/Login";
// import Home from "./components/Home"; // Si tienes un componente Home, también impórtalo
import ProtectedHome from "./components/Home";
import ProtectedListBug from "./components/ListBug";
import ProtectedFormBug from "./components/FormBug";
import ProtectedEditBugForm from "./components/EditBugForm";
import ProtectedUploadFile from "../src/components/data/UploadFile";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import ProtectedDownload from "./components/data/DownloadFile";
import Dashboard from "./components/dashboard/Dashboard";
import {
  Chart,
  CategoryScale,
  ArcElement,
  BarElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
Chart.register(
  CategoryScale,
  BarElement,
  ArcElement,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

// Este componente actúa como layout para las páginas protegidas
function ProtectedLayout() {
  return (
    <>
      <Navbar />
      <div id="layoutSidenav">
        <Sidebar />
        <div id="layoutSidenav_content">
          {/* Tus componentes protegidos irán aquí */}
          <Routes>
            <Route path="/home" element={<ProtectedHome />} />
            <Route path="/list-bug" element={<ProtectedListBug />} />
            <Route path="/home" element={<ProtectedHome />} />
            <Route path="/list-bug" element={<ProtectedListBug />} />
            <Route path="/report-bug" element={<ProtectedFormBug />} />
            <Route path="/edit-bug/:id" element={<ProtectedEditBugForm />} />
            <Route path="/upload-bug" element={<ProtectedUploadFile />} />
            <Route path="/download-bug" element={<ProtectedDownload />} />
            <Route path="/dashboard-bug" element={<Dashboard />} />
          </Routes>
          <Footer></Footer>
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* Ruta envuelta en el layout protegido */}
        <Route path="/*" element={<ProtectedLayout />} />
      </Routes>
    </Router>
  );
}

export default App;

<Route path="/" element={<Login />} />;
