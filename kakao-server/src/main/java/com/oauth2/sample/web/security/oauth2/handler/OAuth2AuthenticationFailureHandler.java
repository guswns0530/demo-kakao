package com.oauth2.sample.web.security.oauth2.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.oauth2.sample.web.payload.ApiException;
import com.oauth2.sample.web.payload.ApiResponse;
import com.oauth2.sample.web.security.oauth2.HttpCookieOAuth2AuthorizationRequestRepository;
import com.oauth2.sample.web.security.util.CookieUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URLEncoder;

@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationFailureHandler extends SimpleUrlAuthenticationFailureHandler {

    @Autowired
    @Qualifier(value = "handlerExceptionResolver")
    private HandlerExceptionResolver resolver;

    private final HttpCookieOAuth2AuthorizationRequestRepository httpCookieOAuth2AuthorizationRequestRepository;

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        String targetUrl = CookieUtils.getCookie(request, HttpCookieOAuth2AuthorizationRequestRepository.REDIRECT_URI_PARAM_COOKIE_NAME)
                .map(Cookie::getValue)
                .orElse(("/"));

        ApiException apiException = ApiException.builder()
                .errorCode(HttpStatus.UNAUTHORIZED)
                .errorDescription(exception.getLocalizedMessage())
                .build();

        String message = new ObjectMapper().writeValueAsString(apiException);
        String encodeMessage = URLEncoder.encode(message, "UTF-8");

        targetUrl = UriComponentsBuilder.fromUriString(targetUrl)
                .queryParam("error", encodeMessage)
                .build().toUriString();

        httpCookieOAuth2AuthorizationRequestRepository.removeAuthorizationRequestCookies(request, response);
        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }
}
