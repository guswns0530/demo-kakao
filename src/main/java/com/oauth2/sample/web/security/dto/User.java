package com.oauth2.sample.web.security.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class User implements Serializable {
    private String id;
    private String email;
    private String name;
    private String imageUrl;
    private String message;
    @JsonIgnore
    private String password;
    private AuthProvider provider;
    @JsonIgnore
    private String providerId;
    @JsonIgnore
    private UserStatus status;
    @JsonIgnore
    private String refreshToken;
    private Role role;
}
