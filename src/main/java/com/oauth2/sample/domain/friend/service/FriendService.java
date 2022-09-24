package com.oauth2.sample.domain.friend.service;

import com.oauth2.sample.domain.friend.dto.Friend;
import com.oauth2.sample.domain.friend.repository.FriendRepository;
import com.oauth2.sample.domain.user.repository.UserRepository;
import com.oauth2.sample.web.security.dto.User;
import com.oauth2.sample.web.security.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FriendService {

    private final FriendRepository friendRepository;
    private final UserRepository userRepository;

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

    public boolean insertFriend(String email, String id) {
        Optional<User> user = userRepository.findById(id);

        user.orElseThrow(() -> {
           throw new BadRequestException("custom");
        });

        boolean result= friendRepository.insertFriend(email, user.get().getEmail());

        if(!result) {
            throw new BadRequestException("custom");
        }

        return result;
    }
}
