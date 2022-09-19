package com.oauth2.sample.domain.user.controller;

import com.oauth2.sample.domain.user.repository.UserRepository;
import com.oauth2.sample.domain.user.request.UpdateUserRequest;
import com.oauth2.sample.domain.user.service.UserService;
import com.oauth2.sample.web.payload.ApiResponse;
import com.oauth2.sample.web.security.CurrentUser;
import com.oauth2.sample.web.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    @GetMapping("/")
    public ResponseEntity<?> getCurrentUser(@CurrentUser UserPrincipal user) {
        ApiResponse apiResponse = userService.selectUserToEmail(user.getEmail());

        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUser(@PathVariable String id) {
        ApiResponse apiResponse = userService.selectUserToId(id);

        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @PutMapping("/")
    public ResponseEntity<?> updateUser(@CurrentUser UserPrincipal user, @Valid @RequestBody UpdateUserRequest updateUserRequest) {
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("aa");
    }
}
