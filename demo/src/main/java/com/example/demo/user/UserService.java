package com.example.demo.user;

import com.example.demo.user.utils.JWTUtil;
import com.example.demo.user.utils.PasswordEncoderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private final JWTUtil jwtUtil;
    private final UserRepository userRepository;
    private final PasswordEncoderService passwordEncoderService;

    public UserService(JWTUtil jwtUtil, UserRepository userRepository, PasswordEncoderService passwordEncoderService) {
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
        this.passwordEncoderService = passwordEncoderService;
    }

    public User createUser(User user) {
        user.setPassword(passwordEncoderService.encodePassword(user.getPassword()));
        userRepository.save(user);

        return user;
    }
    public String login(User user) throws Exception {
        User fetchUser = userRepository.findByEmail(user.getEmail())
                .orElseThrow(() -> new Exception("User not found"));

        if (!passwordEncoderService.matches(user.getPassword(), fetchUser.getPassword())) {
            throw new Exception("Invalid credentials");
        }
        System.out.println(jwtUtil);

        return jwtUtil.generateToken(fetchUser.getEmail());
    }
}
