package com.oauth2.sample.domain.user.service;

import com.oauth2.sample.domain.user.repository.UserRepository;
import com.oauth2.sample.domain.user.request.UpdateUserRequest;
import com.oauth2.sample.web.security.dto.User;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataAccessResourceFailureException;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User selectUserToEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);

        user.orElseThrow(() ->  { throw new IllegalStateException("유저를 찾지 못하였습니다."); });

        return user.get();
    }

    public User selectUserToId(String id) {
        Optional<User> user = userRepository.findById(id);

        user.orElseThrow(() ->  { throw new IllegalStateException("유저를 찾지 못하였습니다."); });

        return user.get();
    }

    public User updateUserToEmail(String email, UpdateUserRequest updateUserRequest) {
        updateUserRequest.setEmail(email);

        boolean result = userRepository.updateUserToEmail(updateUserRequest);
        Optional<User> user = Optional.empty();

        if(result) {
            user = userRepository.findByEmail(email);
        } else {
            throw new DataAccessResourceFailureException("정보 업데이트에 실패하였습니다.");
        }

        user.orElseThrow(() -> {
            throw new DataAccessResourceFailureException("유저를 찾지 못하였습니다.");
        });


        return user.get();
    }

    public void deleteUserToEmail(String email) {
        boolean result = userRepository.deleteUser(email);

        if(!result) {
            throw new DataAccessResourceFailureException("탈퇴 처리를 실패하였습니다.");
        }
    }
}
