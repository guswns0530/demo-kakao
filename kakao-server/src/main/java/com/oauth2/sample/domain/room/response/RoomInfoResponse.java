package com.oauth2.sample.domain.room.response;

import com.oauth2.sample.domain.chat.dto.ChatStatus;
import com.oauth2.sample.domain.chat.dto.ChatType;
import com.oauth2.sample.domain.room.dto.RoomType;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
public class RoomInfoResponse {
    private String roomId;

    private String roomName;

    private RoomType roomType;

    private String roomCreateAt;

    private String joinUserCnt;

    private String unreadCnt;

    private List<JoinUser> users;

    private String chatContent;

    private ChatType chatType;

    private ChatStatus chatStatus;

    private String chatCreateAt;
}
