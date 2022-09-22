package com.oauth2.sample.domain.friend.controller;

import com.oauth2.sample.domain.friend.dto.Friend;
import com.oauth2.sample.domain.friend.service.FriendService;
import com.oauth2.sample.web.payload.ApiResponse;
import com.oauth2.sample.web.security.annotation.CurrentUser;
import com.oauth2.sample.web.security.principal.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/friends")
@RequiredArgsConstructor
public class FriendController {
    private final FriendService friendService;

    @GetMapping
    public ResponseEntity<?> selectFriendList(@CurrentUser UserPrincipal user) {
        List<Friend> friends = friendService.selectFriendListToEmail(user.getEmail());

        ApiResponse apiResponse = ApiResponse.builder()
                .code(HttpStatus.OK)
                .data(friends)
                .build();

        return ResponseEntity.ok().body(apiResponse);
    }

    @GetMapping("/added-me")
    public ResponseEntity<?> selectAddedMeFriendList(@CurrentUser UserPrincipal user) {
        List<Friend> friends = friendService.selectAddedMeFriendListToEmail(user.getEmail());

        ApiResponse apiResponse = ApiResponse.builder()
                .code(HttpStatus.OK)
                .data(friends)
                .build();

        return ResponseEntity.ok().body(apiResponse);
    }

    @GetMapping("/block-list")
    public ResponseEntity<?> selectBlockList(@CurrentUser UserPrincipal user) {
        List<Friend> friends = friendService.selectBlockListToEmail(user.getEmail());

        ApiResponse apiResponse = ApiResponse.builder()
                .code(HttpStatus.OK)
                .data(friends)
                .build();

        return ResponseEntity.ok().body(apiResponse);
    }

    @PostMapping
    public ResponseEntity<?> insertFriend(@CurrentUser UserPrincipal user)
}
