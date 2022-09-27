package com.oauth2.sample.domain.room.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.oauth2.sample.domain.room.dto.RoomInfo;
import com.oauth2.sample.domain.room.dto.RoomInfoResponse;
import com.oauth2.sample.domain.room.repository.RoomRepository;
import com.oauth2.sample.web.security.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicReference;
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
            List arrayList = null;
            try {
                 arrayList = new ObjectMapper().readValue(roomInfo.getUsers(), new TypeReference<List<Map<String, String>>>() {
                 });
            } catch (Exception ex) {
                ex.printStackTrace();
//                throw new BadRequestException("서버 오류 발생 관리자에게 문의주세요");
            }
            return RoomInfoResponse.builder()
                    .roomId(roomInfo.getRoomId())
                    .chatCreateAt(roomInfo.getChatCreateAt().getTime())
                    .chatContent(roomInfo.getChatContent())
                    .chatStatus(roomInfo.getChatStatus())
                    .chatType(roomInfo.getChatType())
                    .users(arrayList)
                    .build();
        });

        List<RoomInfoResponse> roomInfoResponseList = roomInfoRescponseStream.collect(Collectors.toList());

        return roomInfoResponseList;
    }
}
