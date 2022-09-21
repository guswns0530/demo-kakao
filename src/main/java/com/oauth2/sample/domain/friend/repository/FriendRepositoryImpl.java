package com.oauth2.sample.domain.friend.repository;

import com.oauth2.sample.web.security.dto.User;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.session.SqlSession;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

//@Repository
@RequiredArgsConstructor
public class FriendRepositoryImpl implements FriendRepository{

    private final SqlSessionTemplate sqlSession;

    @Override
    public void selectFriendList(String email) {
        List<Map<String, String>> selectFriendList = sqlSession.selectList("selectFriendList", email);
    }

    @Override
    public void selectAddedMeFriendList(String email) {
        List<Map<String, String>> selectAddedMeFriendList = sqlSession.selectList("selectAddedMeFriendList", email);
    }

    @Override
    public void selectBlockList(String email) {

    }

    @Override
    public void insert(String email, User user) {

    }

    @Override
    public void update(String email) {

    }

    @Override
    public void block(String email, String targetEmail) {

    }
}
