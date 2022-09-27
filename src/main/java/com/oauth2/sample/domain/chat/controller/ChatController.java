package com.oauth2.sample.domain.chat.controller;

import com.oauth2.sample.domain.chat.dto.ChatType;
import com.oauth2.sample.domain.chat.request.InsertChatRequest;
import com.oauth2.sample.domain.chat.service.ChatService;
import com.oauth2.sample.web.security.annotation.CurrentUser;
import com.oauth2.sample.web.security.principal.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    @PostMapping("/{roomId}")
    public ResponseEntity<?> insertChatText(@CurrentUser UserPrincipal user, @PathVariable String roomId, @RequestBody @NotBlank( message = "필수값이 비어있습니다.") String content) {
        InsertChatRequest request = InsertChatRequest.builder()
                .roomId(roomId)
                .email(user.getEmail())
                .chatType(ChatType.TEXT)
                .content(content)
                .build();

        chatService.insertChatText(request);

        return ResponseEntity.ok().body(true);
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
