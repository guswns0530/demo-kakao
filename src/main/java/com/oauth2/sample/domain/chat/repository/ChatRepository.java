package com.oauth2.sample.domain.chat.repository;

import com.oauth2.sample.domain.chat.dto.Chat;
import com.oauth2.sample.domain.chat.dto.ReadUser;

public interface ChatRepository {
    boolean insertChat(Chat insertChat);

    boolean insertReadUser(ReadUser readUser);

    boolean removeReadUser(String roomId, String email);
}
