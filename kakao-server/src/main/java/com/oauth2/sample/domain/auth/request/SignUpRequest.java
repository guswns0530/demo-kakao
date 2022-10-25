package com.oauth2.sample.domain.auth.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.*;

@Getter
@Setter
public class SignUpRequest {

    @NotBlank
    @Size(min = 1, max = 10)
    private String name;

    @NotBlank
    private String password;
}
