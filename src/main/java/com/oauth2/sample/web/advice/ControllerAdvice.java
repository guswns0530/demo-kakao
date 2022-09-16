package com.oauth2.sample.web.advice;

import com.oauth2.sample.web.payload.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ControllerAdvice {

    @ExceptionHandler( { Exception.class })
    public ResponseEntity defaultHandler(Exception exception) {
        ApiResponse apiResponse = ApiResponse.builder()
                .code(HttpStatus.BAD_REQUEST)
                .message(exception.getMessage())
                .build();

        return ResponseEntity.ok().body(apiResponse);
    }
}
