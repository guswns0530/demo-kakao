package com.oauth2.sample.domain.friend.repository;

import com.nimbusds.jose.crypto.impl.MACProvider;
import com.oauth2.sample.domain.friend.dto.Friend;
import com.oauth2.sample.domain.friend.request.UpdateFriendRequest;
import lombok.RequiredArgsConstructor;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class FriendRepositoryImpl implements FriendRepository {

    private final SqlSessionTemplate sqlSession;

    @Override
    public Optional<Friend> selectFriend(String fromId, String toId) {
        Map<String, String> map = new HashMap<>();
        map.put("fromId", fromId);
        map.put("toId", toId);

        Friend selectFriend = sqlSession.selectOne("selectFriend", map);
        return Optional.ofNullable(selectFriend);
    }

    @Override
    public List<Friend> selectFriendList(String email) {
        List<Friend> selectFriendList = sqlSession.selectList("selectFriendList", email);

        return selectFriendList;
    }

    @Override
    public List<Friend> selectAddedMeFriendList(String email) {
        List<Friend> selectAddedMeFriendList = sqlSession.selectList("selectAddedMeFriendList", email);

        return selectAddedMeFriendList;
    }

    @Override
    public List<Friend> selectBlockList(String email) {
        List<Friend> selectBlockList = sqlSession.selectList("selectBlockList", email);

        return selectBlockList;
    }

    @Override
    public boolean insertFriend(String fromId, String toId) {
        Map<String, String> map = new HashMap<>();
        map.put("fromId", fromId);
        map.put("toId", toId);
        boolean result = sqlSession.update("insertFriend", map) >= 1 ? true : false;

        return result;
    }

    @Override
    public boolean updateFriendNickname(UpdateFriendRequest updateFriendRequest) {
        boolean result = sqlSession.update("updateFriendNickname", updateFriendRequest) >= 1 ? true : false;

        return result;
    }

    @Override
    public boolean updateFriendStatus(String fromId, String toId) {
        Map<Object, Object> map = new HashMap<>();
        map.put("fromId", fromId);
        map.put("toId", toId);

        boolean result = sqlSession.update("updateFriendStatus", map) >= 1 ? true : false;
        return false;
    }

    @Override
    public boolean blockFriend(String fromId, String toId) {
        Map<String, String> map = new HashMap<>();
        map.put("fromId", fromId);
        map.put("toId", toId);
        boolean result = sqlSession.update("blockFriend", map) >= 1 ? true : false;

        return result;
    }

    @Override
    public boolean removeFriend(String fromId, String toId) {
        Map<String, String> map = new HashMap<>();
        map.put("fromId", fromId);
        map.put("toId", toId);
        boolean result = sqlSession.update("removeFriend", map) >= 1 ? true : false;

        return result;
    }
}
