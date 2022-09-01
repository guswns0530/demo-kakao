package com.oauth2.sample.web.security.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@Builder
public class User implements Serializable {
    private String id;
    private String name;
    private String email;
    private String imageUrl;
    private Role role;
    @JsonIgnore
    private String password;
    private AuthProvider provider;
    private String providerId;
    private UserStatus status;

    public void setProvider(String provider) {
        if(provider.equalsIgnoreCase(AuthProvider.kakao.name())) {
            this.provider = AuthProvider.kakao;
        } else if(provider.equalsIgnoreCase(AuthProvider.local.name())) {
            this.provider = AuthProvider.local;
        }
    }

    public void setUserStatus(int statusCode) {
        if(statusCode == UserStatus.ACCOUNT.getStatusCode()) {
            this.status = UserStatus.ACCOUNT;
        } else if(statusCode == UserStatus.WITHDRAWAL.getStatusCode()) {
            this.status = UserStatus.WITHDRAWAL;
        }
    }


    public User update(String name, String imageUrl) {
        this.name = name;
        this.imageUrl = imageUrl;

        return this;
    }
}
