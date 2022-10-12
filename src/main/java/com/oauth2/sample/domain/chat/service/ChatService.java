package com.oauth2.sample.domain.chat.service;

import com.oauth2.sample.domain.chat.dto.Chat;
import com.oauth2.sample.domain.chat.dto.ChatStatus;
import com.oauth2.sample.domain.chat.dto.ChatType;
import com.oauth2.sample.domain.chat.repository.ChatRepository;
import com.oauth2.sample.domain.chat.request.InsertChatRequest;
import com.oauth2.sample.domain.chat.request.RemoveChatRequest;
import com.oauth2.sample.domain.chat.request.SelectChatRequest;
import com.oauth2.sample.domain.room.repository.RoomRepository;
import com.oauth2.sample.web.security.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatRepository chatRepository;

    public Chat insertChatText(InsertChatRequest request, String email) {
        Chat chat = Chat.builder()
                .email(email)
                .roomId(request.getRoomId())
                .content(request.getContent())
                .chatType(ChatType.TEXT)
                .chatStatus(ChatStatus.EXIST)
                .build();
        boolean insertChatResult = chatRepository.insertChat(chat);

        if(!insertChatResult) {
            throw new BadRequestException("메시지 전달에 실패하였습니다.");
        }

        return chat;
    }

    public void removeChat(RemoveChatRequest removeChatRequest) {
        Optional<Chat> chatOf = chatRepository.selectChat(SelectChatRequest.selectChatRequest(removeChatRequest));
        chatOf.orElseThrow(() -> {
            throw new BadRequestException("잘못된 접근입니다.");
        });

        Chat chat = chatOf.get();
        ChatType chatType = chat.getChatType();

        if(chatType != ChatType.TEXT || chatType != ChatType.FILE) {
            throw new BadRequestException("삭제할 수 없는 채팅유형입니다.");
        }

        boolean result = chatRepository.removeChat(removeChatRequest);
        if(!result) {
            throw new BadRequestException("삭제중 오류가 발생하였습니다.");
        }
    }
}
