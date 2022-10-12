package com.oauth2.sample.domain.chat.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class RemoveChatRequest {
    private String roomId;
    private String email;
    private String chatId;
}
