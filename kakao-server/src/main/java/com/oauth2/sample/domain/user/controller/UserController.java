package com.oauth2.sample.domain.user.controller;

import com.oauth2.sample.domain.user.request.SelectListRequest;
import com.oauth2.sample.domain.user.request.UpdateUserRequest;
import com.oauth2.sample.domain.user.service.UserService;
import com.oauth2.sample.web.payload.ApiResponse;
import com.oauth2.sample.web.security.annotation.CurrentUser;
import com.oauth2.sample.web.security.principal.UserPrincipal;
import com.oauth2.sample.web.security.dto.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.reflection.ArrayUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.websocket.server.PathParam;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    @GetMapping
    public ResponseEntity<?> getCurrentUser(@CurrentUser UserPrincipal user) {
        User selectUser = userService.selectUserToEmail(user.getEmail());

        return ResponseEntity.status(HttpStatus.OK).body(
                ApiResponse.builder()
                        .code(HttpStatus.OK)
                        .data(selectUser)
                        .build()
        );
    }

    @GetMapping("/{id}/id")
    public ResponseEntity<?> getUserToId(@CurrentUser UserPrincipal user, @PathVariable String id) {
        User selectUser = userService.selectUserToId(user.getEmail(), id);

        return ResponseEntity.status(HttpStatus.OK).body(
                ApiResponse.builder()
                        .code(HttpStatus.OK)
                        .data(selectUser)
                        .build()
        );
    }

    @GetMapping("/{email}/email")
    public ResponseEntity<?> getUserToEmail(@CurrentUser UserPrincipal user, @PathVariable String email) {
        User selectUser = userService.selectUserToEmail(user.getEmail(), email);

        return ResponseEntity.status(HttpStatus.OK).body(
                ApiResponse.builder()
                        .code(HttpStatus.OK)
                        .data(selectUser)
                        .build()
        );
    }

    @PostMapping("/list")
    public ResponseEntity getUsersToEmail(@CurrentUser UserPrincipal user, @RequestBody SelectListRequest request) {

        List<User> listUser = request.getList().stream().map(email -> {
            return userService.selectUserToEmail(user.getEmail(), email);
        }).collect(Collectors.toList());


        return ResponseEntity.status(HttpStatus.OK).body(
                ApiResponse.builder()
                        .code(HttpStatus.OK)
                        .data(listUser)
                        .build()
        );
    }

    @PutMapping
    public ResponseEntity<?> updateUser(@CurrentUser UserPrincipal user, @Valid @ModelAttribute UpdateUserRequest updateUserRequest) {
        User updateUser = userService.updateUserToEmail(user.getEmail(), updateUserRequest);

        return ResponseEntity.status(HttpStatus.ACCEPTED).body(
                ApiResponse.builder()
                        .code(HttpStatus.ACCEPTED)
                        .data(updateUser)
                        .build()
        );
    }

    @DeleteMapping
    public ResponseEntity<?> deleteUser(@CurrentUser UserPrincipal user) {
        userService.deleteUserToEmail(user.getEmail());

        return ResponseEntity.accepted().body(
                ApiResponse.builder()
                        .code(HttpStatus.ACCEPTED)
                        .data(true)
                        .build()
        );
    }
}
