package com.oauth2.sample.domain.friend.repository;

import com.oauth2.sample.domain.friend.dto.Friend;
import com.oauth2.sample.domain.friend.request.UpdateFriendRequest;

import java.util.List;
import java.util.Optional;

public interface FriendRepository {
    Optional<Friend> selectFriend(String fromId, String toId);
    List<Friend> selectFriendList(String email);

    List<Friend> selectAddedMeFriendList(String email);

    List<Friend> selectBlockList(String email);

    boolean insertFriend(String fromId, String toId);

    boolean updateFriendNickname(UpdateFriendRequest updateFriendRequest);

    boolean updateFriendStatus(String fromId, String toId);

    boolean blockFriend(String fromId, String toId);

    boolean removeFriend(String fromId, String toId);
}
