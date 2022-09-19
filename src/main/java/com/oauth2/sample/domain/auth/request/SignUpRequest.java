package com.oauth2.sample.domain.auth.request;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.*;

@Getter
@Setter
public class SignUpRequest {

    @NotBlank
    @Email
    private String email;

    @NotBlank
    @Size(min = 1, max = 20)
    private String name;

    @NotBlank
    private String password;
}
