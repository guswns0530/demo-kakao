package com.oauth2.sample.web.payload;

import lombok.Builder;
import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
public class ApiException {
    private int status;
    private String message;

    @Builder
    public ApiException(HttpStatus status, String message) {
        this.status = status.value();
        this.message = message;
    }
}
