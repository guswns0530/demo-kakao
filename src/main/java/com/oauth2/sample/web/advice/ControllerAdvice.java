package com.oauth2.sample.web.advice;

import com.oauth2.sample.web.payload.ApiException;
import com.oauth2.sample.web.payload.ApiExceptions;
import com.oauth2.sample.web.payload.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.sql.SQLException;
import java.sql.SQLIntegrityConstraintViolationException;
import java.util.Collections;
import java.util.List;

@RestControllerAdvice
@RequiredArgsConstructor
public class ControllerAdvice {

    private MessageMapping messageMapping;

    @ExceptionHandler(Exception.class)
    public ResponseEntity defaultExceptionHandler(Exception exception) {
        exception.printStackTrace();

        return ResponseEntity.badRequest().body(
                ApiException.builder()
                        .errorCode(HttpStatus.BAD_REQUEST)
                        .errorDescription(exception.getMessage())
                        .build()
        );
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity methodArgumentNotValidExceptionHandle(MethodArgumentNotValidException exception) {
        BindingResult bindingResult = exception.getBindingResult();
        List<FieldError> result = bindingResult.getFieldErrors();
        
//        result.stream().forEach(error -> {
//            System.out.println("error.getDefaultMessage() = " + error.getDefaultMessage());
//            System.out.println("error.getField() = " + error.getField());
//            System.out.println("error.getRejectedValue() = " + error.getRejectedValue());
//        });

        return ResponseEntity.ok().body(
                ApiExceptions.builder()
                        .errorCode(HttpStatus.BAD_REQUEST)
                        .errorDescriptions(Collections.singletonList(result))
                        .build()
        );
    }
}
