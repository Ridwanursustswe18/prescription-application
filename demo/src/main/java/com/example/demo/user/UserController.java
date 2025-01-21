package com.example.demo.user;

import com.example.demo.response.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("api/v1/users")
@CrossOrigin(origins = "*") // Add if you need CORS support
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/create")
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
