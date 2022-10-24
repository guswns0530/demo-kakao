package com.oauth2.sample.web.security.oauth2.user;

import com.oauth2.sample.web.security.dto.AuthProvider;
import com.oauth2.sample.web.security.exception.OAuth2AuthenticationProcessingException;

import java.util.Map;

public class OAuth2UserInfoFactory {
    public static OAuth2UserInfo getOAuth2UserInfo(String registrationId, Map<String, Object> attributes) {
        if(registrationId.equalsIgnoreCase(AuthProvider.kakao.name())) {
            return new KakaoOAuth2UserInfo(attributes);
        } else {
            throw new OAuth2AuthenticationProcessingException(registrationId + " 로그인은 지원하지 않습니다.");        }
    }
}
