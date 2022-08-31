package com.oauth2.sample.web.security.oauth2.user;

import lombok.extern.slf4j.Slf4j;

import java.util.Map;

@Slf4j
public class KakaoOAuth2UserInfo extends OAuth2UserInfo{

    public KakaoOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public Map<String, Object> getAttributes() {
        return super.getAttributes();
    }

    @Override
    public String getId() {
        return (String) attributes.get("id");
    }

    @Override
    public String getName() {
        return (String) attributes.get("name");
    }

    @Override
    public String getEmail() {
        return (String) attributes.get("email");
    }

    @Override
    public String getImageUrl() {
        try {
            Map<String, Object> profileObj = (Map<String, Object>) attributes.get("profile");

            String thumbnail_image_url = (String) profileObj.get("thumbnail_image_url");

            return thumbnail_image_url;
        } catch(ClassCastException ex) {
            log.error("캐스팅중 에러 발생", ex);
        } catch(Exception ex) {
            log.error("에러 발생", ex);
        }

        return "";
    }
}
