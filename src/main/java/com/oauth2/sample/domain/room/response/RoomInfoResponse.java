package com.oauth2.sample.domain.room.response;

import com.oauth2.sample.domain.chat.dto.ChatStatus;
import com.oauth2.sample.domain.chat.dto.ChatType;
import com.oauth2.sample.domain.room.dto.RoomType;
import com.oauth2.sample.web.security.dto.User;
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

    private List<User> users;

    private String chatContent;

    private ChatType chatType;

    private ChatStatus chatStatus;

    private String chatCreateAt;
}
