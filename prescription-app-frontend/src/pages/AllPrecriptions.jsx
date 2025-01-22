import React, { useEffect, useState } from "react";
import { getAllPrescriptions } from "../api/Prescriptions";
import { FaPen, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const AllPrescriptions = () => {
    const [prescriptions, setPrescriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchPrescriptions = async () => {
            try {
                const result = await getAllPrescriptions();

                setPrescriptions(result);
            } catch (err) {
                setError('Failed to fetch prescriptions');
            } finally {
                setLoading(false);
            }
        };

        fetchPrescriptions();
    }, []);

    const handleGoBack = () => {
        navigate("/prescriptions");
    };

    return (
        <div style={styles.container}>
            <div style={styles.headerContainer}>
                <h1 style={styles.heading}>All Prescriptions</h1>
                {/* Go Back Button */}
                <button onClick={handleGoBack} style={styles.goBackButton}>
                    Go Back
                </button>
            </div>

            {/* Table Section */}
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p style={styles.error}>{error}</p>
            ) : (
                <div>
                    {prescriptions.length === 0 ? (
                        <p>No prescriptions available for this month.</p>
                    ) : (
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.th}>#</th>
                                    <th style={styles.th}>Medicine Name</th>
                                    <th style={styles.th}>Date</th>
                                    <th style={styles.th}>Patient Name</th>
                                    <th style={styles.th}>Age</th>
                                    <th style={styles.th}>Gender</th>
                                    <th style={styles.th}>Diagnosis</th>
                                    <th style={styles.th}>Next Date</th>
                                    <th style={styles.th}>Actions</th> {/* Added Actions column */}
                                </tr>
                            </thead>
                            <tbody>
                                {prescriptions.map((prescription, index) => (
                                    <tr key={index} style={styles.tr}>
                                        <td style={styles.td}>{index + 1}</td>
                                        <td style={styles.td}>{prescription.medicine}</td>
                                        <td style={styles.td}>{prescription.prescriptionDate}</td>
                                        <td style={styles.td}>{prescription.patientName}</td>
                                        <td style={styles.td}>{prescription.patientAge}</td>
                                        <td style={styles.td}>{prescription.patientGender}</td>
                                        <td style={styles.td}>{prescription.diagnosis}</td>
                                        <td style={styles.td}>{prescription.nextDate}</td>
                                        <td style={styles.td}>
                                            <button style={styles.editButton}>
                                                <FaPen />
                                            </button>
                                            <button style={styles.deleteButton}>
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}
        </div>
    );
};

// Inline styling
const styles = {
    container: {
        maxWidth: "90%",
        margin: "20px auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
    },
    headerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
    },
    heading: {
        color: "#333",
    },
    goBackButton: {
        backgroundColor: "#4CAF50",
        color: "white",
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
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
        textAlign: "left",
        borderBottom: "2px solid #ddd",
    },
    td: {
        padding: "10px",
        borderBottom: "1px solid #ddd",
    },
    tr: {
        backgroundColor: "#f9f9f9",
    },
    error: {
        color: "red",
        fontWeight: "bold",
        textAlign: "center",
    },
    editButton: {
        backgroundColor: "#FFC107",
        color: "white",
        border: "none",
        padding: "5px 10px",
        borderRadius: "4px",
        cursor: "pointer",
        marginRight: "5px",
    },
    deleteButton: {
        backgroundColor: "#e74c3c",
        color: "white",
        border: "none",
        padding: "5px 10px",
        borderRadius: "4px",
        cursor: "pointer",
    },
};

export default AllPrescriptions;
