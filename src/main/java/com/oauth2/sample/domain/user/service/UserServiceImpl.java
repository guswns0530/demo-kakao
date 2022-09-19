package com.oauth2.sample.domain.user.service;

import com.oauth2.sample.domain.user.repository.UserRepository;
import com.oauth2.sample.web.payload.ApiResponse;
import com.oauth2.sample.web.security.dto.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;
    @Override
    public ApiResponse selectUserToEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);

        user.orElseThrow(() ->  { throw new IllegalStateException("유저를 찾지 못하였습니다."); });

        return ApiResponse.builder()
                .code(HttpStatus.OK)
                .data(user.get())
                .build();
    }

    @Override
    public ApiResponse selectUserToId(String id) {
        Optional<User> user = userRepository.findById(id);

        user.orElseThrow(() ->  { throw new IllegalStateException("유저를 찾지 못하였습니다."); });

        return ApiResponse.builder()
                .code(HttpStatus.OK)
                .data(user.get())
                .build();
    }
}
