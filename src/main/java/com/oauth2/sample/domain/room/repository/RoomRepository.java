package com.oauth2.sample.domain.room.repository;

import com.oauth2.sample.domain.room.dto.RoomInfo;
import com.oauth2.sample.domain.room.request.UpdateRoomRequest;

import java.util.List;

public interface RoomRepository {
    List<RoomInfo> selectRoomList(String email);
    RoomInfo selectRoom(String email, String roomId);
    boolean updateRoom(UpdateRoomRequest request);
    boolean existUser(String roomId, String email);
}
