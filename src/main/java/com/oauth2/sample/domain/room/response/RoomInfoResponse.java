package com.oauth2.sample.domain.room.dto;

import com.oauth2.sample.web.security.dto.User;
import lombok.*;
import org.w3c.dom.stylesheets.LinkStyle;

import javax.print.DocFlavor;
import java.sql.Date;
import java.util.List;
import java.util.Map;

@Getter
@Setter
@Builder
public class RoomInfoResponse {
    private String roomId;

    private String roomName;

    private List<User> users;

    private String chatContent;

    private String chatType;

    private String chatStatus;

    private Long chatCreateAt;
}
