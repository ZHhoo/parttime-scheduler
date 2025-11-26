package com.zhhoo.demo.controller;

import com.zhhoo.demo.dto.LoginRequest;
import com.zhhoo.demo.dto.LoginResponse;
import com.zhhoo.demo.domain.User;
import com.zhhoo.demo.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(
        origins = {
                "http://localhost:3000",
                "https://zhhoo.github.io"
        })
@RestController
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {

        User user = userRepository.findById(1L)
                .orElseThrow(() -> new RuntimeException("id=1 사용자 없음"));

        return ResponseEntity.ok(LoginResponse.from(user));
    }
}
