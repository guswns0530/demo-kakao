package com.oauth2.sample.web.socket.handler;

import com.oauth2.sample.web.security.dto.User;
import com.oauth2.sample.web.security.jwt.JwtTokenProvider;
import com.oauth2.sample.web.security.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.util.Optional;


@Component
@RequiredArgsConstructor
@Slf4j
public class StompHandler implements ChannelInterceptor {
    private final JwtTokenProvider tokenProvider;
    private final UserRepository userRepository;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);

        if(StompCommand.CONNECT == accessor.getCommand()) {
            String jwt = accessor.getFirstNativeHeader("Authorization");

            if(StringUtils.hasText(jwt) && jwt.startsWith("Bearer")) {
                jwt = jwt.substring(7);
            }
            String userId = tokenProvider.getUserIdFromToken(jwt);

            if(userId != null) {
                Optional<User> user = userRepository.findById(userId);

                if(!user.isPresent()) {
                    throw new IllegalArgumentException();
                } else {
                    return message;
                }
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
