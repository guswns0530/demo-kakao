package com.oauth2.sample.domain.friend.controller;

import com.oauth2.sample.domain.friend.dto.Friend;
import com.oauth2.sample.domain.friend.service.FriendService;
import com.oauth2.sample.web.payload.ApiResponse;
import com.oauth2.sample.web.security.annotation.CurrentUser;
import com.oauth2.sample.web.security.exception.BadRequestException;
import com.oauth2.sample.web.security.principal.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
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

    @PostMapping("/{param}")
    public ResponseEntity<?> insertFriend(@CurrentUser UserPrincipal user, @PathVariable String param, @RequestParam("option") String option) {
        if(!StringUtils.hasText(option)) {
            throw new BadRequestException("옵션을 지정해주세요");
        }

        if(option.equalsIgnoreCase("email")) {
            friendService.insertFriendToEmail(user.getEmail(), param);
        } else if(option.equalsIgnoreCase("id")) {
            friendService.insertFriendToId(user.getEmail(), param);
        } else {
            throw new BadRequestException("옵션을 지정해주세요");
        }


        ApiResponse apiResponse = ApiResponse.builder()
                .code(HttpStatus.CREATED)
                .data(true)
                .build();

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/user")
                .buildAndExpand("id").toUri();

        return ResponseEntity.created(location).body(
                apiResponse
        );
    }

    @DeleteMapping("/{email}/remove")
    public ResponseEntity removeFriend(@CurrentUser UserPrincipal user, @PathVariable String email) {
        boolean result = friendService.removeFriend(user.getEmail(), email);

        ApiResponse apiResponse = ApiResponse.builder()
                .code(HttpStatus.OK)
                .data(result)
                .build();

        return ResponseEntity.ok().body(apiResponse);
    }

    @DeleteMapping("/{email}/block")
    public ResponseEntity blockFriend(@CurrentUser UserPrincipal user, @PathVariable String email) {

        boolean result = friendService.blockFriend(user.getEmail(), email);

        ApiResponse apiResponse = ApiResponse.builder()
                .code(HttpStatus.OK)
                .data(result)
                .build();

        return ResponseEntity.ok().body(apiResponse);
    }
}
