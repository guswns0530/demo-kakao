package com.oauth2.sample.domain.friend.request;

import com.oauth2.sample.domain.friend.dto.FriendStatus;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Null;

@Getter
@Setter
public class UpdateFriendRequest {

    @Null(message = "잘못된 접근입니다.")
    private String fromId;

    @NotBlank(message = "필수값이 비어있습니다.")
    private String toId;

    private String nickname;
}
