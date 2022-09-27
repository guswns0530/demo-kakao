package com.oauth2.sample.domain.room.controller;

import com.oauth2.sample.domain.room.dto.RoomInfo;
import com.oauth2.sample.domain.room.dto.RoomInfoResponse;
import com.oauth2.sample.domain.room.service.RoomService;
import com.oauth2.sample.web.payload.ApiResponse;
import com.oauth2.sample.web.security.annotation.CurrentUser;
import com.oauth2.sample.web.security.principal.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rooms")
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    @GetMapping
    public ResponseEntity<?> selectRoomList(@CurrentUser UserPrincipal user) {
        List<RoomInfoResponse> roomInfoResponseList = roomService.selectRoomList(user.getEmail());

        ApiResponse<Object> apiResponse = ApiResponse.builder()
                .code(HttpStatus.OK)
                .data(roomInfoResponseList)
                .build();

        return ResponseEntity.ok().body(apiResponse);
    }

    @PutMapping("/{roomId}")
    public ResponseEntity<?> updateRoom(@CurrentUser UserPrincipal user, @PathVariable String roomId) {
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{roomId}")
    public ResponseEntity<?> leaveRoom(@CurrentUser UserPrincipal user, @PathVariable String roomId) {
        return ResponseEntity.ok().body("");
    }
}
