package com.oauth2.sample.web.security.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.oauth2.sample.domain.friend.dto.FriendStatus;
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
    private String profileImageUrl;
    private String message;
    private String roomId;
    @JsonIgnore
    private String password;
    private AuthProvider provider;
    @JsonIgnore
    private String providerId;
    @JsonIgnore
    private UserStatus status;
    @JsonIgnore
    private String refreshToken;
    @JsonIgnore
    private Role role;
    private FriendStatus friendStatus = FriendStatus.NONE;
}
