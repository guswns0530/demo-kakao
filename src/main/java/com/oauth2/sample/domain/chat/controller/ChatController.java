package com.oauth2.sample.domain.chat.controller;

import com.oauth2.sample.domain.chat.dto.Chat;
import com.oauth2.sample.domain.chat.request.InsertChatRequest;
import com.oauth2.sample.domain.chat.request.ReadChatRequest;
import com.oauth2.sample.domain.chat.request.RemoveChatRequest;
import com.oauth2.sample.domain.chat.request.SelectChatRequest;
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

@RestController
@RequestMapping("/chats")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    @GetMapping("/{roomId}")
    public ResponseEntity<?> selectChatList(@CurrentUser UserPrincipal user, @PathVariable String roomId) {
        SelectChatRequest selectChatRequest = SelectChatRequest.builder()
                .roomId(roomId)
                .email(user.getEmail())
                .build();

        List<Chat> list = chatService.selectChatList(selectChatRequest);

        ApiResponse<Object> apiResponse = ApiResponse.builder()
                .code(HttpStatus.OK)
                .data(list)
                .build();

        return ResponseEntity.ok().body(apiResponse);
    }

//    @GetMapping("/{roomId}/{chatId}")
//    public ResponseEntity<?> selectChat(@CurrentUser UserPrincipal user, @PathVariable String roomId, String chatId) {
//        return ResponseEntity.ok().body("");
//    }

    @PostMapping
    public ResponseEntity<?> insertChatText(@CurrentUser UserPrincipal user, @Valid @RequestBody InsertChatRequest insertChatRequest) {
        Chat chat = chatService.insertChatText(insertChatRequest, user.getEmail());

        ApiResponse apiResponse = ApiResponse.builder()
                .code(HttpStatus.CREATED)
                .data(chat)
                .build();

        return ResponseEntity.ok().body(apiResponse);
    }

//    @PostMapping("/{roomId}/update")
//    public ResponseEntity<?> insertChatFileUpload(@CurrentUser UserPrincipal user, @PathVariable String roomId, @RequestPart MultipartFile file) {
//        return ResponseEntity.ok().body("");
//    }

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
                .data(true)
                .build();

        return ResponseEntity.status(HttpStatus.ACCEPTED).body(apiResponse);
    }
}

