package com.oauth2.sample.domain.friend.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum FriendStatus {
    NONE(0),
    FRIEND(1),
    BLOCK(2),
    REMOVE(3);

    private final int statusCode;

    public static FriendStatus lookUp(int statusCode) {
        for(FriendStatus element : FriendStatus.values()) {
            if(element.statusCode == statusCode) {
                return element;
            }
        }

        return null;
    }
}
