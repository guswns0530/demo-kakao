package com.oauth2.sample.web.security.oauth2;

import com.oauth2.sample.domain.user.repository.UserRepository;
import com.oauth2.sample.web.security.principal.UserPrincipal;
import com.oauth2.sample.web.security.dto.AuthProvider;
import com.oauth2.sample.web.security.dto.User;
import com.oauth2.sample.web.security.exception.OAuth2AuthenticationProcessingException;
import com.oauth2.sample.web.security.oauth2.user.OAuth2UserInfo;
import com.oauth2.sample.web.security.oauth2.user.OAuth2UserInfoFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    @Override
    @Transactional
    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);

        try {
            return processOAuth2User(oAuth2UserRequest, oAuth2User);
        } catch (AuthenticationException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
        }
    }

    private OAuth2User processOAuth2User(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) {
        String registrationId = oAuth2UserRequest.getClientRegistration().getRegistrationId(); // provider
        OAuth2UserInfo oAuth2UserInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(registrationId, oAuth2User.getAttributes()); // 팩토리를 통해 OAuth2UserInfo 생성

        if(StringUtils.isEmpty(oAuth2UserInfo.getEmail())) { // 이메일 존재 여부
            throw new OAuth2AuthenticationProcessingException("제공자로부터 이메일을 찾을 수 없습니다");
        }

        Optional<User> userOptional = userRepository.findByEmail(oAuth2UserInfo.getEmail()); // 유저 DB 조회
        User user;
        if(userOptional.isPresent()) { // 존재하면
            user = userOptional.get();
            if(!user.getProvider().equals(AuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId().toUpperCase()))) {
                throw new OAuth2AuthenticationProcessingException(user.getProvider() + "계정으로 가입혔습니다. "+ user.getProvider() + " 계정을 사용하여 로그인하십시오");
            }
        } else {
            user = registerNewUser(oAuth2UserRequest, oAuth2UserInfo);
        }
        return UserPrincipal.create(user, oAuth2User.getAttributes());
    }

    private User registerNewUser(OAuth2UserRequest oAuth2UserRequest, OAuth2UserInfo oAuth2UserInfo) {
        return userRepository.save(User.builder()
                .name(oAuth2UserInfo.getName())
                .email(oAuth2UserInfo.getEmail())
                .imageUrl(oAuth2UserInfo.getImageUrl())
                .provider(AuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId().toUpperCase()))
                .providerId(oAuth2UserInfo.getId())
                .build()
        );
    }
}