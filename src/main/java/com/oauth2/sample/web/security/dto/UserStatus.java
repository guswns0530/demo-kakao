package com.oauth2.sample.web.security.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.type.EnumTypeHandler;
import org.apache.ibatis.type.MappedTypes;

@Getter
@RequiredArgsConstructor
public enum UserStatus {
    ACCOUNT(1),
    WITHDRAWAL(2);

    private final int statusCode;
}
