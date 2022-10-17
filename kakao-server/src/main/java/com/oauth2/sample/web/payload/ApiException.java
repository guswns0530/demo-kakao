package com.oauth2.sample.web.payload;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@Setter
public class ApiException<T> {
    private int errorCode;
    private String error;
    private T errorDescription;

    @Builder
    public ApiException(HttpStatus errorCode, String error, T errorDescription) {
        this.errorCode = errorCode.value();
        if(error == null) {
            this.error = errorCode.getReasonPhrase();
        } else {
            this.error = error;
        }
        this.errorDescription = errorDescription;
    }
}
