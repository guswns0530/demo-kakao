package com.oauth2.sample.web.security.repository;

import com.oauth2.sample.web.security.dto.User;

import java.util.Optional;

public interface UserRepository {
    Optional<User> findByEmail(String email);
    Boolean existByEmail(String email);
    Optional<User> findById(String id);

    User save(User user);
}
