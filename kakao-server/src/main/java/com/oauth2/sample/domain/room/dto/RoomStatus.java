package com.oauth2.sample.domain.room.dto;

import com.oauth2.sample.domain.chat.dto.ChatStatus;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum RoomStatus {
    EXIST(1),
    REMOVE(2);

    private final int statusCode;

    public static RoomStatus lookUp(int statusCode) {
        for(RoomStatus element : RoomStatus.values()) {
            if(element.statusCode == statusCode) {
                return element;
            }
        }

        return null;
    }
}
