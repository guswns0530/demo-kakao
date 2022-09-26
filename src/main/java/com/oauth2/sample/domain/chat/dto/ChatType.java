package com.oauth2.sample.domain.chat.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ChatType {
    TEXT(1),
    FILE(2),
    NOTICE(3);

    private final int typeCode;
}
