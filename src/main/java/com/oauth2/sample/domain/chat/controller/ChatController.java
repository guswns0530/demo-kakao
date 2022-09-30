package com.oauth2.sample.domain.chat.controller;

import com.oauth2.sample.domain.chat.dto.Chat;
import com.oauth2.sample.domain.chat.dto.ChatType;
import com.oauth2.sample.domain.chat.request.InsertChatRequest;
import com.oauth2.sample.domain.chat.service.ChatService;
import com.oauth2.sample.web.payload.ApiResponse;
import com.oauth2.sample.web.security.annotation.CurrentUser;
import com.oauth2.sample.web.security.principal.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;

@RestController
@RequestMapping("/chat")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    @GetMapping("/{roomId}")
    public ResponseEntity<?> selectChatList(@CurrentUser UserPrincipal user, @PathVariable String roomId) {
        return ResponseEntity.ok().body("");
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

    @PostMapping("/{roomId}/update")
    public ResponseEntity<?> insertChatFileUpload(@CurrentUser UserPrincipal user, @PathVariable String roomId, @RequestPart MultipartFile file) {
        return ResponseEntity.ok().body("");
    }

    @PostMapping("/{roomId}/read")
    public ResponseEntity<?> readChat(@CurrentUser UserPrincipal user, @PathVariable String roomId) {
        return ResponseEntity.ok().body("");
    }

    @DeleteMapping("/{roomId}/{chatId}")
    public ResponseEntity<?> removeChat(@CurrentUser UserPrincipal user, @PathVariable String roomId, @PathVariable String chatId) {
        return ResponseEntity.ok().body("");
    }
}
