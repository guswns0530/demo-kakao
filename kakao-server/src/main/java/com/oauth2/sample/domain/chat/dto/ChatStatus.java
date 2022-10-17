package com.oauth2.sample.domain.chat.dto;

import com.fasterxml.jackson.annotation.JsonValue;
import com.oauth2.sample.domain.friend.dto.FriendStatus;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ChatStatus {
    EXIST(1),
    REMOVE(2);

    @JsonValue
    private final int statusCode;

    public static ChatStatus lookUp(int statusCode) {
        for(ChatStatus element : ChatStatus.values()) {
            if(element.statusCode == statusCode) {
                return element;
            }
        }

        return null;
    }

    @Override
    public String toString() {
        return statusCode + "";
    }
}
