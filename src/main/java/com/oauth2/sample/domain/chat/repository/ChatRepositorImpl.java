package com.oauth2.sample.domain.chat.repository;

import com.oauth2.sample.domain.chat.dto.Chat;
import com.oauth2.sample.domain.chat.dto.ReadUser;
import com.oauth2.sample.domain.chat.request.ReadChatRequest;
import com.oauth2.sample.domain.chat.request.RemoveChatRequest;
import com.oauth2.sample.domain.chat.request.SelectChatListRequest;
import com.oauth2.sample.domain.chat.request.SelectChatRequest;
import lombok.RequiredArgsConstructor;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class ChatRepositorImpl implements ChatRepository{

    private final SqlSessionTemplate sqlSession;


    @Override
    public Optional<Chat> selectChat(SelectChatRequest selectChatRequest) {
        Chat chat = sqlSession.selectOne("selectChat", selectChatRequest);
        return Optional.ofNullable(chat);
    }

    @Override
    public boolean insertChat(Chat insertChat) {
        boolean result = sqlSession.insert("chat.insertChat", insertChat) >= 1 ? true : false;
        return result;
    }

    @Override
    public boolean insertReadUser(ReadUser readUser) {
        boolean result = sqlSession.insert("insertReadUser", readUser) >= 1 ? true : false;
        return result;
    }

    @Override
    public boolean removeReadUser(String roomId, String email) {
        HashMap<String, String> map = new HashMap<>();
        map.put("roomId", roomId);
        map.put("email", email);

        boolean result = sqlSession.insert("removeReadUser", map) >= 1 ? true : false;
        return result;
    }

    @Override
    public boolean removeChat(RemoveChatRequest removeChatRequest) {
        boolean result = sqlSession.update("removeChat", removeChatRequest) >= 1 ? true :false;
        return result;
    }

    @Override
    public boolean readChat(ReadChatRequest readChatRequest) {
        boolean result = sqlSession.update("readChat", readChatRequest) >= 1 ? true :false;
        return result;
    }

    @Override
    public List<Chat> selectChatList(SelectChatListRequest selectChatlistRequest) {
        return sqlSession.selectList("selectChatList", selectChatlistRequest);
    }
}
