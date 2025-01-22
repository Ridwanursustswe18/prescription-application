import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Prescriptions from "./pages/Prescriptions";
import Navbar from "./components/dashboard";
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
      </Routes>
    </Router>
  );
}

export default App;
