package com.example.demo.prescription;

import com.example.demo.response.ResponseUtil;
import com.example.demo.user.UserRepository;
import com.example.demo.user.utils.JWTUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Tag(name = "Prescription APIs", description = "Endpoints for managing prescriptions such as create, update, delete, and fetch by date range.")
@RestController
@RequestMapping("/api/v1/prescriptions")
public class PrescriptionController {

    private final PrescriptionService prescriptionService;
    private final JWTUtil jwtUtil;

    public PrescriptionController(PrescriptionService prescriptionService, JWTUtil jwtUtil) {
        this.prescriptionService = prescriptionService;
        this.jwtUtil = jwtUtil;
    }

    @Operation(
            summary = "Create a new prescription",
            description = "Creates a prescription record for a patient. Requires JWT authentication."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Prescription created successfully"),
            @ApiResponse(responseCode = "401", description = "Unauthorized — missing or invalid JWT token"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @PostMapping("/create")
    public ResponseEntity<?> createPrescription(
            @RequestBody Prescription prescription,
            @RequestHeader(value = "Authorization") String authHeader) {

        try {
            Prescription newPrescription = prescriptionService.createPrescription(prescription);

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

            return ResponseUtil.createResponse("Prescription created successfully", HttpStatus.CREATED, prescriptionData);

        } catch (Exception e) {
            return ResponseUtil.createResponse("Error creating prescription: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "Get prescription by ID", description = "Fetches a prescription record by its unique ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Prescription fetched successfully"),
            @ApiResponse(responseCode = "404", description = "Prescription not found")
    })
    @GetMapping("/{id}")
    public ResponseEntity<?> getPrescriptionById(
            @Parameter(description = "Prescription ID", example = "1") @PathVariable Long id,
            @RequestHeader(value = "Authorization") String authHeader) {
        try {
            Prescription prescription = prescriptionService.getPrescriptionById(id);
            return ResponseUtil.createResponse("Prescription fetched successfully", HttpStatus.OK, prescription);
        } catch (IllegalArgumentException e) {
            return ResponseUtil.createResponse(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @Operation(summary = "Update prescription", description = "Updates existing prescription fields.")
    @ApiResponse(responseCode = "200", description = "Prescription updated successfully")
    @PatchMapping("/{id}")
    public ResponseEntity<?> updatePrescription(
            @PathVariable Long id,
            @RequestBody Prescription updatedFields,
            @RequestHeader(value = "Authorization") String authHeader) {

        try {
            Prescription updated = prescriptionService.updatePrescription(id, updatedFields);
            return ResponseUtil.createResponse("Prescription updated successfully", HttpStatus.OK, updated);
        } catch (Exception e) {
            return ResponseUtil.createResponse("Error: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "Delete prescription", description = "Deletes a prescription record by its ID.")
    @ApiResponse(responseCode = "200", description = "Prescription deleted successfully")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePrescription(
            @PathVariable Long id,
            @RequestHeader(value = "Authorization") String authHeader) {

        try {
            prescriptionService.deletePrescription(id);
            return ResponseUtil.createResponse("Prescription deleted successfully", HttpStatus.OK);
        } catch (Exception e) {
            return ResponseUtil.createResponse("Error deleting prescription: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "Get day-wise prescription count", description = "Returns the count of prescriptions grouped by date.")
    @ApiResponse(responseCode = "200", description = "Prescription count fetched successfully")
    @GetMapping("/count-by-date")
    public ResponseEntity<?> getPrescriptionCountByDate(
            @RequestHeader(value = "Authorization") String authHeader) {

        Map<LocalDate, Long> counts = prescriptionService.countPrescriptionsByDate();
        return ResponseUtil.createResponse("Prescription count fetched successfully", HttpStatus.OK, counts);
    }

    @Operation(summary = "Get all prescriptions", description = "Returns all prescriptions from the database.")
    @GetMapping
    public ResponseEntity<?> getAllPrescriptions(@RequestHeader(value = "Authorization") String authHeader) {
        List<Prescription> prescriptions = prescriptionService.getAllPrescriptions();
        return ResponseUtil.createResponse("All prescriptions fetched successfully", HttpStatus.OK, prescriptions);
    }

    @Operation(summary = "Get current month prescriptions", description = "Fetches all prescriptions created in the current month.")
    @GetMapping("/current-month")
    public ResponseEntity<?> getCurrentMonthPrescriptions(@RequestHeader(value = "Authorization") String authHeader) {
        List<Prescription> prescriptions = prescriptionService.getCurrentMonthPrescriptions();
        return ResponseUtil.createResponse("Prescriptions fetched for current month", HttpStatus.OK, prescriptions);
    }

    @Operation(summary = "Get prescriptions by date range", description = "Fetches all prescriptions between the specified start and end date.")
    @GetMapping("/date-range")
    public ResponseEntity<?> getDateRangeBasedPrescriptions(
            @RequestHeader(value = "Authorization") String authHeader,
            @Parameter(description = "Start date in ISO format (YYYY-MM-DD)") @RequestParam @Schema(example = "2025-11-01") LocalDate startDate,
            @Parameter(description = "End date in ISO format (YYYY-MM-DD)") @RequestParam @Schema(example = "2025-11-15") LocalDate endDate) {

        List<Prescription> prescriptions = prescriptionService.getDateRangeBasedPrescriptions(startDate, endDate);
        return ResponseUtil.createResponse("Prescriptions fetched from " + startDate + " to " + endDate, HttpStatus.OK, prescriptions);
    }
}
