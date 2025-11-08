import React, { useEffect, useState } from "react";
import { createPrescription, getPrescriptionById, updatePrescription } from "../api/Prescriptions";
import { useNavigate, useParams } from "react-router-dom";

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
    const { id } = useParams();
   
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const fetchPrescription = async () => {
        if (id) {
            const prescription = await getPrescriptionById(id);
            setFormData(prescription);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError(null);
            setSuccess(null);
            if (id) {
                 await updatePrescription(id, formData);
            
                } else {
                const response = await createPrescription(formData);
            }
            setSuccess(`Prescription ${id ? "updated" : "created"} successfully!`);
            navigate('/prescriptions');
        } catch (err) {
            setError(`Failed to ${id ? "update" : "create"} prescription.`);
        }
    };
    useEffect(() => {
        fetchPrescription();
    }, [id]);
    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>{id ? "Edit" : "Create"} Prescription</h2>
            {error && <p style={styles.errorMessage}>{error}</p>}
            {success && <p style={styles.successMessage}>{success}</p>}
            
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label>Medicine Name</label>
                    <input type="text" name="medicine" onChange={handleChange} required style={styles.input} value={formData.medicine}/>
                </div>

                <div style={styles.formGroup}>
                    <label>Prescription Date</label>
                    <input type="date" name="prescriptionDate" onChange={handleChange} required style={styles.input} value={formData.prescriptionDate}/>
                </div>

                <div style={styles.formGroup}>
                    <label>Patient Name</label>
                    <input type="text" name="patientName" onChange={handleChange} required style={styles.input} value={formData.patientName}/>
                </div>

                <div style={styles.formGroup}>
                    <label>Age</label>
                    <input type="number" name="patientAge" onChange={handleChange} required style={styles.input} value={formData.patientAge}/>
                </div>

                <div style={styles.formGroup}>
                    <label>Gender</label>
                    <select name="patientGender" onChange={handleChange} required style={styles.input} value={formData.patientGender}>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>

                <div style={styles.formGroup}>
                    <label>Diagnosis</label>
                    <input type="text" name="diagnosis" onChange={handleChange}  style={styles.input} value={formData.diagnosis}/>
                </div>

                <div style={styles.formGroup}>
                    <label>Next Appointment Date</label>
                    <input type="date" name="nextDate" onChange={handleChange}  style={styles.input} value={formData.nextDate}/>
                </div>

                <button type="submit" style={styles.button}> {id ? "Update" : "Create"} Prescription</button>
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
