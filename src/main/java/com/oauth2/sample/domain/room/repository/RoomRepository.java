package com.oauth2.sample.domain.room.repository;

import com.oauth2.sample.domain.room.dto.RoomInfo;
import com.oauth2.sample.domain.room.request.InviteRoomRequest;
import com.oauth2.sample.domain.room.request.UpdateRoomRequest;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

public interface RoomRepository {
    List<RoomInfo> selectRoomList(String email);
    Optional<RoomInfo> selectRoom(String email, String roomId);
    String insertRoom();
    boolean updateRoom(UpdateRoomRequest request);
    boolean existUser(String roomId, String email);
    boolean inviteUserToRoom(InviteRoomRequest inviteRoomRequest);
    boolean removeJoinUser(String roomId, String email);
}
