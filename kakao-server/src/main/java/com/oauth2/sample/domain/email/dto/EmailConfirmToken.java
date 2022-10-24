package com.oauth2.sample.domain.email.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Random;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmailConfirmToken {

    private static final long EMAIL_TOKEN_EXPIRATION_TIME_VALUE = 5L;	//토큰 만료 시간
    public static final String EMAIL_TOKEN_SESSION_KEY = "SESSION_EMAIL_TOKEN";
    private String id;
    private String email;
    private boolean check;
    private LocalDateTime expirationDate;

    public static EmailConfirmToken createEmailConfirmToken(String email) {

        Random rand = new Random();
        String id = "";

        for(int i = 0; i < 7; i++) {
            id += Integer.toString(rand.nextInt(9));
        }

        return  EmailConfirmToken.builder()
                .expirationDate(LocalDateTime.now().plusMinutes(EMAIL_TOKEN_EXPIRATION_TIME_VALUE))
                .email(email)
                .id(id)
                .check(false)
                .build();
    }

    public boolean isExpired() {
        return LocalDateTime.now().isAfter(expirationDate);
    }

    public void useToken() {
        this.check = true;
    }
}
