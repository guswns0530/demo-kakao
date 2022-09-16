package com.oauth2.sample.domain.auth.request;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.Max;
import javax.validation.constraints.NotBlank;

@Data
public class SignUpRequest {

    @NotBlank
    @Email
    private String email;

    @NotBlank
    @Max(50)
    private String name;

    @NotBlank
    private String password;
}
