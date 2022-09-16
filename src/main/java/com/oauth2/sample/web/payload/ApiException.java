package com.oauth2.sample.web.payload;

import lombok.Builder;
import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
public class ApiException {
    private int code;
    private String message;

    @Builder
    public ApiException(HttpStatus code, String message) {
        this.code = code.value();
        this.message = message;
    }
}
