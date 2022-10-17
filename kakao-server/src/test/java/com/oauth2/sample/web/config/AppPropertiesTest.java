package com.oauth2.sample.web.config;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class AppPropertiesTest {

    @Autowired
    public AppProperties appProperties;

    @Test
    void getAuth() {
        AppProperties.Auth auth = appProperties.getAuth();

        System.out.println("auth.getTokenSecret() = " + auth.getTokenSecret());
        System.out.println("auth.tokenExpirationMsec() = " + auth.getAccessTokenExpireLength());
        System.out.println("auth.tokenExpirationMsec() = " + auth.getRefreshTokenExpireLength());
        System.out.println("auth = " + auth.getRefreshCookieKey());
    }

    @Test
    void getOauth2() {
        AppProperties.OAuth2 oauth2 = appProperties.getOauth2();

        System.out.println("oauth2.getAuthorizedRedirectUris() = " + oauth2.getAuthorizedRedirectUris());
    }
}