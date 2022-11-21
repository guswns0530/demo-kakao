package com.oauth2.sample.domain.room.repository;

import com.oauth2.sample.domain.room.dto.InviteUserToRoom;
import com.oauth2.sample.domain.room.dto.RoomInfo;
import com.oauth2.sample.domain.room.dto.InsertRoom;
import com.oauth2.sample.domain.room.request.UpdateRoomRequest;

import java.util.List;
import java.util.Optional;

public interface RoomRepository {
    List<RoomInfo> selectRoomList(String email);
    Optional<RoomInfo> selectRoom(String email, String roomId);
    boolean insertRoom(InsertRoom request);
    boolean updateRoom(UpdateRoomRequest request);
    boolean existUser(String roomId, String email);
    boolean inviteUserToRoom(InviteUserToRoom inviteUserToRoom);
    boolean removeJoinUser(String roomId, String email);
    boolean isPresent(String roomId);
    Integer selectFriendRoomId(String fromId, String toId);

    List<String> selectReaderChat(String email);
}
