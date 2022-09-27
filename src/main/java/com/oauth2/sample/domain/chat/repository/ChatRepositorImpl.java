package com.oauth2.sample.domain.chat.repository;

import com.oauth2.sample.domain.chat.request.InsertChatRequest;
import lombok.RequiredArgsConstructor;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class ChatRepositorImpl implements ChatRepository{

    private final SqlSessionTemplate sqlSession;


    @Override
    public boolean insertChat(InsertChatRequest insertChatRequest) {
        boolean result = sqlSession.insert("chat.insertChat", insertChatRequest) >= 1 ? true : false;
        return result;
    }
}
