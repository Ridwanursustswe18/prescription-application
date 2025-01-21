package com.example.demo.prescription;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface PrescriptionRepository extends JpaRepository<Prescription,Long> {
    @Query("SELECT p FROM Prescription p WHERE p.prescriptionDate BETWEEN :startDate AND :endDate")
    List<Prescription> findPrescriptionsBetweenDates(LocalDate startDate, LocalDate endDate);
    @Query("SELECT p FROM Prescription p WHERE FUNCTION('MONTH', p.prescriptionDate) = FUNCTION('MONTH', CURRENT_DATE) AND FUNCTION('YEAR', p.prescriptionDate) = FUNCTION('YEAR', CURRENT_DATE)")
    List<Prescription> findPrescriptionsForCurrentMonth();
    @Query("SELECT p.prescriptionDate, COUNT(p) FROM Prescription p GROUP BY p.prescriptionDate")
    List<Object[]> countPrescriptionsByDate();
}
