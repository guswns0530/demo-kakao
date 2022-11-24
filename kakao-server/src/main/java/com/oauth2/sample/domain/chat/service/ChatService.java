package com.oauth2.sample.domain.chat.service;

import com.oauth2.sample.domain.chat.dto.Chat;
import com.oauth2.sample.domain.chat.dto.ChatStatus;
import com.oauth2.sample.domain.chat.dto.ChatType;
import com.oauth2.sample.domain.chat.repository.ChatRepository;
import com.oauth2.sample.domain.chat.request.*;
import com.oauth2.sample.domain.room.repository.RoomRepository;
import com.oauth2.sample.domain.room.service.RoomService;
import com.oauth2.sample.web.security.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatRepository chatRepository;
    private final RoomRepository roomRepository;
    private final RoomService roomService;
    private final SimpMessagingTemplate messagingTemplate;

    public Chat insertChatText(InsertChatRequest request, String email) {
        SimpleDateFormat sdf = new SimpleDateFormat("YYYY-MM-dd HH:mm:ss");
        String nowStr = sdf.format(new Date());
        Chat chat = Chat.builder().email(email).roomId(request.getRoomId()).content(request.getContent()).chatType(ChatType.TEXT).chatStatus(ChatStatus.EXIST).createAt(nowStr).build();
        boolean insertChatResult = chatRepository.insertChat(chat);

        if (!insertChatResult) {
            throw new BadRequestException("메시지 전달에 실패하였습니다.");
        }

        roomRepository.selectJoinUser(request.getRoomId()).forEach(joinUserEmail -> {
            messagingTemplate.convertAndSend("/queue/chat/" + joinUserEmail  + "/chat", chat);
        });

        return chat;
    }

    public void removeChat(RemoveChatRequest removeChatRequest) {
        Optional<Chat> chatOf = chatRepository.selectChat(SelectChatRequest.selectChatRequest(removeChatRequest));
        chatOf.orElseThrow(() -> {
            throw new BadRequestException("잘못된 접근입니다.");
        });

        Chat chat = chatOf.get();
        ChatType chatType = chat.getChatType();

        if (chatType != ChatType.TEXT && chatType != ChatType.FILE) {
            throw new BadRequestException("삭제할 수 없는 채팅유형입니다.");
        }

        try {
            SimpleDateFormat sdf = new SimpleDateFormat("YYYY-MM-dd HH:mm:ss");
            Date createAt = sdf.parse(chat.getCreateAt());
            Date now = new Date();

            double compare = (now.getTime() - createAt.getTime()) / 1000 / 60;

            if (compare > 5) {
                throw new BadRequestException("5분이 지나 삭제할 수 없습니다.");
            }
        } catch (Exception ex) {
            throw new BadRequestException(ex.getMessage());
        }

        boolean result = chatRepository.removeChat(removeChatRequest);
        if (!result) {
            throw new BadRequestException("삭제중 오류가 발생하였습니다.");
        }
    }

    public void readChat(ReadChatRequest readChatRequest) {
        boolean result = chatRepository.readChat(readChatRequest);
        if (!result) {
            throw new BadRequestException("수신중 오류가 발생하였습니다.");
        }

        roomService.selectRoom(readChatRequest.getEmail(), readChatRequest.getRoomId()).getUsers().forEach(joinUser -> {
            messagingTemplate.convertAndSend("/queue/chat/" + joinUser.getEmail() + "/read", 1);
        });
    }

    public List<Chat> selectChatList(SelectChatListRequest selectChatListRequest) {
        List<Chat> list = chatRepository.selectChatList(selectChatListRequest);

        return list;
    }
}
