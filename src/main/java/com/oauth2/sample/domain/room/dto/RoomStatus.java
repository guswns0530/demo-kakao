package com.oauth2.sample.domain.room.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum RoomStatus {
    JOIN(1),
    LEAVE(2);

    private final int statusCode;
}
