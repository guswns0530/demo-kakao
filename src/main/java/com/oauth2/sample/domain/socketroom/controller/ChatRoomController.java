package com.oauth2.sample.domain.socketroom.controller;

import com.oauth2.sample.domain.socketroom.dto.ChatRoom;
import com.oauth2.sample.domain.socketroom.repository.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/chat", produces = "application/json")
@Slf4j
public class ChatRoomController {

private final ChatRoomRepository chatRoomRepository;

    //채팅방 목록 조회
    @GetMapping(value = "/rooms")
    public Object rooms(){
        List<ChatRoom> allRooms = chatRoomRepository.findAllRooms();
        Collections.reverse(allRooms);

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
        ChatRoom chatRoom = chatRoomRepository.findRoomById(roomId);

        return chatRoom;
    }
}