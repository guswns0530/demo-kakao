package com.oauth2.sample.domain.user.request;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.Null;

@Getter
@Setter
public class UpdateUserRequest {
    private String id;

    private String name;

    private MultipartFile profileImageFile;

    private MultipartFile backgroundImageFile;

    @Null(message = "잘못된 접근입니다.")
    private String profileImage;

    private String backgroundImage;

    private String message;

    @Null( message = "잘못된 접근입니다.")
    private String email;
}
