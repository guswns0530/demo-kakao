package com.oauth2.sample.domain.room.repository;

import com.oauth2.sample.domain.room.dto.ChatRoom;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.util.*;

@Repository
public class ChatRoomRepository {
    private Map<String, ChatRoom> chatRoomMap;

    @PostConstruct
    private void init() {
        chatRoomMap = new LinkedHashMap<>();

        createChatRoom("1번방");
        createChatRoom("2번방");
        createChatRoom("3번방");
        createChatRoom("4번방");
        createChatRoom("5번방");
        createChatRoom("6번방");
        createChatRoom("7번방");
        createChatRoom("8번방");
        createChatRoom("9번방");
        createChatRoom("10번방");

    }

    public List<ChatRoom> findAllRooms() {
        List<ChatRoom> result = new ArrayList<>(chatRoomMap.values());
        Collections.reverse(result);

        return result;
    }

    public ChatRoom findRoomById(String id) {
        return chatRoomMap.get(id);
    }

    public ChatRoom createChatRoom(String name) {
        ChatRoom chatRoom = ChatRoom.createChatRoom(name);
        chatRoomMap.put(chatRoom.getRoomId(), chatRoom);

        return chatRoom;
    }
}
