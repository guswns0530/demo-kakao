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
    @JsonIgnore
    private String providerId;
    @JsonIgnore
    private UserStatus status;
    @JsonIgnore
    private String refreshToken;
}
