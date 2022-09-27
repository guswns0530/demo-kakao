package com.oauth2.sample.domain.chat.repository;

import com.oauth2.sample.domain.chat.request.InsertChatRequest;

public interface ChatRepository {
    boolean insertChat(InsertChatRequest insertChatRequest);
}
