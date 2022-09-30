package com.oauth2.sample.domain.room.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class InviteUserToRoom {
    private String roomId;
    private String email;
    private String createAt;
}
