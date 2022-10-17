package com.oauth2.sample.domain.chat.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ReadUser {
    private String email;
    private String roomId;
    private String chatId;
    private String createAt;
}
