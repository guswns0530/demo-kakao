package com.oauth2.sample.domain.chat.service;

import com.oauth2.sample.domain.chat.dto.Chat;
import com.oauth2.sample.domain.chat.dto.ChatType;
import com.oauth2.sample.domain.chat.repository.ChatRepository;
import com.oauth2.sample.domain.chat.request.InsertChatRequest;
import com.oauth2.sample.domain.room.repository.RoomRepository;
import com.oauth2.sample.web.security.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatRepository chatRepository;
    private final RoomRepository roomRepository;

    public Chat insertChatText(InsertChatRequest request, String email) {
        Chat chat = Chat.builder()
                .email(email)
                .roomId(request.getRoomId())
                .content(request.getContent())
                .chatType(ChatType.TEXT)
                .build();
        boolean insertChatResult = chatRepository.insertChat(chat);

        if(!insertChatResult) {
            throw new BadRequestException("메시지 전달에 실패하였습니다.");
        }

        return chat;
    }
}
