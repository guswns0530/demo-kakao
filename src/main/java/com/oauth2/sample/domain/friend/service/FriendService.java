package com.oauth2.sample.domain.friend.service;

import com.oauth2.sample.domain.friend.dto.Friend;
import com.oauth2.sample.domain.friend.repository.FriendRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FriendService {

    private final FriendRepository friendRepository;

    public List<Friend> selectFriendListToEmail(String email) {
        List<Friend> friends = friendRepository.selectFriendList(email);

        return friends;
    }

    public List<Friend> selectAddedMeFriendListToEmail(String email) {
        List<Friend> friends = friendRepository.selectAddedMeFriendList(email);

        return friends;
    }

    public List<Friend> selectBlockListToEmail(String email) {
        List<Friend> friends = friendRepository.selectBlockList(email);

        return friends;
    }
}
