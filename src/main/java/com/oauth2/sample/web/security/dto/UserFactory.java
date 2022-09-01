package com.oauth2.sample.web.security.dto;

import io.jsonwebtoken.lang.Strings;
import org.springframework.util.StringUtils;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public class UserFactory {
    public static User getUser(Map<String, String> map) {
        UserStatus status = null;
        AuthProvider authProvider = null;

        System.out.println("map = " + map);

        switch (Optional.ofNullable(map.get("STATUS")).orElse("")) {
            case "1":
                status = UserStatus.ACCOUNT;
                break;
            case "2":
                status = UserStatus.WITHDRAWAL;
                break;
        }

        switch (Optional.ofNullable(map.get("PROVIDER")).orElse("")) {
            case "kakao":
                authProvider = AuthProvider.kakao;
                break;
            case "local":
                authProvider = AuthProvider.local;
                break;
        }

        return User.builder()
                .id(map.get("USER_ID"))
                .password(map.get("PASSWORD"))
                .email(map.get("EMAIL"))
                .imageUrl(map.get("PROFILE_IMAGE_URL"))
                .status(status).provider(authProvider)
                .providerId(map.get("PROVIDER_ID"))
                .name(map.get("NAME"))
                .build();
    }
}
