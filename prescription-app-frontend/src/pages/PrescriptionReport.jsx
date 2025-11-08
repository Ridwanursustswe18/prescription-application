import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

import { getDaywisePrescriptionCount } from "../api/Prescriptions";

// Register Chart.js components

const PrescriptionReport = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const result = await getDaywisePrescriptionCount();
        const entries = Object.entries(result || {});
        setData(entries);
      } catch (err) {
        console.error(err);
        setError("Failed to load report");
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, []);

  

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📊 Day-wise Prescription Report</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={styles.errorMessage}>{error}</p>
      ) : data.length === 0 ? (
        <p style={styles.errorMessage}>No data available</p>
      ) : (
        <div>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Count</th>
              </tr>
            </thead>
            <tbody>
              {data?.map(([date, count], index) => (
                <tr key={index}>
                  <td style={styles.td}>{date}</td>
                  <td style={styles.td}>{count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PrescriptionReport;

const styles = {
  container: {
    maxWidth: "700px",
    margin: "40px auto",
    padding: "20px",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    fontFamily: "'Arial', sans-serif",
  },
  heading: {
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
  },
  errorMessage: {
    color: "red",
    fontWeight: "bold",
    textAlign: "center",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  th: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px",
    borderBottom: "2px solid #ddd",
    textAlign: "left",
  },
  td: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
  },
};
