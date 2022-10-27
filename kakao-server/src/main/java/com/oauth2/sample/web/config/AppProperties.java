package com.oauth2.sample.web.config;

import lombok.*;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.List;

@Getter
@Configuration
@ConfigurationProperties(prefix = "app")
public class AppProperties {
    private final Auth auth = new Auth();
    private final OAuth2 oauth2 = new OAuth2();
    private final Cors cors = new Cors();
    private final FileS

    @Data
    @RequiredArgsConstructor
    public static class Auth {
        private String tokenSecret;
        private Long accessTokenExpireLength ;
        private Long refreshTokenExpireLength;
        private String refreshCookieKey;
    }

    @Data
    @RequiredArgsConstructor
    public static final class OAuth2 {
        private List<String> authorizedRedirectUris = new ArrayList<>();
    }

    @Data
    @RequiredArgsConstructor
    public final class Cors {
        private ArrayList<String> allowedOrigins = new ArrayList<>();
        private String domain;
    }
}
