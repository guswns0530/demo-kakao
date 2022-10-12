package com.oauth2.sample.domain.chat.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class Chat {

    private String chatId;
    private String roomId;
    private String email;
    private String content;
    private ChatType chatType;
    private ChatStatus chatStatus;


    private String createAt;

    @Builder
    public Chat(String email, String roomId, ChatType chatType, String content, String createAt, ChatStatus chatStatus) {
        this.email = email;
        this.roomId = roomId;
        this.chatType = chatType;
        this.content = content;
        this.createAt = createAt;
        this.chatStatus = chatStatus;
    }
}
