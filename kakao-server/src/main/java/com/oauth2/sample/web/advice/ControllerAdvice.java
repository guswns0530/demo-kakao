package com.oauth2.sample.web.advice;

import com.oauth2.sample.web.payload.ApiException;
import com.oauth2.sample.web.payload.ApiResponse;
import com.sun.mail.smtp.SMTPSendFailedException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailSendException;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Arrays;
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

        FieldError fieldError = result.get(0);

//        result.stream().forEach(error -> {
//            System.out.println("error.getDefaultMessage() = " + error.getDefaultMessage());
//            System.out.println("error.getField() = " + error.getField());
//            System.out.println("error.getRejectedValue() = " + error.getRejectedValue());
//        });



        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                ApiException.builder()
                        .errorCode(HttpStatus.BAD_REQUEST)
                        .errorDescription(fieldError)
                        .build()
        );
    }

    @ExceptionHandler({MailSendException.class})
    public ResponseEntity SMTPSendFailedException(MailSendException exception) {
        exception.printStackTrace();

        String errorMsg = "메일을 처리중에 오류가 발생하였습니다.";

//        if(exception == 550) {
//            errorMsg = "하루에 보낼수 있는 메일이 초과되었습니다.";
//        } else {
//            errorMsg = "메일을 처리중에 오류가 발생하였습니다.";
//        }

        return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body(
                ApiException.builder()
                        .errorCode(HttpStatus.BAD_GATEWAY)
                        .errorDescription(errorMsg)
                        .build()
        );
    }
}
