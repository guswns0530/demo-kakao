package com.oauth2.sample.web.security.repository;

import com.oauth2.sample.web.security.dto.User;

import java.sql.SQLException;
import java.util.Optional;

public interface UserRepository {
    Optional<User> findByEmail(String email);
    Boolean existByEmail(String email);
    Optional<User> findById(String id);
    User save(User user);
    String getRefreshTokenById(String id);
    void updateRefreshToken(String id, String token);

}
