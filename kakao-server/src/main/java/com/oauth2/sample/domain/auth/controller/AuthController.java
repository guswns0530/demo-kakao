package com.oauth2.sample.domain.auth.controller;

import com.oauth2.sample.domain.auth.response.AuthResponse;
import com.oauth2.sample.domain.auth.request.LoginRequest;
import com.oauth2.sample.domain.auth.request.SignUpRequest;
import com.oauth2.sample.domain.auth.service.AuthService;
import com.oauth2.sample.domain.email.service.EmailConfirmService;
import com.oauth2.sample.web.payload.ApiResponse;
import com.oauth2.sample.web.security.dto.User;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.mail.Session;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.net.URI;

@Controller
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;
    private final EmailConfirmService emailConfirmService;

    // 토큰 재발급
    @PostMapping("/refresh")
    public ResponseEntity refreshToken(HttpServletRequest request, HttpServletResponse response, @RequestBody String oldAccessToken) {
        oldAccessToken = oldAccessToken.substring(0, oldAccessToken.length() - 1);
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
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest, HttpSession session) {
        User user = authService.registerUser(signUpRequest, session);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/user")
                .buildAndExpand(user.getId()).toUri();

        ApiResponse<Object> response = ApiResponse.builder()
                .code(HttpStatus.CREATED)
                .data(user)
                .build();

        return ResponseEntity.created(location).body(response);
    }

    @GetMapping("/{email}")
    public ResponseEntity<?> getEmailConfirmToken(@PathVariable String email, HttpSession session) {
        emailConfirmService.createEmailConfirmToken(email, session);

        ApiResponse<Object> apiResponse = ApiResponse.builder()
                .code(HttpStatus.OK)
                .data(true)
                .build();

        return ResponseEntity.ok().body(apiResponse);
    }

    @PostMapping("/email-confirm")
    public ResponseEntity<?> checkEmailConfirmToken(@RequestBody String confirmToken, HttpSession session) {
        confirmToken = confirmToken.substring(0, confirmToken.length() - 1);
        emailConfirmService.checkEmailConfirmToken(confirmToken, session);

        ApiResponse<Object> apiResponse = ApiResponse.builder()
                .code(HttpStatus.OK)
                .data(true)
                .build();

        return ResponseEntity.ok().body(apiResponse);
    }
}
