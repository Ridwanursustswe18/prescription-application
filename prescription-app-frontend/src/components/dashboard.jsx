import React from "react"; 
import { FaSignOutAlt } from "react-icons/fa"; 
import { useNavigate } from "react-router-dom";


const Navbar = ({ children }) => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        console.log('User logged out');
        navigate('/login');
    };
    return (
    <div style={styles.container}>
      {/* Navbar */}
      <div style={styles.navbar}>
        <h2 style={styles.navbarTitle}>Dashboard</h2>
        <div style={styles.navLinks}>
          <a href="/create-prescription" style={styles.navLink}>Create Prescription</a>
          <a href="/all-prescriptions" style={styles.navLink}>All Prescriptions</a>
          <a href="/report" style={styles.navLink}>Report</a>
          <button 
            style={styles.navbarLogoutButton} 
            onClick={handleLogout}
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      {/* Content area */}
      <div style={styles.contentArea}>
        {children} {/* Render children passed from parent */}
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  navbar: {
    backgroundColor: "#4CAF50", // Color for the navbar
    padding: "10px 20px", // Padding around the navbar
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row", // Aligns the items in the navbar horizontally
    position: "sticky",
    top: 0, // Ensures it sticks to the top when scrolling
    zIndex: 1000, // Keeps the navbar on top of other content
  },
  navbarTitle: {
    color: "white",
    fontSize: "24px",
    margin: 0,
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
  },
  navLink: {
    color: "white",
    textDecoration: "none",
    margin: "0 15px", // Space between links
    fontSize: "18px",
  },
  navbarLogoutButton: {
    backgroundColor: "#e74c3c", // Red color for the logout button
    color: "white",
    border: "none",
    padding: "8px 15px",
    borderRadius: "4px",
    cursor: "pointer",
    marginLeft: "20px", // Space between the logout button and links
    display: "flex",
    alignItems: "center",
  },
  contentArea: {
    padding: "20px",
    flex: 1, // Ensures that the content takes up remaining space
  },
};

export default Navbar;
