package com.oauth2.sample.domain.friend.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Null;

@Getter
@Setter
public class InsertFriendRequest {

    @Null(message = "잘못된 접근입니다.")
    private String fromId;

    @NotBlank(message = "필수 값입니다.")
    private String toId;
}
