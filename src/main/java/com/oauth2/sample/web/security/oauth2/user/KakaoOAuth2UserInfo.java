package com.oauth2.sample.web.security.oauth2.user;

import lombok.extern.slf4j.Slf4j;

import java.util.Map;

/*
properties=
   {nickname=현준,
   profile_image=http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg,
   thumbnail_image=http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_110x110.jpg},
   kakao_account=
       {profile_nickname_needs_agreement=false,
        profile_image_needs_agreement=false,
        profile=
            {nickname=현준,
             thumbnail_image_url=http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_110x110.jpg,
             profile_image_url=http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg,
             is_default_image=true},
        has_email=true,
        email_needs_agreement=false,
        is_email_valid=true,
        is_email_verified=true,
        email=ury0530@naver.com}}]
 */

@Slf4j
public class KakaoOAuth2UserInfo extends OAuth2UserInfo{

    private Integer id;

    public KakaoOAuth2UserInfo(Map<String, Object> attributes) {
        super((Map<String, Object> ) attributes.get("kakao_account"));
    }

    @Override
    public Map<String, Object> getAttributes() {
        return super.getAttributes();
    }

    @Override
    public String getId() {
        return id.toString();
    }

    @Override
    public String getName() {
        return (String) attributes.get("name");
    }

    @Override
    public String getEmail() {
        return (String)((Map<String, Object>) attributes.get("properties")).get("email");
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
