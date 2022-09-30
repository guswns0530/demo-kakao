package com.oauth2.sample.domain.room.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class InsertRoom {
    private String roomId;
    private String roomName;
    private RoomType type;

    @Builder
    public InsertRoom(String roomName, RoomType type) {
        this.roomName = roomName;
        this.type = type;
    }
}
