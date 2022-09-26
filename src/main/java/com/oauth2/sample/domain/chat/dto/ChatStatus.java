package com.oauth2.sample.domain.chat.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ChatStatus {
    EXIST(1),
    REMOVE(2);

    private final int statusCode;
}
