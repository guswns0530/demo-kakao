package com.oauth2.sample.domain.user.repository;

import com.oauth2.sample.domain.user.dto.User;

import java.util.Optional;

public interface UserRepository {
    Optional<User> findByEmail(String email);
    Boolean existByEmail(String email);
}
