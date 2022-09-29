package com.oauth2.sample.domain.room.repository;

import com.oauth2.sample.domain.room.dto.RoomInfo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

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
    }

    @Test
    void testSelectRoomList() {
    }

    @Test
    void selectRoom() {
    }

    @Test
    void insertRoom() {
        String n = roomRepository.insertRoom();

        System.out.println("n = " + n);
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