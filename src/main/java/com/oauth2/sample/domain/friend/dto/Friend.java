package com.oauth2.sample.domain.friend.dto;

import com.oauth2.sample.web.security.dto.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Friend {
    private User user;
    private String nickname;
}
