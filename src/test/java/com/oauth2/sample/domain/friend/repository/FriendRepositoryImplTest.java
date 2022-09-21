package com.oauth2.sample.domain.friend.repository;

import com.oauth2.sample.web.security.dto.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class FriendRepositoryImplTest {

    @Autowired
    private FriendRepository friendRepository;


    @Test
    void selectFriendList() {
        List<User> users = friendRepository.selectFriendList("y2010212@naver.com");

        users.stream().forEach(user -> {
            System.out.println("user = " + user);
        });
    }

    @Test
    void selectAddedMeFriendList() {
    }

    @Test
    void selectBlockList() {
    }

    @Test
    void insert() {
    }

    @Test
    void update() {
    }

    @Test
    void block() {
    }
}