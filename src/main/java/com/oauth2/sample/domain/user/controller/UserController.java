package com.oauth2.sample.domain.user.controller;

import com.oauth2.sample.domain.user.repository.UserRepository;
import com.oauth2.sample.domain.user.request.UpdateUserRequest;
import com.oauth2.sample.web.security.CurrentUser;
import com.oauth2.sample.web.security.UserPrincipal;
import com.oauth2.sample.web.security.dto.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserRepository userRepository;

    @GetMapping("/")
    @PreAuthorize("hasRole('USER')")
    public User getCurrentUser(@CurrentUser UserPrincipal user) {
        return userRepository.findByEmail(user.getEmail()).orElseThrow(() -> new IllegalStateException("not found user"));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public User getUser(@PathVariable String id) {
        return userRepository.findById(id).orElseThrow(() -> new IllegalStateException("not found user"));
    }

    @PutMapping("/")
    public User updateUser(@CurrentUser UserPrincipal user, @Valid @RequestBody UpdateUserRequest updateUserRequest) {
        updateUserRequest.setEmail(user.getEmail());

        return userRepository.updateUser(updateUserRequest).orElseThrow(() -> new IllegalStateException("not found user"));
    }
}
