package com.oauth2.sample.domain.room.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum RoomType {
    PERSON(1),
    GROUP(2);
    private final int typeCode;
}
