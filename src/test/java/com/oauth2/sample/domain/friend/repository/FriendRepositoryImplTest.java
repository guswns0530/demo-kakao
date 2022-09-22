package com.oauth2.sample.domain.friend.repository;

import com.oauth2.sample.domain.friend.dto.Friend;
import com.oauth2.sample.domain.friend.request.UpdateFriendRequest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

@SpringBootTest
class FriendRepositoryImplTest {

    @Autowired
    private FriendRepository friendRepository;

    @Test
    void selectFriend() {
        Optional<Friend> friend = friendRepository.selectFriend("y2010212@naver.com", "y2010213@naver.com");

        System.out.println("friend.get() = " + friend.get());
    }

    @Test
    void selectFriendList() {
        List<Friend> users = friendRepository.selectFriendList("y2010212@naver.com");

        users.stream().forEach(user -> {
            System.out.println("user = " + user);
        });
    }

    @Test
    void selectAddedMeFriendList() {
        List<Friend> users = friendRepository.selectAddedMeFriendList("y2010212@naver.com");

        users.stream().forEach(user -> {
            System.out.println("user = " + user);
        });
    }

    @Test
    void selectBlockList() {
        List<Friend> users = friendRepository.selectBlockList("y2010212@naver.com");

        users.stream().forEach(user -> {
            System.out.println("user = " + user);
        });
    }

    @Test
    void insertFriend() {
        String fromId = "y2010212@naver.com";
        String toId = "y2010214@naver.com";

        boolean result = friendRepository.insertFriend(fromId, toId);

        System.out.println("result = " + result);
    }

    @Test
    void updateNicknameFriend() {
        UpdateFriendRequest updateFriendRequest = new UpdateFriendRequest();
        updateFriendRequest.setFromId("y2010212@naver.com");
        updateFriendRequest.setToId("y2010213@naver.com");

        updateFriendRequest.setNickname("홍");

        boolean result = friendRepository.updateFriendNickname(updateFriendRequest);

        System.out.println("result = " + result);
    }

    @Test
    void blockFriend() {
        String fromId = "y2010212@naver.com";
        String toId = "y2010213@naver.com";

        boolean result = friendRepository.blockFriend(fromId, toId);

        System.out.println("result = " + result);
    }
}