package com.oauth2.sample.web.socket.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Message {
    private String roomId;
    private String writer;
    private String message;
}
