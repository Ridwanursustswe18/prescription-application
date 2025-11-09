package com.example.demo.user;

import com.example.demo.response.ResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
@Tag(name = "User APIs",description = "Endpoints for managing users such as registration,login")
@RestController
@RequestMapping("api/v1/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;
    @Operation(
            summary = "Creates a new User"
    )
    @PostMapping("/register")
    public ResponseEntity<?> createUser(@RequestBody User user) {
        try {
            User createdUser = userService.createUser(user);
            Map<String, Object> userData = Map.of(
                    "id", createdUser.getId(),
                    "name", createdUser.getName(),
                    "email", createdUser.getEmail()
            );
            return ResponseUtil.createResponse(
                    "User created successfully",
                    HttpStatus.CREATED,
                    userData
            );
        } catch (Exception e) {
            return ResponseUtil.createResponse(
                    "Failed to create user: " + e.getMessage(),
                    HttpStatus.BAD_REQUEST,
                    null
            );
        }
    }
    @Operation(summary = "login of a user",description = "User will be logged in and will be returned with a JWT token")
    @PostMapping("/login")
    public ResponseEntity<?> userLogin(@RequestBody User user) {
        try {
            String token = userService.login(user);
            Map<String, Object> loginData = Map.of(
                    "token", token,
                    "email", user.getEmail()
            );
            return ResponseUtil.createResponse(
                    "Login successful",
                    HttpStatus.OK,
                    loginData
            );
        } catch (Exception e) {
            return ResponseUtil.createResponse(
                    "Login failed: " + e.getMessage(),
                    HttpStatus.UNAUTHORIZED,
                    null
            );
        }
    }
}
