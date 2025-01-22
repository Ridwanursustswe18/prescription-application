import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Prescriptions from "./pages/Prescriptions";
import Navbar from "./components/navbar";
import AllPrecriptions from "./pages/AllPrecriptions";
import CreatePrescriptionForm from "./pages/CreatePrescription";
function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root ("/") to "/login" */}
        <Route path="/" element={<Navigate replace to="/login" />} />
        {/* Login Route */}
        <Route path="/login" element={<Login />} />
        <Route path="/prescriptions" element = {
          <Navbar>
            <Prescriptions/>
          </Navbar>
          }/>
          <Route path="/all-prescriptions" element = {
          <Navbar>
            <AllPrecriptions/>
          </Navbar>
          }/>
          <Route path="/create-prescription" element = {
          <Navbar>
            <CreatePrescriptionForm/>
          </Navbar>
          }/>
      </Routes>
    </Router>
  );
}

export default App;
