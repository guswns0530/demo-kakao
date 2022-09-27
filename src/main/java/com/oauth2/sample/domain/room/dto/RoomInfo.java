package com.oauth2.sample.domain.room.dto;

import lombok.*;

import java.sql.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RoomInfo {
    private String roomId;

    private String users;

    private String chatContent;

    private String chatType;

    private String chatStatus;

    private Date chatCreateAt;
}
