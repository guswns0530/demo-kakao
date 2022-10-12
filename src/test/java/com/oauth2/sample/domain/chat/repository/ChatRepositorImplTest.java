package com.oauth2.sample.domain.chat.repository;

import com.oauth2.sample.domain.chat.dto.Chat;
import com.oauth2.sample.domain.chat.request.SelectChatRequest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class ChatRepositorImplTest {

    @Autowired
    private ChatRepository chatRepository;

    @Test
    void selectChat() {
        Optional<Chat> chat = chatRepository.selectChat(SelectChatRequest.builder()
                .chatId("4")
                .roomId("46")
                .email("y2010212@naver.com")
                .build());

        chat.get();

        System.out.println("chat = " + chat);
    }

    @Test
    void insertChat() {
    }

    @Test
    void insertReadUser() {
    }

    @Test
    void removeReadUser() {
    }
}