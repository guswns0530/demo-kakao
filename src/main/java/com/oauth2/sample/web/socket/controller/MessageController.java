package com.oauth2.sample.web.socket.controller;

import com.oauth2.sample.web.socket.dto.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import javax.websocket.server.PathParam;

@Slf4j
@Controller
@RequiredArgsConstructor
public class MessageController {

    private final SimpMessagingTemplate template;

    @MessageMapping("/chat/enter")
    public void broadcasting(Message message) {
        message.setMessage(message.getWriter() + "님이 채팅방에 참여하였습니다.");
        template.convertAndSend("/sub/chat/room/" + message.getRoomId(), message);
    }

    @MessageMapping("/chat/message")
    public void message(Message message) {
        template.convertAndSend("/sub/chat/room/" + message.getRoomId(), message);
    }
}
