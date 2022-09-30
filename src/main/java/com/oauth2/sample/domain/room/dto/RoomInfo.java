package com.oauth2.sample.domain.room.dto;

import com.oauth2.sample.domain.chat.dto.ChatStatus;
import com.oauth2.sample.domain.chat.dto.ChatType;
import lombok.*;

import java.sql.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoomInfo {
    private String roomId;

    private String roomName;

    private RoomType roomType;

    private String roomCreateAt;

    private String users;

    private String chatContent;

    private ChatType chatType;

    private ChatStatus chatStatus;

    private String joinUserCnt;

    private String chatCreateAt;
}
