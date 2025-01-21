package com.example.demo.prescription;

import com.example.demo.response.ResponseUtil;
import com.example.demo.user.UserRepository;
import com.example.demo.user.UserService;
import com.example.demo.user.utils.JWTUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/prescriptions")
public class PrescriptionController {
    @Autowired
    private final PrescriptionService prescriptionService;
    private final JWTUtil jwtUtil;
    public PrescriptionController(PrescriptionService prescriptionService, JWTUtil jwtUtil, ResponseUtil responseUtil, UserRepository userRepository) {
        this.prescriptionService = prescriptionService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createPrescription(
            @RequestBody Prescription prescription,
            @RequestHeader(value = "Authorization", required = true) String authHeader) {

        try {
            // Extract token
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseUtil.createResponse("Invalid Credentials", HttpStatus.FORBIDDEN);
            }

            String token = authHeader.substring(7);

            // Validate token
            String email = jwtUtil.getEmailFromToken(token);

            if (!jwtUtil.validateToken(token)) {
                return ResponseUtil.createResponse("Token expired or invalid", HttpStatus.FORBIDDEN);
            }

            if (email == null ) {
                return ResponseUtil.createResponse("Invalid user", HttpStatus.FORBIDDEN);
            }

            // Create prescription
            Prescription newPrescription = prescriptionService.createPrescription(prescription);

            // Create response data
            Map<String, Object> prescriptionData = Map.of(
                    "id", newPrescription.getId(),
                    "prescriptionDate", newPrescription.getPrescriptionDate(),
                    "patientName", newPrescription.getPatientName(),
                    "patientAge", newPrescription.getPatientAge(),
                    "patientGender", newPrescription.getPatientGender(),
                    "diagnosis", newPrescription.getDiagnosis(),
                    "medicine", newPrescription.getMedicine(),
                    "nextDate", newPrescription.getNextDate()
            );

            return ResponseUtil.createResponse(
                    "Prescription created successfully",
                    HttpStatus.CREATED,
                    prescriptionData
            );

        } catch (Exception e) {
            return ResponseUtil.createResponse(
                    "Error creating prescription: " + e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
    @PatchMapping("/{id}")
    public ResponseEntity<?> updatePrescription(
            @PathVariable Long id,
            @RequestBody Prescription updatedFields,
            @RequestHeader(value = "Authorization", required = true) String authHeader) {

        try {

            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseUtil.createResponse("Invalid Credentials", HttpStatus.FORBIDDEN);
            }

            String token = authHeader.substring(7);

            String email = jwtUtil.getEmailFromToken(token);

            if (!jwtUtil.validateToken(token)) {
                return ResponseUtil.createResponse("Token expired or invalid", HttpStatus.FORBIDDEN);
            }
            if (email == null) {
                return ResponseUtil.createResponse("Invalid user", HttpStatus.FORBIDDEN);
            }

            Prescription updated = prescriptionService.updatePrescription(id, updatedFields);
            return ResponseUtil.createResponse("Prescription updated successfully",
                    HttpStatus.OK,
                    updated);
        } catch (Exception e) {
            return ResponseUtil.createResponse("Error: " + e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePrescription(
            @PathVariable Long id,
            @RequestHeader(value = "Authorization", required = true) String authHeader) {

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseUtil.createResponse("Invalid Credentials", HttpStatus.FORBIDDEN);
        }

        String token = authHeader.substring(7);

        String email = jwtUtil.getEmailFromToken(token);

        if (!jwtUtil.validateToken(token)) {
            return ResponseUtil.createResponse("Token expired or invalid", HttpStatus.FORBIDDEN);
        }
        if (email == null) {
            return ResponseUtil.createResponse("Invalid user", HttpStatus.FORBIDDEN);
        }

        try {
            prescriptionService.deletePrescription(id);
            return ResponseUtil.createResponse("prescription was deleted successfully",HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage()); // 404 Not Found
        } catch (SecurityException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage()); // 403 Forbidden
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting prescription"); // 500 Internal Server Error
        }
    }
    @GetMapping("/count-by-date")
    public ResponseEntity<?> getPrescriptionCountByDate(@RequestHeader(value = "Authorization", required = true) String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseUtil.createResponse("Invalid Credentials", HttpStatus.FORBIDDEN);
        }

        String token = authHeader.substring(7);

        String email = jwtUtil.getEmailFromToken(token);

        if (!jwtUtil.validateToken(token)) {
            return ResponseUtil.createResponse("Token expired or invalid", HttpStatus.FORBIDDEN);
        }
        if (email == null) {
            return ResponseUtil.createResponse("Invalid user", HttpStatus.FORBIDDEN);
        }
        Map<LocalDate, Long> counts = prescriptionService.countPrescriptionsByDate();
        if(counts.isEmpty()){
            return ResponseUtil.createResponse("No prescriptions found",HttpStatus.OK);
        }
        return ResponseUtil.createResponse("prescription fetched successfully",HttpStatus.OK,counts);
    }
    @GetMapping
    public ResponseEntity<?>getAllPrescription(@RequestHeader(value = "Authorization", required = true) String authHeader){
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseUtil.createResponse("Invalid Credentials", HttpStatus.FORBIDDEN);
        }

        String token = authHeader.substring(7);

        String email = jwtUtil.getEmailFromToken(token);

        if (!jwtUtil.validateToken(token)) {
            return ResponseUtil.createResponse("Token expired or invalid", HttpStatus.FORBIDDEN);
        }
        if (email == null) {
            return ResponseUtil.createResponse("Invalid user", HttpStatus.FORBIDDEN);
        }
        List<Prescription> prescriptions = prescriptionService.getAllPrescriptions();
        if(prescriptions.isEmpty()){
            return ResponseUtil.createResponse("No prescriptions found",HttpStatus.OK);
        }
        return ResponseUtil.createResponse("all prescriptions fetched successfully",HttpStatus.OK,prescriptions);
    }
    @GetMapping("/current-month")
    public ResponseEntity<?>getCurrentMonthPrescriptions(@RequestHeader(value = "Authorization", required = true) String authHeader){
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseUtil.createResponse("Invalid Credentials", HttpStatus.FORBIDDEN);
        }

        String token = authHeader.substring(7);

        String email = jwtUtil.getEmailFromToken(token);

        if (!jwtUtil.validateToken(token)) {
            return ResponseUtil.createResponse("Token expired or invalid", HttpStatus.FORBIDDEN);
        }
        if (email == null) {
            return ResponseUtil.createResponse("Invalid user", HttpStatus.FORBIDDEN);
        }
        List<Prescription> prescriptions = prescriptionService.getCurrentMonthPrescriptions();
        if(prescriptions.isEmpty()){
            return ResponseUtil.createResponse("No prescriptions found",HttpStatus.OK);
        }
        return ResponseUtil.createResponse("all prescriptions fetched successfully for this month",HttpStatus.OK,prescriptions);
    }
    @GetMapping("/date-range")
    public ResponseEntity<?> getDateRangeBasedPrescriptions(
            @RequestHeader(value = "Authorization", required = true) String authHeader,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseUtil.createResponse("Invalid Credentials", HttpStatus.FORBIDDEN);
        }

        String token = authHeader.substring(7);

        String email = jwtUtil.getEmailFromToken(token);

        if (!jwtUtil.validateToken(token)) {
            return ResponseUtil.createResponse("Token expired or invalid", HttpStatus.FORBIDDEN);
        }
        if (email == null) {
            return ResponseUtil.createResponse("Invalid user", HttpStatus.FORBIDDEN);
        }

        List<Prescription> prescriptions = prescriptionService.getDateRangeBasedPrescriptions(startDate, endDate);
        if (prescriptions.isEmpty()) {
            return ResponseUtil.createResponse("No prescriptions found", HttpStatus.OK);
        }
        return ResponseUtil.createResponse("prescriptions fetched from "+startDate+"to"+endDate+"successfully", HttpStatus.OK, prescriptions);
    }
}
