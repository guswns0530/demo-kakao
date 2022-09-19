package com.oauth2.sample.domain.auth.controller;

import com.oauth2.sample.domain.auth.request.AuthResponse;
import com.oauth2.sample.domain.auth.request.LoginRequest;
import com.oauth2.sample.domain.auth.request.SignUpRequest;
import com.oauth2.sample.domain.auth.service.AuthService;
import com.oauth2.sample.web.payload.ApiResponse;
import com.oauth2.sample.web.security.dto.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.net.URI;

@Controller
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;

    // 토큰 재발급
    @PostMapping("/refresh")
    public ResponseEntity refreshToken(HttpServletRequest request, HttpServletResponse response, @RequestBody String oldAccessToken) {

        if(StringUtils.hasText(oldAccessToken) && oldAccessToken.startsWith("Bearer ")) {
            oldAccessToken = oldAccessToken.substring(7);
        }

        String accessToken = authService.refreshTokenToAccessToken(request, response, oldAccessToken);
        ApiResponse<Object> apiResponse = ApiResponse.builder()
                .code(HttpStatus.OK)
                .data(
                        AuthResponse.builder().accessToken(accessToken).build()
                )
                .build();

        return ResponseEntity.ok().body(apiResponse);
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid  @RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        String token = authService.authenticationUser(loginRequest, response);
        ApiResponse<Object> apiResponse = ApiResponse.builder()
                .code(HttpStatus.OK)
                .data(
                        AuthResponse.builder().accessToken(token).build()
                )
                .build();

        return ResponseEntity.ok().body(apiResponse);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
        User user = authService.registerUser(signUpRequest);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/user/me")
                .buildAndExpand(user.getId()).toUri();

        ApiResponse<Object> response = ApiResponse.builder()
                .code(HttpStatus.CREATED)
                .data(user)
                .build();

        return ResponseEntity.created(location).body(response);
    }
}
