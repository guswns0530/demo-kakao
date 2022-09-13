package com.oauth2.sample.web.security.oauth2.user;

import lombok.extern.slf4j.Slf4j;

import java.util.Map;

/*
attributes =
        {
        id=2040569970,
        connected_at=2021-12-19T06:23:47Z,
        properties=
            {
            nickname=현준,
            profile_image=http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg,
            thumbnail_image=http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_110x110.jpg
            },
        kakao_account=
            {
            profile_nickname_needs_agreement=false,
            profile_image_needs_agreement=false,
            profile=
                {
                nickname=현준,
                thumbnail_image_url=http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_110x110.jpg, profile_image_url=http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg,
                is_default_image=true
                },
            has_email=true,
            email_needs_agreement=false,
            is_email_valid=true,
            is_email_verified=true,
            email=ury0530@naver.com
            }
        }
*/

@Slf4j
public class KakaoOAuth2UserInfo extends OAuth2UserInfo{
    private Long id;

    public KakaoOAuth2UserInfo(Map<String, Object> attributes) {
        super((Map<String, Object> ) attributes.get("kakao_account"));

        id = (Long) attributes.get("id");
    }

    @Override
    public Map<String, Object> getAttributes() {
        return super.getAttributes();
    }

    @Override
    public String getId() {
        return String.valueOf(id);
    }

    @Override
    public String getName() {
        return (String) ((Map<String, Object>) attributes.get("profile")).get("nickname");
    }

    @Override
    public String getEmail() {
        return (String) attributes.get("email");
    }

    @Override
    public String getImageUrl() {
        try {
            String thumbnail_image_url = (String) ((Map<String, Object>) attributes.get("profile")).get("thumbnail_image_url");

            return thumbnail_image_url;
        } catch(ClassCastException ex) {
            log.error("캐스팅중 에러 발생", ex);
        } catch(Exception ex) {
            log.error("에러 발생", ex);
        }

        return "";
    }
}
