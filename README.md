# Prescription Management API Documentation

## How to Run

### Backend
- Navigate to the backend directory.
- Open the project in any Java-supported IDE (e.g., IntelliJ, Eclipse) or run it via the command line.
- Execute the main function in the Spring Boot application.
- **Framework:** Spring Boot
- **Language:** Java

### Frontend
- Navigate to the frontend directory.
- Run the following commands:
  ```sh
  npm install
  npm run dev
  ```
- **Framework:** React
- **Language:** JavaScript

## Warning
- You can create a user from the provided Postman collection.

## Overview
The Prescription Management API provides secure access to prescription records. It allows user authentication via JWT tokens and supports operations such as fetching, creating, editing, and deleting prescriptions.

### Base URL
```
http://localhost:8080/api/v1
```

## Authentication
### User Login
**Endpoint:**
```
POST /login
```

**Request Body:**
```json
{
  "username": "user@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "token": "your_jwt_token"
}
```

**Error Cases:**
- `403 Forbidden`: Invalid credentials.
- `500 Internal Server Error`: Unexpected server failure.

## Prescription Endpoints

### 1. Fetch Current Month Prescriptions
**Endpoint:**
```
GET /prescriptions/current-month
```

**Response:**
```json
[
  { "id": 1, "medication": "Drug A", "date": "2025-01-10" }
]
```

**Error Cases:**
- `403 Forbidden`: Missing or invalid JWT token.
- `500 Internal Server Error`: Unexpected failure.

### 2. Fetch Prescriptions by Date Range
**Endpoint:**
```
GET /prescriptions?start_date=YYYY-MM-DD&end_date=YYYY-MM-DD
```

**Example:**
```
GET /prescriptions?start_date=2025-01-01&end_date=2025-01-15
```

**Response:**
```json
[
  { "id": 2, "medication": "Drug B", "date": "2025-01-05" }
]
```

**Error Cases:**
- `400 Bad Request`: Invalid or missing parameters.
- `403 Forbidden`: Missing or invalid JWT token.

### 3. Create a Prescription
**Endpoint:**
```
POST /prescriptions
```

**Request Body:**
```json
{
    "prescriptionDate": "2025-01-22",
    "patientName": "John Doe",
    "patientAge": 30,
    "patientGender": "male",
     "diagnosis": "Flu",
    "medicine": "Paracetamol",
    "nextDate": "2025-01-25"
}
```

**Response:**
```json
{    "id":1
    "prescriptionDate": "2025-01-22",
    "patientName": "John Doe",
    "patientAge": 30,
    "patientGender": "male",
     "diagnosis": "Flu",
    "medicine": "Paracetamol",
    "nextDate": "2025-01-25"
}```

**Error Cases:**
- `400 Bad Request`: Invalid input data.
- `403 Forbidden`: Missing or invalid JWT token.

### 4. Edit a Prescription
**Endpoint:**
```
PATCH /prescriptions/{id}
```

**Request Body:**
```json
{
    "diagnosis": "Cough",
    "medicine": "Napa"
}
```

**Response:**
```json
{
  "id":1
    "prescriptionDate": "2025-01-22",
    "patientName": "John Doe",
    "patientAge": 30,
    "patientGender": "male",
     "diagnosis": "Cough",
    "medicine": "Napa",
    "nextDate": "2025-01-25" 
}
```

**Error Cases:**
- `400 Bad Request`: Invalid input data.
- `403 Forbidden`: Missing or invalid JWT token.
- `404 Not Found`: Prescription not found.
```
### 5. Delete a Prescription
**Endpoint:**
```
DELETE /prescriptions/{id}
```

**Response:**
```json
{
  "message": "Prescription deleted successfully"
}
```

**Error Cases:**
- `403 Forbidden`: Missing or invalid JWT token.
- `404 Not Found`: Prescription not found.

### 6. Get All Prescriptions
**Endpoint:**
```
GET /prescriptions
```

**Response:**
```json
[
  {
  "id":1
    "prescriptionDate": "2025-01-22",
    "patientName": "John Doe",
    "patientAge": 30,
    "patientGender": "male",
     "diagnosis": "Flu",
    "medicine": "Napa",
    "nextDate": "2025-01-25" 
}

  {
  "id":2
    "prescriptionDate": "2025-01-22",
    "patientName": "John Doe",
    "patientAge": 30,
    "patientGender": "male",
     "diagnosis": "Cough",
    "medicine": "Napa",
    "nextDate": "2025-01-25" 
}
]
```

**Error Cases:**
- `403 Forbidden`: Missing or invalid JWT token.
### 6. Daliy Reort of prescription counts
**Endpoint:**
```
GET /prescriptions/count-by-date
```

**Response:**
```json
[
 {   "2025-01-10":3 },
  {  "2025-01-05":5 }
]
```

**Error Cases:**
- `403 Forbidden`: Missing or invalid JWT token.
### 6. Daliy Reort of prescription counts
**Endpoint:**
```

## Example Usage in Spring Java
```java
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

public class PrescriptionClient {
    private static final String BASE_URL = "https://api.example.com/v1";
    private static final String TOKEN = "your_jwt_token";

    public static void main(String[] args) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + TOKEN);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        // Fetch current month prescriptions
        ResponseEntity<String> response = restTemplate.exchange(
                BASE_URL + "/prescriptions/current-month", HttpMethod.GET, entity, String.class);
        System.out.println(response.getBody());

        // Create a new prescription
        String newPrescriptionJson = "{\"medication\": \"Drug C\", \"dosage\": \"1 tablet daily\", \"date\": \"2025-01-12\"}";
        HttpEntity<String> createEntity = new HttpEntity<>(newPrescriptionJson, headers);
        ResponseEntity<String> createResponse = restTemplate.exchange(
                BASE_URL + "/prescriptions", HttpMethod.POST, createEntity, String.class);
        System.out.println(createResponse.getBody());
    }
}
```

For support, contact `support@example.com`.

