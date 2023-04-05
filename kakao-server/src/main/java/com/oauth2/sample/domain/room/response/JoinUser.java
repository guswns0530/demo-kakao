package com.oauth2.sample.domain.room.response;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class JoinUser {
    private String id;
    private String email;
    private String name;
    private String profileImageUrl;
    private String message;
    private String provider;
    private String lastReadChat;
    private String friendStatus;
    private String roomStatus;
}