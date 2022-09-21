package com.oauth2.sample.domain.friend.repository;

import com.oauth2.sample.web.security.dto.User;
import lombok.RequiredArgsConstructor;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
@RequiredArgsConstructor
public class FriendRepositoryImpl implements FriendRepository{

    private final SqlSessionTemplate sqlSession;

    @Override
    public List<User> selectFriendList(String email) {
        List<User> selectFriendList = sqlSession.selectList("selectFriendList", email);

        return selectFriendList;
    }

    @Override
    public void selectAddedMeFriendList(String email) {
        List<User> selectAddedMeFriendList = sqlSession.selectList("selectAddedMeFriendList", email);
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
