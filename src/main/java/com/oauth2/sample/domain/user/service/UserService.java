package com.oauth2.sample.domain.user.service;

import com.oauth2.sample.domain.friend.dto.Friend;
import com.oauth2.sample.domain.friend.dto.FriendStatus;
import com.oauth2.sample.domain.friend.repository.FriendRepository;
import com.oauth2.sample.domain.user.repository.UserRepository;
import com.oauth2.sample.domain.user.request.UpdateUserRequest;
import com.oauth2.sample.web.security.dto.User;
import com.oauth2.sample.web.security.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataAccessResourceFailureException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final FriendRepository friendRepository;

    public User selectUserToEmail(String email) {
        Optional<User> userOf = userRepository.findByEmail(email);
        User user = userOf.orElseThrow(() -> {
            throw new IllegalStateException("유저를 찾지 못하였습니다.");
        });

        return user;
    }

    public User selectUserToId(String email, String id) {
        Optional<User> userOf = userRepository.findById(id);
        User user = userOf.orElseThrow(() -> {
            throw new IllegalStateException("유저를 찾지 못하였습니다.");
        });

        friendRepository.selectFriend(email, user.getEmail()).ifPresent(friend -> {
            user.setMessage(friend.getMessage());
            user.setProfileImageUrl(friend.getProfileImageUrl());
            switch (friend.getStatus()) {
                case FRIEND:
                    user.setName(friend.getName());
                    break;
            }
        });

        return user;
    }

    public User updateUserToEmail(String email, UpdateUserRequest updateUserRequest) {
        updateUserRequest.setEmail(email);
        boolean result = false;

        try {
            result = userRepository.updateUserToEmail(updateUserRequest);
        } catch (DuplicateKeyException ex) {
            throw new BadRequestException("이미 사용중인 아이디입니다.");
        }
        Optional<User> user = Optional.empty();

        if (result) {
            user = userRepository.findByEmail(email);
        } else {
            throw new DataAccessResourceFailureException("정보 업데이트에 실패하였습니다.");
        }

        user.orElseThrow(() -> {
            throw new DataAccessResourceFailureException("유저를 찾지 못하였습니다.");
        });


        return user.get();
    }

    public void deleteUserToEmail(String email) {
        boolean result = userRepository.deleteUser(email);

        if (!result) {
            throw new DataAccessResourceFailureException("탈퇴 처리를 실패하였습니다.");
        }
    }
}
