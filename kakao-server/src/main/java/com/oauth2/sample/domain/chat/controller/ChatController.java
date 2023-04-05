package com.oauth2.sample.domain.chat.controller;

import com.oauth2.sample.domain.chat.dto.Chat;
import com.oauth2.sample.domain.chat.request.*;
import com.oauth2.sample.domain.chat.service.ChatService;
import com.oauth2.sample.web.payload.ApiResponse;
import com.oauth2.sample.web.security.annotation.CurrentUser;
import com.oauth2.sample.web.security.principal.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/chats")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    @GetMapping("/{roomId}/load/{chatId}")
    public ResponseEntity<?> selectChatListLoad(@CurrentUser UserPrincipal user, @PathVariable String roomId, @PathVariable String chatId) {
        SelectChatListRequest selectChatListRequest = SelectChatListRequest.builder()
                .chatId(chatId)
                .roomId(roomId)
                .email(user.getEmail())
                .build();

        return selectChatList(selectChatListRequest);
    }

    @GetMapping("/{roomId}/load")
    public ResponseEntity<?> selectChatListLoad(@CurrentUser UserPrincipal user, @PathVariable String roomId) {
        SelectChatListRequest selectChatListRequest = SelectChatListRequest.builder()
                .chatId("999999999999")
                .roomId(roomId)
                .email(user.getEmail())
                .build();

        return selectChatList(selectChatListRequest);
    }

    private ResponseEntity<?> selectChatList(SelectChatListRequest selectChatListRequest) {
        List<Chat> list = chatService.selectChatList(selectChatListRequest);

        ApiResponse<Object> apiResponse = ApiResponse.builder()
                .code(HttpStatus.OK)
                .data(list)
                .build();

        return ResponseEntity.ok().body(apiResponse);
    }

    @PostMapping
    public ResponseEntity<?> insertChatText(@CurrentUser UserPrincipal user, @Valid @RequestBody InsertChatRequest insertChatRequest) {
        Chat chat = chatService.insertChatText(insertChatRequest, user.getEmail());

        ApiResponse apiResponse = ApiResponse.builder()
                .code(HttpStatus.CREATED)
                .data(chat)
                .build();

        return ResponseEntity.ok().body(apiResponse);
    }

    @PostMapping("/{roomId}/read")
    public ResponseEntity<?> readChat(@CurrentUser UserPrincipal user, @PathVariable String roomId) {
        ReadChatRequest readChatRequest = ReadChatRequest.builder()
                .roomId(roomId)
                .email(user.getEmail())
                .build();

        chatService.readChat(readChatRequest);

        ApiResponse apiResponse = ApiResponse.builder()
                .code(HttpStatus.ACCEPTED)
                .data(true)
                .build();

        return ResponseEntity.status(HttpStatus.ACCEPTED).body(apiResponse);
    }

    @DeleteMapping("/{roomId}/{chatId}")
    public ResponseEntity<?> removeChat(@CurrentUser UserPrincipal user, @PathVariable String roomId, @PathVariable String chatId) {
        RemoveChatRequest removeChatRequest = RemoveChatRequest.builder()
                .chatId(chatId)
                .roomId(roomId)
                .email(user.getEmail())
                .build();

        chatService.removeChat(removeChatRequest);

        ApiResponse apiResponse = ApiResponse.builder()
                .code(HttpStatus.ACCEPTED)
                .data(chatId)
                .build();

        return ResponseEntity.status(HttpStatus.ACCEPTED).body(apiResponse);
    }
}

