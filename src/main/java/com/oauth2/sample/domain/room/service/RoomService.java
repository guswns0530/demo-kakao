package com.oauth2.sample.domain.room.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.oauth2.sample.domain.room.dto.RoomInfo;
import com.oauth2.sample.domain.room.repository.RoomRepository;
import com.oauth2.sample.domain.room.request.InviteRoomRequest;
import com.oauth2.sample.domain.room.request.UpdateRoomRequest;
import com.oauth2.sample.domain.room.response.RoomInfoResponse;
import com.oauth2.sample.domain.user.repository.UserRepository;
import com.oauth2.sample.web.security.dto.User;
import com.oauth2.sample.web.security.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequestMapping
@RequiredArgsConstructor
public class RoomService {
    private final RoomRepository roomRepository;
    private final UserRepository userRepository;

    public List<RoomInfoResponse> selectRoomList(String email) {
        List<RoomInfo> roomInfos = roomRepository.selectRoomList(email);

        Stream<RoomInfoResponse> roomInfoRescponseStream = roomInfos.stream().map(roomInfo -> {
            return getRoomInfoResponse(roomInfo);
        });

        List<RoomInfoResponse> roomInfoResponseList = roomInfoRescponseStream.collect(Collectors.toList());

        return roomInfoResponseList;
    }

    public RoomInfoResponse selectRoom(String email, String roomId) {
        Optional<RoomInfo> roomInfoOf = roomRepository.selectRoom(email, roomId);

        RoomInfo roomInfo = roomInfoOf.orElseThrow(() -> {
            throw new BadRequestException("잘못된 접근입니다.");
        });

        return getRoomInfoResponse(roomInfo);
    }


    @Transactional
    public void updateRoom(UpdateRoomRequest request) {
        if (!roomRepository.existUser(request.getRoomId(), request.getEmail())) {
            throw new BadRequestException("권한이 없습니다.");
        }

        boolean result = roomRepository.updateRoom(request);
    }

    @Transactional
    public RoomInfoResponse inviteUserToRoom(InviteRoomRequest inviteRoomRequest) {

        List<String> users = inviteRoomRequest.getUsers();
        // 유저 검증
        users.stream().forEach( user -> {
            if(! userRepository.existByEmail(user) ) {
                throw new BadRequestException("존재하지 않는 유저입니다.");
            }
        });

        Optional<RoomInfo> roomInfoOf = roomRepository.selectRoom(inviteRoomRequest.getFromEmail(), inviteRoomRequest.getRoomId());
        RoomInfo roomInfo = roomInfoOf.orElseGet(() -> {
            if(users.size() >= 2) {

            }

            return new RoomInfo();
        });



        try {
            boolean result = roomRepository.inviteUserToRoom(inviteRoomRequest);
            if(!result) {
                throw new BadRequestException("친구추가에 실패하였습니다.");
            }
        } catch (DuplicateKeyException ex) {
            throw new BadRequestException("이미 추가된 유저입니다.");
        }

        return null;
    }

    @Transactional
    public void leaveRoom(String roomId, String email) {
        boolean result = roomRepository.removeJoinUser(roomId, email);

        if(result) {
            throw new BadRequestException("방을 나가는데 실패하였습니다.");
        }
    }

    private RoomInfoResponse getRoomInfoResponse(RoomInfo roomInfo) {
        List<User> arrayList = null;
        try {
            arrayList = new ObjectMapper().readValue(roomInfo.getUsers(), new TypeReference<List<User>>() {
            });
        } catch (Exception ex) {
            throw new BadRequestException("서버 오류 발생 관리자에게 문의주세요");
        }
        return RoomInfoResponse.builder()
                .roomId(roomInfo.getRoomId())
                .roomName(roomInfo.getRoomName())
                .chatCreateAt(roomInfo.getChatCreateAt() != null ? roomInfo.getChatCreateAt().getTime() : null)
                .chatContent(roomInfo.getChatContent())
                .chatStatus(roomInfo.getChatStatus())
                .chatType(roomInfo.getChatType())
                .users(arrayList)
                .roomType(roomInfo.getRoomType())
                .joinUserCnt(roomInfo.getJoinUserCnt())
                .build();
    }
}
