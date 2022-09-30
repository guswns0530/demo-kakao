package com.oauth2.sample.domain.chat.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Chat {

    private String chatId;

    private String email;

    private String roomId;

    private ChatType chatType;

    private String content;

    private String createAt;

    @Builder
    public Chat(String email, String roomId, ChatType chatType, String content, String createAt) {
        this.email = email;
        this.roomId = roomId;
        this.chatType = chatType;
        this.content = content;
        this.createAt = createAt;
    }
}
