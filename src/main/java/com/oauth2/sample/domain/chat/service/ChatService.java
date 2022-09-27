package com.oauth2.sample.domain.chat.service;

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
    private final RoomRepository  roomRepository;

    public void insertChatText(InsertChatRequest request) {
        boolean existUser = roomRepository.existUser(request.getRoomId(), request.getEmail());

        if(!existUser) {
            throw new BadRequestException("잘못된 접근입니다.");
        }

        boolean result = chatRepository.insertChat(request);

        if(!result) {
          throw new BadRequestException("채팅을 보내는중 오류가 발생하였습니다.");
        }
    }
}
