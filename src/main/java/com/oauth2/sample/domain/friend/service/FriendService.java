package com.oauth2.sample.domain.friend.service;

import com.oauth2.sample.domain.friend.dto.Friend;
import com.oauth2.sample.domain.friend.dto.FriendStatus;
import com.oauth2.sample.domain.friend.repository.FriendRepository;
import com.oauth2.sample.domain.friend.request.UpdateFriendRequest;
import com.oauth2.sample.domain.user.repository.UserRepository;
import com.oauth2.sample.web.security.dto.User;
import com.oauth2.sample.web.security.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.HttpClientErrorException;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FriendService {

    private final FriendRepository friendRepository;
    private final UserRepository userRepository;

    @Transactional
    public Friend updateFriendNickname(UpdateFriendRequest updateFriendRequest) {
        Friend friend = friendRepository.selectFriend(updateFriendRequest.getFromId(), updateFriendRequest.getToId()).orElseThrow(() -> {
            throw new BadRequestException("잘못된 접근입니다.");
        });

        if(friend.getStatus() != FriendStatus.FRIEND) {
            throw new BadRequestException("잘못된 접근입니다.");
        }

        if(friendRepository.updateFriendNickname(updateFriendRequest)) {
            friend.setName(updateFriendRequest.getNickname());
        } else {
            throw new BadRequestException("정보 업데이트에 실패하였습니다.");
        }

        return friend;
    }

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

    @Transactional
    public Friend insertFriendToEmail(String fromEmail, String toEmail) {
        Optional<User> user = userRepository.findByEmail(toEmail);
        user.orElseThrow(() -> {
            throw new BadRequestException("존재 하지 않는 유저입니다.");
        });

        insertFriend(fromEmail, toEmail);

        return friendRepository.selectFriend(fromEmail, toEmail).orElseThrow(() -> {
            throw new BadRequestException("친구추가중에 오류가 발생하였습니다.");
        });
    }

    @Transactional
    public Friend insertFriendToId(String fromEmail, String toId) {
        Optional<User> user = userRepository.findById(toId);

        user.orElseThrow(() -> {
            throw new BadRequestException("존재 하지 않는 유저입니다.");
        });

        String toEmail = user.get().getEmail();

        insertFriend(fromEmail, toEmail);

        return friendRepository.selectFriend(fromEmail, toEmail).orElseThrow(() -> {
            throw new BadRequestException("친구추가중에 오류가 발생하였습니다.");
        });
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