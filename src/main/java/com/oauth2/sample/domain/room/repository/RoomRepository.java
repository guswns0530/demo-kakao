package com.oauth2.sample.domain.room.repository;

import com.oauth2.sample.domain.room.dto.RoomInfo;

import java.util.List;

public interface RoomRepository {
    List<RoomInfo> selectRoomList(String email);
    boolean existUser(String roomId, String email);
}
