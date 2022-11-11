package com.oauth2.sample.domain.auth.service;

import com.oauth2.sample.domain.auth.request.LoginRequest;
import com.oauth2.sample.domain.auth.request.SignUpRequest;
import com.oauth2.sample.domain.email.dto.EmailConfirmToken;
import com.oauth2.sample.domain.user.repository.UserRepository;
import com.oauth2.sample.web.config.AppProperties;
import com.oauth2.sample.web.security.exception.OAuth2AuthenticationProcessingException;
import com.oauth2.sample.web.security.principal.UserPrincipal;
import com.oauth2.sample.web.security.dto.AuthProvider;
import com.oauth2.sample.web.security.dto.User;
import com.oauth2.sample.web.security.exception.BadRequestException;
import com.oauth2.sample.web.security.jwt.JwtTokenProvider;
import com.oauth2.sample.web.security.util.CookieUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    private final AppProperties appProperties;
    private final UserRepository userRepository;
    private final JwtTokenProvider tokenProvider;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;

    public String refreshTokenToAccessToken(HttpServletRequest request, HttpServletResponse response, String oldAccessToken) {
        String oldRefreshToken = CookieUtils.getCookie(request, appProperties.getAuth().getRefreshCookieKey())
                .map(Cookie::getValue).orElseThrow(() -> new RuntimeException("cookie가 존재하지 않습니다."));

        if (!tokenProvider.validateToken(oldRefreshToken)) {
            throw new OAuth2AuthenticationProcessingException("잘못된 refresh token 입니다.");
        }

        // 2. 유저정보 얻기
        Authentication authentication = tokenProvider.getAuthentication(oldAccessToken);
        UserPrincipal user = (UserPrincipal) authentication.getPrincipal();

        String email = user.getEmail();

        // 3. Match Refresh Token
        String savedToken = userRepository.getRefreshTokenByEmail(email);

        System.out.println("client token: oldRefreshToken = " + oldRefreshToken);
        System.out.println("db token: savedToken = " + savedToken);

        if (!savedToken.equals(oldRefreshToken)) {
//            throw new OAuth2AuthenticationProcessingException("Refresh Token이 매칭되지 않습니다");
            throw new BadRequestException("Refresh Token이 매칭되지 않습니다.");
        }

        // 4. JWT 갱신
        String accessToken = tokenProvider.createAccessToken(authentication);
        tokenProvider.createRefreshToken(authentication, response);

        return accessToken;
    }

    public String authenticationUser(LoginRequest loginRequest, HttpServletResponse response) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = tokenProvider.createAccessToken(authentication);
        tokenProvider.createRefreshToken(authentication, response);

        return token;
    }

    public User registerUser(SignUpRequest signUpRequest, HttpSession session) {
        Object object = session.getAttribute(EmailConfirmToken.EMAIL_TOKEN_SESSION_KEY);
        if(object == null) {
            throw new BadRequestException("잘못된 접근입니다.");
        }
        EmailConfirmToken emailConfirmToken = (EmailConfirmToken) object;
        
        if(!emailConfirmToken.isCheck()) {
            throw new BadRequestException("이메일 인증이 미완료 상태입니다.");
        }
        
        User result = userRepository.save(User.builder()
                .name(signUpRequest.getName())
                .email(emailConfirmToken.getEmail())
                .password(passwordEncoder.encode(signUpRequest.getPassword()))
                .profileImageUrl(Math.floor(Math.random() * 5) + "")
                .provider(AuthProvider.local)
                .build()
        );

        session.removeAttribute(EmailConfirmToken.EMAIL_TOKEN_SESSION_KEY);

        return result;
    }
}
