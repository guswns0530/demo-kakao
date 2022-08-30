package com.oauth2.sample.domain.user.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;

@Getter
public class User {
    private Long id;
    private String name;
    private String email;
    private String imageUrl;
    private Role role;
    private Boolean emailVerified = false;
    @JsonIgnore
    private String password;
    private AuthProvider provider;
    private String providerId;
}
