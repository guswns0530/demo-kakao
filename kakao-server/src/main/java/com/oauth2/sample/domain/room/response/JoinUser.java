package com.oauth2.sample.domain.room.response;

import com.oauth2.sample.domain.friend.dto.FriendStatus;
import com.oauth2.sample.domain.room.dto.RoomStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
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
