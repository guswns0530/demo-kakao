package com.oauth2.sample.web.security.jwt;

import com.oauth2.sample.domain.user.repository.UserRepository;
import com.oauth2.sample.web.config.AppProperties;
import com.oauth2.sample.web.security.dto.UserStatus;
import com.oauth2.sample.web.security.exception.BadRequestException;
import com.oauth2.sample.web.security.principal.UserPrincipal;
import com.oauth2.sample.web.security.util.CookieUtils;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class JwtTokenProvider {
    private final AppProperties appProperties;
    private final UserRepository userRepository;

    private String AUTHORITIES_KEY = "role";

    public String createAccessToken(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + appProperties.getAuth().getAccessTokenExpireLength());

        String email = userPrincipal.getEmail();
        String role = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));
        Key key = getKey();

        return Jwts.builder()
                .signWith(key, SignatureAlgorithm.HS512)
                .setSubject(email)
                .claim(AUTHORITIES_KEY, role)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .compact();
    }

    public void createRefreshToken(Authentication authentication, HttpServletResponse response) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + appProperties.getAuth().getRefreshTokenExpireLength());

        UserPrincipal user = (UserPrincipal) authentication.getPrincipal();

        String email = user.getEmail();
        String role = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));
        Key key = getKey();

        String refreshToken = Jwts.builder()
                .signWith(key, SignatureAlgorithm.HS512)
                .setSubject(email)
                .claim(AUTHORITIES_KEY, role)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .compact();

        saveRefreshToken(authentication, refreshToken);

        String name = appProperties.getAuth().getRefreshCookieKey();
        Long maxAge = appProperties.getAuth().getRefreshTokenExpireLength() / 1000;
        String domain = appProperties.getCors().getDomain();

        CookieUtils.addCookie(response, name, refreshToken, maxAge.intValue(), domain);
    }

    private void saveRefreshToken(Authentication authentication, String refreshToken) {
        UserPrincipal user = (UserPrincipal) authentication.getPrincipal();
        String email = user.getEmail();

        userRepository.updateRefreshToken(email, refreshToken);
    }

    public Authentication getAuthentication(String accessToken) {
        Claims claims = parseClaims(accessToken);

        Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(","))
                        .map(SimpleGrantedAuthority::new).collect(Collectors.toList());

        UserPrincipal principal = new UserPrincipal(String.valueOf(claims.getSubject()), "", UserStatus.ACCOUNT, authorities);

        return new UsernamePasswordAuthenticationToken(principal, "", authorities);
    }

    private Claims parseClaims(String accessToken) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(getKey())
                    .build()
                    .parseClaimsJws(accessToken)
                    .getBody();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        } catch (Exception e) {
            throw new BadRequestException("잘못된 JWT 토큰 값입니다.");
        }
    }

    public boolean validateToken(String authToken) {
        try {
            Jwts.parserBuilder().setSigningKey(getKey()).build().parseClaimsJws(authToken);

            return true;
        } catch (SignatureException ex) {
            log.error("유효하지 않은 JWT 서명");
        } catch (MalformedJwtException ex) {
            log.error("유효하지 않은 JWT 토큰");
        } catch (ExpiredJwtException ex) {
            log.error("만료된 JWT 토큰");
        } catch (IllegalArgumentException ex) {
            log.error("비어있는 JWT");
        }

        return false;
    }

    public String getEmailFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(getKey()).build()
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }


    private Key getKey() {
        String secretKey = appProperties.getAuth().getTokenSecret();
        Key key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));

        return key;
    }
}
