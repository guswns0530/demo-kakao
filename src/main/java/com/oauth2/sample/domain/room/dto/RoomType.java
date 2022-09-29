package com.oauth2.sample.domain.room.dto;

import com.fasterxml.jackson.annotation.JsonValue;
import com.oauth2.sample.domain.chat.dto.ChatStatus;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum RoomType {
    PERSON(1),
    GROUP(2);

    @JsonValue
    private final int typeCode;

    public static RoomType lookUp(int statusCode) {
        for(RoomType element : RoomType.values()) {
            if(element.typeCode == statusCode) {
                return element;
            }
        }

        return null;
    }
}
