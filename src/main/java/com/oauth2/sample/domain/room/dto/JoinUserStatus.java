package com.oauth2.sample.domain.room.dto;

import com.oauth2.sample.domain.chat.dto.ChatStatus;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum JoinUserStatus {
    JOIN(1),
    LEAVE(2);

    private final int statusCode;

    public static JoinUserStatus lookUp(int statusCode) {
        for(JoinUserStatus element : JoinUserStatus.values()) {
            if(element.statusCode == statusCode) {
                return element;
            }
        }

        return null;
    }
}
