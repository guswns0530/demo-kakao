package com.oauth2.sample.web.socket.controller;

import com.oauth2.sample.domain.chat.service.ChatService;
import com.oauth2.sample.web.socket.dto.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Slf4j
@Controller
@RequiredArgsConstructor
public class MessageController {

    private final SimpMessagingTemplate template;

    @MessageMapping("/chat/join")
    public void join(Message message) {
        message.setMessage(message.getWriter() + "님이 채팅방에 참여하였습니다.");
        message.setType(Message.MessageType.JOIN);

        template.convertAndSend("/queue/chat/room/" + message.getRoomId(), message);
    }

    @MessageMapping("/chat/leave")
    public void leave(Message message) {
        message.setMessage(message.getWriter() + "님이 채팅방에 나갔습니다.");
        message.setType(Message.MessageType.LEAVE);
        template.convertAndSend("/queue/chat/room/" + message.getRoomId(), message);
    }

    @MessageMapping("/chat/message")
    public void message(Message message) {
        message.setType(Message.MessageType.MESSAGE);
        template.convertAndSend("/queue/chat/room/" + message.getRoomId(), message);
    }
}
