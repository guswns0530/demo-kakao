package com.oauth2.sample.web.security.repository;

import com.oauth2.sample.web.security.dto.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class UserRepositoryImplTest {
    @Autowired
    private UserRepository userRepository;

    @Test
    void findByEmail() {
        Optional<User> user = userRepository.findByEmail("wooae1234@gmail.com");

        System.out.println(user.get());
    }

    @Test
    void existByEmail() {
        Boolean aBoolean = userRepository.existByEmail("1@gmail.com");

        System.out.println("aBoolean = " + aBoolean);
    }

    @Test
    void findById() {
    }

    @Test
    void save() {
    }
}