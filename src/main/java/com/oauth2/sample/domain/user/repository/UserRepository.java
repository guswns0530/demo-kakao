package com.oauth2.sample.domain.user.repository;

import com.oauth2.sample.domain.user.request.UpdateUserRequest;
import com.oauth2.sample.web.security.dto.User;

import java.util.Optional;

public interface UserRepository {
    Optional<User> findByEmail(String email);
    Boolean existByEmail(String email);
    Optional<User> findById(String id);
    User save(User user);
    String getRefreshTokenByEmail(String id);
    boolean updateRefreshToken(String id, String token);
    boolean deleteUser(String email);
    Optional<User> updateUser(UpdateUserRequest user);


}
