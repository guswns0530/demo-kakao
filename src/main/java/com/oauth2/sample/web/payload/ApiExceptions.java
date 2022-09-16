package com.oauth2.sample.web.payload;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@Setter
public class ApiExceptions<T> {
    private int code;
    private String message;
    private T errors;

    @Builder
    public ApiExceptions(HttpStatus code, String message, T errors) {
        this.code = code.value();
        this.message = message;
        this.errors = errors;
    }
}
