package com.oauth2.sample.domain.friend.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.oauth2.sample.web.security.dto.User;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Friend {
    private String id;
    private String email;
    private String name;
    private String realname;
    private String profileImageUrl;
    private String message;
    private String roomId;
    @JsonIgnore
    private FriendStatus status;
}
