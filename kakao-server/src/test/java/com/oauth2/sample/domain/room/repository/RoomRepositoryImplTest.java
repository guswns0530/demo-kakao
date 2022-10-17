package com.oauth2.sample.domain.room.repository;

import com.oauth2.sample.domain.room.dto.RoomInfo;
import com.oauth2.sample.domain.room.dto.RoomType;
import com.oauth2.sample.domain.room.dto.InsertRoom;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
class RoomRepositoryImplTest {

    @Autowired
    private RoomRepository roomRepository;


    @Test
    void selectRoomList() {
        List<RoomInfo> roomInfos = roomRepository.selectRoomList("y2010213@naver.com");

        roomInfos.stream().forEach(roomInfo -> {
            System.out.println("roomInfo = " + roomInfo);
        });
    }

    @Test
    void existUser() {
        boolean b = roomRepository.existUser("6", "y2010214@naver.com");

        System.out.println("b = " + b);
    }

    @Test
    void testSelectRoomList() {
    }

    @Test
    void selectRoom() {
    }

    @Test
    void insertRoom() {
        InsertRoom insertRoomRequest = InsertRoom.builder()
                .type(RoomType.PERSON)
                .build();

        boolean n = roomRepository.insertRoom(insertRoomRequest);

        if ( n == true ) {
            System.out.println("insertRoomRequest = " + insertRoomRequest);
        }
    }

    @Test
    void updateRoom() {
    }

    @Test
    void testExistUser() {
    }

    @Test
    void inviteUserToRoom() {
    }

    @Test
    void removeJoinUser() {
    }
}