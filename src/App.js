// src/App.js
import Login from "./components/Login";
// import Home from "./components/Home"; // Si tienes un componente Home, también impórtalo
import ProtectedHome from "./components/Home";
import ProtectedListBug from "./components/ListBug";
import ProtectedFormBug from "./components/FormBug";
import ProtectedEditBugForm from "./components/EditBugForm";
import ProtectedUploadFile from "../src/components/data/UploadFile";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// ... tus otros imports

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<ProtectedHome />} />
        <Route path="/list-bug" element={<ProtectedListBug />} />
        <Route path="/report-bug" element={<ProtectedFormBug />} />
        <Route path="/edit-bug/:id" element={<ProtectedEditBugForm />} />
        <Route path="/upload-bug" element={<ProtectedUploadFile />} />
      </Routes>
    </Router>
  );
}

export default App;
