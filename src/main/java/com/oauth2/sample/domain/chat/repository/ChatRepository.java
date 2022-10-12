package com.oauth2.sample.domain.chat.repository;

import com.oauth2.sample.domain.chat.dto.Chat;
import com.oauth2.sample.domain.chat.dto.ReadUser;
import com.oauth2.sample.domain.chat.request.RemoveChatRequest;
import com.oauth2.sample.domain.chat.request.SelectChatRequest;

import java.util.Optional;

public interface ChatRepository {
    Optional<Chat> selectChat(SelectChatRequest selectChatRequest);

    boolean insertChat(Chat insertChat);

    boolean insertReadUser(ReadUser readUser);

    boolean removeReadUser(String roomId, String email);

    boolean removeChat(RemoveChatRequest removeChatRequest);
}
