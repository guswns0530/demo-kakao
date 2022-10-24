package com.oauth2.sample.web.security.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum AuthProvider {
    local("로컬"),
    kakao("카카오");

    String name;
}
