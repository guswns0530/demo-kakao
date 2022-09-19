package com.oauth2.sample.domain.user.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Null;

@Getter
@Setter
public class UpdateUserRequest {
    @Null
    private String userId;

    @Null
    private String name;

    @Null
    private String profileImage;

    @Null
    private String backgroundImage;

    @Null
    private String email;
}
