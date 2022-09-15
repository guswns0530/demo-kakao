package com.oauth2.sample.domain.auth.controller;

import com.oauth2.sample.domain.auth.request.LoginRequest;
import com.oauth2.sample.domain.auth.request.SignUpRequest;
import com.oauth2.sample.domain.auth.service.AuthService;
import com.oauth2.sample.web.security.dto.User;
import com.oauth2.sample.web.security.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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
        String accessToken = authService.refreshTokenToAccessToken(request, response, oldAccessToken);

        return ResponseEntity.ok().body(accessToken);
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid  @RequestBody LoginRequest loginRequest) {
        String token = authService.authenticationUser(loginRequest);

        return ResponseEntity.ok().body(token);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
        User user = authService.registerUser(signUpRequest);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/user/me")
                .buildAndExpand(user.getId()).toUri();

        return ResponseEntity.created(location).body("");
    }
}
