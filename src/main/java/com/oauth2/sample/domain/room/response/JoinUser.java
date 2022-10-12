package com.oauth2.sample.domain.room.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JoinUser {
    private String id;
    private String email;
    private String name;
    private String imageUrl;
    private String message;
    private String provider;
    private String lastReadChat;
}
