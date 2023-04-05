package com.oauth2.sample.domain.room.controller;

import com.oauth2.sample.domain.room.request.InviteRoomRequest;
import com.oauth2.sample.domain.room.request.UpdateRoomRequest;
import com.oauth2.sample.domain.room.response.RoomInfoResponse;
import com.oauth2.sample.domain.room.service.RoomService;
import com.oauth2.sample.web.payload.ApiResponse;
import com.oauth2.sample.web.security.annotation.CurrentUser;
import com.oauth2.sample.web.security.principal.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/rooms")
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;
    private final SimpMessagingTemplate messagingTemplate;

    @GetMapping
    public ResponseEntity<?> selectRoomList(@CurrentUser UserPrincipal user) {
        List<RoomInfoResponse> roomInfoResponseList = roomService.selectRoomList(user.getEmail());

        ApiResponse<Object> apiResponse = ApiResponse.builder()
                .code(HttpStatus.OK)
                .data(roomInfoResponseList)
                .build();

        return ResponseEntity.ok().body(apiResponse);
    }

    @GetMapping("/{roomId}")
    public ResponseEntity<?> selectRoom(@CurrentUser UserPrincipal user, @PathVariable String roomId) {
        String email = user.getEmail();
        RoomInfoResponse roomInfoResponse = null;

        if(email.equals(roomId)) {
            roomInfoResponse = roomService.selectMyRoom(email);
        } else {
            roomInfoResponse = roomService.selectRoom(email, roomId);
        }


        ApiResponse<Object> apiResponse = ApiResponse.builder()
                .code(HttpStatus.OK)
                .data(roomInfoResponse)
                .build();

        return ResponseEntity.ok().body(apiResponse);
    }

    @PostMapping
    public ResponseEntity<?> inviteUserToRoom(@CurrentUser UserPrincipal user, @Valid @RequestBody InviteRoomRequest inviteRoomRequest) {
        inviteRoomRequest.setFromEmail(user.getEmail());
        RoomInfoResponse room = roomService.inviteUserToRoom(inviteRoomRequest);

        ApiResponse apiResponse = ApiResponse.builder()
                .code(HttpStatus.ACCEPTED)
                .data(room)
                .build();

        return ResponseEntity.ok().body(apiResponse);
    }

    @DeleteMapping("/{roomId}")
    public ResponseEntity<?> leaveRoom(@CurrentUser UserPrincipal user, @PathVariable String roomId) {
        roomService.leaveRoom(roomId, user.getEmail());

        ApiResponse<Object> apiResponse = ApiResponse.builder()
                .code(HttpStatus.ACCEPTED)
                .data(roomId)
                .build();

        return ResponseEntity.ok().body(apiResponse);
    }

    @PutMapping("/{roomId}")
    public ResponseEntity<?> updateRoom(@CurrentUser UserPrincipal user, @PathVariable String roomId, @Valid @RequestBody UpdateRoomRequest updateRoomRequest) {
        updateRoomRequest.setEmail(user.getEmail());
        updateRoomRequest.setRoomId(roomId);

        roomService.updateRoom(updateRoomRequest);

        ApiResponse<Object> apiResponse = ApiResponse.builder()
                .code(HttpStatus.ACCEPTED)
                .data(true)
                .build();

        return ResponseEntity.ok().body(apiResponse);
    }

    @GetMapping("/reader/{roomId}")
    public ResponseEntity<?> getReaderUser(@CurrentUser UserPrincipal user, @PathVariable String roomId) {
        List<String> list = roomService.selectReader(user.getEmail(), roomId);

        ApiResponse<Object> apiResponse = ApiResponse.builder()
                .code(HttpStatus.OK)
                .data(list)
                .build();

        return ResponseEntity.ok().body(apiResponse);
    }
}
