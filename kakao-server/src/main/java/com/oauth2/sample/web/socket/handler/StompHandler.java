package com.oauth2.sample.web.socket.handler;

import com.oauth2.sample.web.security.service.CustomUserDetailsService;
import com.oauth2.sample.web.security.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Component
@RequiredArgsConstructor
@Slf4j
public class StompHandler implements ChannelInterceptor {
    private final JwtTokenProvider tokenProvider;
    private final CustomUserDetailsService customUserDetailsService;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);

        System.out.println("accessor.getCommand() = " + accessor.getCommand());

        if(StompCommand.SEND == accessor.getCommand()) { // 연결일때만
            String jwt = accessor.getFirstNativeHeader("Authorization"); //header 파싱

            if(StringUtils.hasText(jwt) && jwt.startsWith("Bearer")) {
                jwt = jwt.substring(7);
            }
            String email = tokenProvider.getEmailFromToken(jwt);

            if(email != null) {
                UserDetails userDetails = customUserDetailsService.loadUserById(email);

                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authentication);

                accessor.setUser(authentication);
            }
        }

        return message;
    }

    @Override
    public void postSend(Message<?> message, MessageChannel channel, boolean sent) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        String sessionId = accessor.getSessionId();
        switch (accessor.getCommand()) {
            case CONNECT:
                log.info("CONNECT SESSION_ID : {}", sessionId);
                break;
            case DISCONNECT:
                log.info("DISCONNECT SESSION_ID : {}", sessionId);
                break;
            default:
                break;
        }
    }
}
