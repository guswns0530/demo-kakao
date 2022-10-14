package com.oauth2.sample.domain.chat.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@Builder
public class SelectChatListRequest {
    @NotBlank(message = "필수값이 비어있습니다.")
    private String chatId;
    private String roomId;
    private String email;
    private SelectType selectType;

    public enum SelectType {
        RELOAD,
        LOAD
    }
}
