package com.oauth2.sample.domain.room.repository;

import com.oauth2.sample.domain.room.dto.RoomInfo;
import com.oauth2.sample.domain.room.request.UpdateRoomRequest;
import lombok.RequiredArgsConstructor;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    public RoomInfo selectRoom(String email, String roomId) {
        Map<String, String> map = new HashMap<>();
        map.put("email", email);
        map.put("roomId", roomId);

        RoomInfo selectRoom = sqlSession.selectOne("selectRoom", map);

        return selectRoom;
    }

    @Override
    public boolean updateRoom(UpdateRoomRequest request) {
        boolean result = sqlSession.update("updateRoom", request) >= 1 ? true : false;
        return result;
    }

    @Override
    public boolean existUser(String roomId, String email) {
        return false;
    }
}
