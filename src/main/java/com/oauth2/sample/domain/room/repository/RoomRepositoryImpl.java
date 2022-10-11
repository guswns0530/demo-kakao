package com.oauth2.sample.domain.room.repository;

import com.oauth2.sample.domain.room.dto.InviteUserToRoom;
import com.oauth2.sample.domain.room.dto.RoomInfo;
import com.oauth2.sample.domain.room.dto.InsertRoom;
import com.oauth2.sample.domain.room.request.UpdateRoomRequest;
import lombok.RequiredArgsConstructor;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class RoomRepositoryImpl implements RoomRepository {

    private final SqlSessionTemplate sqlSession;

    @Override
    public List<RoomInfo> selectRoomList(String email) {
        List<RoomInfo> selectRoomList = sqlSession.selectList("selectRoomList", email);

        return selectRoomList;
    }


    @Override
    public Optional<RoomInfo> selectRoom(String email, String roomId) {
        Map<String, String> map = new HashMap<>();
        map.put("email", email);
        map.put("roomId", roomId);

        RoomInfo selectRoom = sqlSession.selectOne("selectRoom", map);

        return Optional.ofNullable(selectRoom);
    }

    @Override
    public boolean insertRoom(InsertRoom request) {
        boolean result = sqlSession.insert("insertRoom", request) >= 1 ? true :false;

        return result;
    }

    @Override
    public boolean updateRoom(UpdateRoomRequest request) {
        boolean result = sqlSession.update("updateRoom", request) >= 1 ? true : false;
        return result;
    }

    @Override
    public boolean existUser(String roomId, String email) {
        HashMap<String, String> map = new HashMap<>();
        map.put("roomId", roomId);
        map.put("email", email);

        boolean result = sqlSession.selectOne("existUser", map) != null ? true : false;
        return result;
    }

    @Override
    public boolean inviteUserToRoom(InviteUserToRoom inviteUserToRoom) {
        boolean result = sqlSession.insert("inviteUserToRoom", inviteUserToRoom) <= 0 ? false : true;

        return result;
    }

    @Override
    public boolean removeJoinUser(String roomId, String email) {
        HashMap<String, String> map = new HashMap<>();
        map.put("roomId", roomId);
        map.put("email", email);

        boolean result = sqlSession.update("removeJoinUser", map) >= 1 ? true : false;
        return result;
    }

    @Override
    public boolean isPresent(String roomId) {
        boolean result = sqlSession.selectOne("isPresent", roomId) != null ? true : false;

        return result;
    }

    @Override
    public Integer selectFriendRoomId(String fromId, String toId) {
        Map<String, String> map = new HashMap<>();
        map.put("fromId", fromId);
        map.put("toId", toId);

        Integer result = sqlSession.selectOne("selectFriendRoomId", map);

        return result;
    }
}
