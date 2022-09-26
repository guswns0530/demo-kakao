package com.oauth2.sample.domain.chat.controller;

import com.oauth2.sample.web.security.annotation.CurrentUser;
import com.oauth2.sample.web.security.principal.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/chat")
@RequiredArgsConstructor
public class ChatController {

    @GetMapping("/{roomId}")
    public ResponseEntity<?> selectChatList(@CurrentUser UserPrincipal userPrincipal, @PathVariable String roomId) {
        return ResponseEntity.ok().body("");
    }

    @PostMapping("/{roomId}")
    public ResponseEntity<?> insertChatText(@CurrentUser UserPrincipal userPrincipal, @PathVariable String roomId) {
        return ResponseEntity.ok().body("");
    }

    @PostMapping("/{roomId}/update")
    public ResponseEntity<?> insertChatFileUpload(@CurrentUser UserPrincipal userPrincipal, @PathVariable String roomId) {
        return ResponseEntity.ok().body("");
    }

    @PostMapping("/{roomId}/read")
    public ResponseEntity<?> readChat(@CurrentUser UserPrincipal userPrincipal, @PathVariable String roomId) {
        return ResponseEntity.ok().body("");
    }

    @DeleteMapping("/{roomId}/{chatId}")
    public ResponseEntity<?> removeChat(@CurrentUser UserPrincipal userPrincipal, @PathVariable String roomId, @PathVariable String chatId) {
        return ResponseEntity.ok().body("");
    }
}
