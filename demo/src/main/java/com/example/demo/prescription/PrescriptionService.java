package com.example.demo.prescription;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PrescriptionService {
    @Autowired
    private final PrescriptionRepository prescriptionRepository;

    public PrescriptionService(PrescriptionRepository prescriptionRepository) {
        this.prescriptionRepository = prescriptionRepository;
    }

    public Prescription createPrescription(Prescription prescription){
        prescriptionRepository.save(prescription);
        return prescription;
    }
    public Prescription getPrescriptionById(Long id) {
        return prescriptionRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Prescription not found with id: " + id));
    }
    public Prescription updatePrescription(Long id, Prescription updatedFields) {
        Optional<Prescription> existingPrescription = prescriptionRepository.findById(id);
        if (existingPrescription.isPresent()) {
            Prescription prescription = existingPrescription.get();
            if (updatedFields.getPrescriptionDate() != null) {
                prescription.setPrescriptionDate(updatedFields.getPrescriptionDate());
            }

            if (updatedFields.getPatientName() != null) {
                prescription.setPatientName(updatedFields.getPatientName());
            }

            if (updatedFields.getPatientAge() != null) {
                prescription.setPatientAge(updatedFields.getPatientAge());
            }

            if (updatedFields.getPatientGender() != null) {
                prescription.setPatientGender(updatedFields.getPatientGender());
            }

            if (updatedFields.getDiagnosis() != null) {
                prescription.setDiagnosis(updatedFields.getDiagnosis());
            }

            if (updatedFields.getMedicine() != null) {
                prescription.setMedicine(updatedFields.getMedicine());
            }

            if (updatedFields.getNextDate() != null) {
                prescription.setNextDate(updatedFields.getNextDate());
            }

            return prescriptionRepository.save(prescription);
        }

        throw new RuntimeException("Prescription not found with id: " + id);
    }
    @Transactional
    public void deletePrescription(Long id) {
        Optional<Prescription> prescriptionOptional = prescriptionRepository.findById(id);
        if (prescriptionOptional.isEmpty()) {
            throw new IllegalArgumentException("Prescription with ID " + id + " not found.");
        }
        prescriptionRepository.deleteById(id);
    }
    public Map<LocalDate, Long> countPrescriptionsByDate() {
        List<Object[]> results = prescriptionRepository.countPrescriptionsByDate();
        return results.stream()
                .collect(Collectors.toMap(
                        result -> (LocalDate) result[0],
                        result -> (Long) result[1]
                ));
    }
    public List<Prescription> getAllPrescriptions(){
        return prescriptionRepository.findAll();
    }
    public List<Prescription> getCurrentMonthPrescriptions(){
        return prescriptionRepository.findPrescriptionsForCurrentMonth();
    }
    public List<Prescription> getDateRangeBasedPrescriptions(LocalDate startDate,LocalDate endDate){
        List<Prescription> prescriptions = prescriptionRepository.findPrescriptionsBetweenDates(startDate, endDate);
        return prescriptions;
    }
}

