package com.oauth2.sample.web.payload;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

import java.util.List;

@Getter
@Setter
public class ApiExceptions<T> {
    private int errorCode;
    private String error;
    private List<T> errorDescriptions;

    @Builder
    public ApiExceptions(HttpStatus errorCode, String error, List<T> errorDescriptions) {
        this.errorCode = errorCode.value();
        if(error == null) {
            this.error = errorCode.getReasonPhrase();
        } else {
            this.error = error;
        }
        this.errorDescriptions = errorDescriptions;
    }
}
