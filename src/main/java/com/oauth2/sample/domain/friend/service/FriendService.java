package com.oauth2.sample.domain.friend.service;

import com.oauth2.sample.domain.friend.dto.Friend;
import com.oauth2.sample.domain.friend.dto.FriendStatus;
import com.oauth2.sample.domain.friend.repository.FriendRepository;
import com.oauth2.sample.domain.user.repository.UserRepository;
import com.oauth2.sample.web.security.dto.User;
import com.oauth2.sample.web.security.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DuplicateKeyException;
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

    public boolean insertFriendToEmail(String fromEmail, String toEmail) {
        Optional<User> user = userRepository.findByEmail(toEmail);
        user.orElseThrow(() -> {
            throw new BadRequestException("존재 하지 않는 유저입니다.");
        });

        insertFriend(fromEmail, toEmail);

        return true;
    }

    public boolean insertFriendToId(String fromEmail, String toId) {
        Optional<User> user = userRepository.findById(toId);

        user.orElseThrow(() -> {
            throw new BadRequestException("존재 하지 않는 유저입니다.");
        });

        String toEmail = user.get().getEmail();

        insertFriend(fromEmail, toEmail);

        return true;
    }

    public boolean blockFriend(String fromId, String toId) {
        boolean result = friendRepository.blockFriend(fromId, toId);

        return result;
    }

    public boolean removeFriend(String fromId, String toId) {
        boolean result = friendRepository.removeFriend(fromId, toId);

        return result;
    }

    private void insertFriend(String fromEmail, String toEmail) {
        if(fromEmail.equals(toEmail)) {
            throw new BadRequestException("자기 자신은 추가할 수 없습니다.");
        }

        try {
            Optional<Friend> friend = friendRepository.selectFriend(fromEmail, toEmail);

            if (friend.isPresent()) {
                Friend fr = friend.get();

                if(fr.getStatus() == FriendStatus.FRIEND) {
                    throw new DuplicateKeyException("");
                }

                friendRepository.updateFriendStatus(fromEmail, toEmail);
            } else {
                boolean result = friendRepository.insertFriend(fromEmail, toEmail);

                if (!result) {
                    throw new BadRequestException("친구추가에 실패하였습니다.");
                }
            }
        } catch (DuplicateKeyException ex) {
            throw new BadRequestException("이미 추가된 친구입니다.");
        }

    }

}