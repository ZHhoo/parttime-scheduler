package com.zhhoo.demo.config;

import com.zhhoo.demo.domain.User;
import com.zhhoo.demo.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;

    public DataInitializer(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) {
        Optional<User> existing = userRepository.findByLoginId("test");
        if (existing.isEmpty()) {
            User u = new User();
            u.setLoginId("test");
            u.setPassword("1234");
            u.setName("테스트유저");
            u.setRole("USER");
            userRepository.save(u);

            System.out.println(">>> 기본 유저 생성됨: loginId=test, password=1234");
        } else {
            System.out.println(">>> 기본 유저 이미 존재: loginId=test");
        }
    }
}
