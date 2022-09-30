package com.oauth2.sample.domain.room.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Null;
import java.util.List;

@Getter
@Setter
@Builder
public class InviteRoomRequest {
    private String roomId;

    private String roomName;

    @Null(message = "잘못된 접근입니다.")
    private String fromEmail;

    @NotEmpty(message = "필수값이 비어있습니다.")
    private List<String> users;

}
