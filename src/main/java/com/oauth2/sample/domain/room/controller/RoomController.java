package com.oauth2.sample.domain.room.controller;

import com.oauth2.sample.domain.room.service.RoomService;
import com.oauth2.sample.web.security.annotation.CurrentUser;
import com.oauth2.sample.web.security.principal.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rooms")
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    @GetMapping
    public ResponseEntity<?> selectRooms(@CurrentUser UserPrincipal user) {

        return ResponseEntity.ok().body("");
    }
}

/* chat room join -> {
    mod = RoomType.PERSON {

    }

    mod = RoomType.GROUP {
    }
 } */
