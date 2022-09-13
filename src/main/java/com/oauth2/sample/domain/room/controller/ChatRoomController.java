package com.oauth2.sample.domain.room.controller;

import com.oauth2.sample.domain.room.dto.ChatRoom;
import com.oauth2.sample.domain.room.repository.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/chat")
@Slf4j
public class ChatRoomController {

private final ChatRoomRepository chatRoomRepository;

    //채팅방 목록 조회
    @GetMapping(value = "/rooms")
    public Object rooms(){
        log.info("# All Chat Rooms");
        List<ChatRoom> allRooms = chatRoomRepository.findAllRooms();

        return allRooms;
    }

    //채팅방 개설
    @PostMapping(value = "/room")
    public Object create(@RequestParam String name){
        ChatRoom chatRoom = chatRoomRepository.createChatRoom(name);

        return chatRoom;
    }

    //채팅방 조회
    @GetMapping("/room")
    public Object getRoom(String roomId){
        log.info("# get Chat Room, roomID : " + roomId);
        ChatRoom chatRoom = chatRoomRepository.findRoomById(roomId);

        return chatRoom;
    }
}