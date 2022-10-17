package com.oauth2.sample.domain.room.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Null;

@Getter
@Setter
@Builder
public class UpdateRoomRequest {
    @Null(message = "잘못된 접근입니다")
    private String roomId;

    @Null(message = "잘못된 접근입니다")
    private String email;

    @NotBlank(message = "필수값이 비어있습니다.")
    private String roomName;
}
