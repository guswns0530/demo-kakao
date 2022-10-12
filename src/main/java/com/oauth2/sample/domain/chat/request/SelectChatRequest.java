package com.oauth2.sample.domain.chat.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class SelectChatRequest {
    private String roomId;
    private String email;
    private String chatId;

    public static SelectChatRequest selectChatRequest(RemoveChatRequest request) {

        return SelectChatRequest.builder()
                .roomId(request.getRoomId())
                .email(request.getEmail())
                .chatId(request.getChatId())
                .build();
    }
}
