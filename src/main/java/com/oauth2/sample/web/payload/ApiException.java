package com.oauth2.sample.web.payload;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@Setter
public class ApiException {
    private int code;
    private String message;

    @Builder
    public ApiException(HttpStatus code, String message) {
        this.code = code.value();
        this.message = message;
    }
}
