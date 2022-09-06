package com.oauth2.sample.domain.auth.controller;

import com.oauth2.sample.domain.auth.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;

    // 토큰 재발급
    @PostMapping("/refresh")
    public ResponseEntity refreshToken(HttpServletRequest request, HttpServletResponse response, @RequestBody String oldAccessToken) {
        String accessToken = authService.refreshTokenToAccessToken(request, response, oldAccessToken);
        System.out.println("accessToken = " + accessToken);

        return ResponseEntity.ok().body(accessToken);
    }
}
