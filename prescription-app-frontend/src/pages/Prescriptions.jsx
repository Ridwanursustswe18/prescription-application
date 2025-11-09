import React, { useEffect, useState } from 'react';
import { dateRangeBasedPrescripstion, deletePrescription, monthlyPrescriptions } from '../api/Prescriptions';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { FaPen, FaTrash } from 'react-icons/fa';
import DeleteModal from '../global/modals/DeleteModal';
import { useNavigate } from 'react-router-dom';

export const Prescriptions = () => {
    const [prescriptions, setPrescriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [heading, setHeading] = useState("Current Month Prescriptions");
     const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const navigate = useNavigate();
    // Fetch prescriptions for the selected date range
    const fetchRangeBasedPrescriptions = async () => {
        if (!startDate || !endDate) {
            setError('Please select both start and end date.');
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const result = await dateRangeBasedPrescripstion(startDate, endDate);
            setPrescriptions(result.data.data);
        } catch (err) {
            setError('Failed to fetch prescriptions for the selected date range.');
        } finally {
            setHeading(
                `Showing Prescriptions from ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`
            );
            setLoading(false);
        }
    };

    // Fetch monthly prescriptions on component mount
    useEffect(() => {
        const fetchPrescriptions = async () => {
            try {
                const result = await monthlyPrescriptions();
                setPrescriptions(result.data.data);
            } catch (err) {
                setError('Failed to fetch prescriptions');
            } finally {
                setLoading(false);
            }
        };

        fetchPrescriptions();
    }, []);
     const handleEdit = (id) => {
         navigate(`/edit-prescription/${id}`);
        }
        const handleDeleteClick = (id) => {
            setSelectedId(id);
            setShowModal(true);
        };
        const confirmDelete = async () => {
            await deletePrescription(selectedId);
            setPrescriptions(prescriptions.filter(prescription => prescription.id !== selectedId));
            setShowModal(false);
            
        }
        const cancelDelete = () => {
        setShowModal(false);
      };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>{heading}</h1>

            {/* Date Picker Section */}
            <div style={styles.datePickerContainer}>
                <label style={styles.label}>Start Date:</label>
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="yyyy/MM/dd"
                    placeholderText="Select start date"
                    style={styles.datePicker}
                    className="custom-datepicker"
                />

                <label style={styles.label}>End Date:</label>
                <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    dateFormat="yyyy/MM/dd"
                    placeholderText="Select end date"
                    style={styles.datePicker}
                    className="custom-datepicker"
                />

                <button onClick={fetchRangeBasedPrescriptions} style={styles.button}>
                    Fetch Prescriptions
                </button>
            </div>

            {/* Table Section */}
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p style={styles.error}>{error}</p>
            ) : (
                <div>
                    {prescriptions === undefined || prescriptions.length === 0?  (
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
                                            <button  style={styles.editButton} onClick={()=>handleEdit(prescription?.id)}>
                                                <FaPen />
                                            </button>
                                            <button  style={styles.deleteButton} onClick={()=>handleDeleteClick(prescription?.id)}>
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
            <DeleteModal isOpen={showModal} onClose={cancelDelete} onConfirm={confirmDelete} />
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
    heading: {
        textAlign: "center",
        color: "#333",
        marginBottom: "20px",
    },
    datePickerContainer: {
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "15px",
        marginBottom: "20px",
        flexWrap: "wrap",
    },
    datePicker: {
        padding: "10px",
        fontSize: "14px",
        border: "2px solid #ddd",
        borderRadius: "4px",
        marginRight: "10px",
        marginBottom: "10px",
    },
    button: {
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

export default Prescriptions;
