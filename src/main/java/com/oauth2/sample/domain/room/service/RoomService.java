package com.oauth2.sample.domain.room.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.oauth2.sample.domain.room.dto.RoomInfo;
import com.oauth2.sample.domain.room.dto.RoomInfoResponse;
import com.oauth2.sample.domain.room.repository.RoomRepository;
import com.oauth2.sample.domain.room.request.UpdateRoomRequest;
import com.oauth2.sample.web.security.dto.User;
import com.oauth2.sample.web.security.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequestMapping
@RequiredArgsConstructor
public class RoomService {
    private final RoomRepository roomRepository;

    public List<RoomInfoResponse> selectRoomList(String email) {
        List<RoomInfo> roomInfos = roomRepository.selectRoomList(email);

        Stream<RoomInfoResponse> roomInfoRescponseStream = roomInfos.stream().map(roomInfo -> {
            return getRoomInfoResponse(roomInfo);
        });

        List<RoomInfoResponse> roomInfoResponseList = roomInfoRescponseStream.collect(Collectors.toList());

        return roomInfoResponseList;
    }

    public RoomInfoResponse selectRoom(String email, String roomId) {
        RoomInfo roomInfo = roomRepository.selectRoom(email, roomId);

        if(roomInfo == null) {
            throw new BadRequestException("잘못된 접근입니다.");
        }

        return getRoomInfoResponse(roomInfo);
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
                .build();
    }

    public void updateRoom(UpdateRoomRequest request) {
        boolean result = roomRepository.updateRoom(request);
    }
}