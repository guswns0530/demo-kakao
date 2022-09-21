package com.oauth2.sample.web.security.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum UserStatus {
    ACCOUNT(1),
    WITHDRAWAL(2);

    private final int statusCode;

    public static UserStatus lookup(int code) {
        for(UserStatus element : UserStatus.values()) {
            if(element.getStatusCode() == code) {
                return element;
            }
        }

        return null;
    }
}
