import React, { useState } from "react";
import { createPrescription } from "../api/Prescriptions";
import { useNavigate } from "react-router-dom";

const CreatePrescriptionForm = () => {
    const [formData, setFormData] = useState({
        medicine: "",
        prescriptionDate: "",
        patientName: "",
        patientAge: "",
        patientGender: "",
        diagnosis: "",
        nextDate: ""
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError(null);
            setSuccess(null);

            const response = await createPrescription(formData);
            setSuccess("Prescription created successfully!");
            navigate('/prescriptions');
        } catch (err) {
            setError("Failed to create prescription.");
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Create Prescription</h2>
            {error && <p style={styles.errorMessage}>{error}</p>}
            {success && <p style={styles.successMessage}>{success}</p>}
            
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label>Medicine Name</label>
                    <input type="text" name="medicine" onChange={handleChange} required style={styles.input} />
                </div>

                <div style={styles.formGroup}>
                    <label>Prescription Date</label>
                    <input type="date" name="prescriptionDate" onChange={handleChange} required style={styles.input} />
                </div>

                <div style={styles.formGroup}>
                    <label>Patient Name</label>
                    <input type="text" name="patientName" onChange={handleChange} required style={styles.input} />
                </div>

                <div style={styles.formGroup}>
                    <label>Age</label>
                    <input type="number" name="patientAge" onChange={handleChange} required style={styles.input} />
                </div>

                <div style={styles.formGroup}>
                    <label>Gender</label>
                    <select name="patientGender" onChange={handleChange} required style={styles.input}>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>

                <div style={styles.formGroup}>
                    <label>Diagnosis</label>
                    <input type="text" name="diagnosis" onChange={handleChange}  style={styles.input} />
                </div>

                <div style={styles.formGroup}>
                    <label>Next Appointment Date</label>
                    <input type="date" name="nextDate" onChange={handleChange}  style={styles.input} />
                </div>

                <button type="submit" style={styles.button}>Create Prescription</button>
            </form>
        </div>
    );
};

// Inline CSS styles
const styles = {
    container: {
        maxWidth: "500px",
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
    successMessage: {
        color: "green",
        fontWeight: "bold",
        textAlign: "center",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
    },
    formGroup: {
        display: "flex",
        flexDirection: "column",
    },
    input: {
        padding: "10px",
        fontSize: "16px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        transition: "border 0.3s ease-in-out",
    },
    button: {
        backgroundColor: "#4CAF50",
        color: "white",
        padding: "10px",
        fontSize: "16px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "background 0.3s ease-in-out",
    },
};

export default CreatePrescriptionForm;
