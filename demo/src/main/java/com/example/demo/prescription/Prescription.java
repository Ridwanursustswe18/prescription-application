package com.example.demo.prescription;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDate;
import java.time.LocalDateTime;

enum Gender {
    male,
    female
}

@Entity
@Table(name = "prescriptions")
public class Prescription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate prescriptionDate; // Changed to LocalDate

    @NotBlank(message = "Patient name is required")
    private String patientName;

    @NotNull(message = "Patient age is required")
    @Min(value = 0, message = "Age must be greater than or equal to 0")
    private Integer patientAge;

    @NotNull(message = "Patient gender is required")
    @Enumerated(EnumType.STRING)
    private Gender patientGender;
    private String diagnosis;
    private String medicine;

    private LocalDate nextDate; // Changed to LocalDate

    public Prescription(Long id, LocalDate prescriptionDate, String patientName, int patientAge,
                        Gender patientGender, String diagnosis, String medicine, LocalDate nextDate) {
        this.id = id;
        this.prescriptionDate = prescriptionDate;
        this.patientName = patientName;
        this.patientAge = patientAge;
        this.patientGender = patientGender;
        this.diagnosis = diagnosis;
        this.medicine = medicine;
        this.nextDate = nextDate;
    }

    public Prescription() {
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getPrescriptionDate() {
        return prescriptionDate;
    }

    public void setPrescriptionDate(LocalDate prescriptionDate) {
        this.prescriptionDate = prescriptionDate;
    }

    public String getPatientName() {
        return patientName;
    }

    public void setPatientName(String patientName) {
        this.patientName = patientName;
    }

    public Integer getPatientAge() {
        return patientAge;
    }

    public void setPatientAge(Integer patientAge) {
        this.patientAge = patientAge;
    }

    public Gender getPatientGender() {
        return patientGender;
    }

    public void setPatientGender(Gender patientGender) {
        this.patientGender = patientGender;
    }

    public String getDiagnosis() {
        return diagnosis;
    }

    public void setDiagnosis(String diagnosis) {
        this.diagnosis = diagnosis;
    }

    public String getMedicine() {
        return medicine;
    }

    public void setMedicine(String medicine) {
        this.medicine = medicine;
    }

    public LocalDate getNextDate() {
        return nextDate;
    }

    public void setNextDate(LocalDate nextDate) {
        this.nextDate = nextDate;
    }

    @Override
    public String toString() {
        return "Prescription{" +
                "id=" + id +
                ", prescriptionDate=" + prescriptionDate +
                ", patientName='" + patientName + '\'' +
                ", patientAge=" + patientAge +
                ", patientGender=" + patientGender +
                ", diagnosis='" + diagnosis + '\'' +
                ", medicine='" + medicine + '\'' +
                ", nextDate=" + nextDate +
                '}';
    }
}
