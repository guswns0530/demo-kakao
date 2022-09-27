package com.oauth2.sample.domain.chat.request;

import com.oauth2.sample.domain.chat.dto.ChatType;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Null;

@Getter
@Setter
@Builder
public class InsertChatRequest {
    @Null( message = "잘못된 접근입니다.")
    private String email;

    private String roomId;

    private ChatType chatType;

    private String content;
}
