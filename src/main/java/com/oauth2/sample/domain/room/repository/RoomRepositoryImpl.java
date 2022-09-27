package com.oauth2.sample.domain.room.repository;

import com.oauth2.sample.domain.room.dto.RoomInfo;
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
    public boolean existUser(String roomId, String email) {
        return false;
    }
}
