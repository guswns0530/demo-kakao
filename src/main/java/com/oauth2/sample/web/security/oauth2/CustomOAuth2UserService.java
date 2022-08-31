package com.oauth2.sample.web.security.oauth2;

import com.oauth2.sample.web.security.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

//    @Override
//    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
//        OAuth2User oAuth2User = super.loadUser(userRequest);
//
//        try {
//            return processOAuth2Uesr(userRequest, oAuth2User);
//        } catch(AuthenticationException ex) {
//            throw ex;
//        } catch(Exception ex) {
//            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
//        }
//    }

//    private OAuth2User processOAuth2Uesr(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) {
////        OAuth2UserInfo oAuth2UserInfo =
//    }
//
//    private User registerNewUser(OAuth2UserRequest oAuth2UserRequest, OAuth2UserInfo oAuth2UserInfo) {
////        return userRepository.save(User.)
//    }
}

