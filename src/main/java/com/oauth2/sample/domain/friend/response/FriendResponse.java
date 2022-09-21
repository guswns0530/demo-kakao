package com.oauth2.sample.domain.friend.response;

import com.oauth2.sample.web.security.dto.User;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class FriendResponse implements Serializable {
    private User user;
    private String nickname;

    @Builder
    public FriendResponse(User user, String nickname) {
        this.user = user;
        this.nickname = nickname;
    }
}
