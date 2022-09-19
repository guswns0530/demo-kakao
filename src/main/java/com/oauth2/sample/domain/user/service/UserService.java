package com.oauth2.sample.domain.user.service;

import com.oauth2.sample.web.payload.ApiResponse;
import org.springframework.stereotype.Service;

public interface UserService {

    ApiResponse selectUserToEmail(String email);

    ApiResponse selectUserToId(String id);
}
