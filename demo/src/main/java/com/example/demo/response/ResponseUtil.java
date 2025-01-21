package com.example.demo.response;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;
@Component
public class ResponseUtil {

    public static ResponseEntity<Map<String, Object>> createResponse(String message, HttpStatus status, Object data) {
        Map<String, Object> response = new HashMap<>();
        response.put("message", message);
        response.put("status", status.value());

        // Only add "data" if it's not empty
        if (data != null && !data.equals(Map.of())) {
            response.put("data", data);
        }

        return ResponseEntity.status(status).body(response);
    }

    public static ResponseEntity<Map<String, Object>> createResponse(String message, HttpStatus status) {
        return createResponse(message, status, null);
    }
}
