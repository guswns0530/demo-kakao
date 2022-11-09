package com.oauth2.sample.domain.user.service;

import com.oauth2.sample.domain.file.service.FileService;
import com.oauth2.sample.domain.friend.dto.Friend;
import com.oauth2.sample.domain.friend.dto.FriendStatus;
import com.oauth2.sample.domain.friend.repository.FriendRepository;
import com.oauth2.sample.domain.user.repository.UserRepository;
import com.oauth2.sample.domain.user.request.UpdateUserRequest;
import com.oauth2.sample.web.security.dto.User;
import com.oauth2.sample.web.security.exception.BadRequestException;
import jdk.jfr.ContentType;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataAccessResourceFailureException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.awt.*;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final FriendRepository friendRepository;

    private Map<String, MediaType> mediaTypeMap;

    private final FileService fileService;

    @PostConstruct
    public void init() {
        mediaTypeMap = new HashMap<>();
        mediaTypeMap.put(MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_JPEG);
        mediaTypeMap.put(MediaType.IMAGE_GIF_VALUE, MediaType.IMAGE_GIF);
        mediaTypeMap.put(MediaType.IMAGE_PNG_VALUE, MediaType.IMAGE_PNG);
    }

    public User selectUserToEmail(String email) {
        Optional<User> userOf = userRepository.findByEmail(email);
        User user = userOf.orElseThrow(() -> {
            throw new IllegalStateException("유저를 찾지 못하였습니다.");
        });

        return user;
    }

    public User selectUserToEmail(String email, String targetEmail) {
        Optional<User> userOf = userRepository.findByEmail(targetEmail);
        User user = userOf.orElseThrow(() -> {
            throw new IllegalStateException("유저를 찾지 못하였습니다.");
        });

        updateUserToFriend(email, user);

        return user;
    }

    private void updateUserToFriend(String email, User user) {
        friendRepository.selectFriend(email, user.getEmail()).ifPresent(friend -> {
            user.setMessage(friend.getMessage());
            user.setProfileImageUrl(friend.getProfileImageUrl());
            user.setFriendStatus(friend.getStatus());
            switch (friend.getStatus()) {
                case FRIEND:
                    user.setName(friend.getName());
                    break;
            }
        });
    }

    public User selectUserToId(String email, String id) {
        Optional<User> userOf = userRepository.findById(id);
        User user = userOf.orElseThrow(() -> {
            throw new IllegalStateException("유저를 찾지 못하였습니다.");
        });

        updateUserToFriend(email, user);

        return user;
    }

    public User updateUserToEmail(String email, UpdateUserRequest updateUserRequest) {
        updateUserRequest.setEmail(email);
        boolean result = false;

        try {
            if(updateUserRequest.getProfileImageFile() != null && !updateUserRequest.getProfileImageFile().isEmpty()) {
                MultipartFile file = updateUserRequest.getProfileImageFile();

                String contentType = file.getContentType();
                if( mediaTypeMap.get(contentType) != null ) {
                    String path = fileService.uploadFile(email, file);

                    updateUserRequest.setProfileImage(path);
                }
                else {
                    throw new BadRequestException("이미지 타입의 파일이 아닙니다.");
                }
                updateUserRequest.setProfileImageFile(null);
                updateUserRequest.setRemoveProfileImage(false);
            } else if(updateUserRequest.getRemoveProfileImage()) {
                updateUserRequest.setProfileImage(Math.floor(Math.random() * 5) + "");
            }
            result = userRepository.updateUserToEmail(updateUserRequest);
        } catch (DuplicateKeyException ex) {
            throw new BadRequestException("이미 사용중인 아이디입니다.");
        } catch (IOException e) {
            throw new RuntimeException("파일 업로드중에 오류가 발생하였습니다.");
        } catch (Exception ex) {
            throw new BadRequestException(ex.getMessage());
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
