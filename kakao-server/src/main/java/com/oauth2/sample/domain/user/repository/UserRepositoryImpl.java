package com.oauth2.sample.domain.user.repository;

import com.oauth2.sample.domain.user.request.UpdateUserRequest;
import com.oauth2.sample.web.security.dto.User;
import lombok.RequiredArgsConstructor;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import java.util.*;

@RequiredArgsConstructor
@Repository
public class UserRepositoryImpl implements UserRepository {

    private final SqlSessionTemplate sqlSession;

    @Override
    public Optional<User> findByEmail(String email) {
        User user = sqlSession.selectOne("user.findByEmail", email);

        return Optional.ofNullable(user);
    }

    @Override
    public Optional<User> findById(String id) {
        User user = sqlSession.selectOne("user.findById", id);
        ;

        return Optional.ofNullable(user);
    }

    @Override
    public Boolean existByEmail(String email) {
        return sqlSession.selectList("user.findByEmail", email).size() > 0 ? true : false;
    }


    // 수정 필요: 임시 아이디 발급
    @Deprecated
    @Override
    public User save(User user) {
        if (!StringUtils.hasText(user.getId())) {
            String uuid = UUID.randomUUID().toString();
            user.setId(user.getProvider() + ":" + uuid + "_" + new Date().toString());
        }

        int result = sqlSession.insert("user.save", user);

        if(result >= 1) {
            return user;
        }

        return null;
    }

    @Override
    public String getRefreshTokenByEmail(String email) {
        return sqlSession.selectOne("user.getRefreshTokenByEmail", email);
    }

    @Override
    public boolean updateRefreshToken(String email, String token) {
        Map<String, String> map = new HashMap<>();

        map.put("email", email);
        map.put("token", token);

        int result = sqlSession.update("user.updateRefreshToken", map);

        return result <= 0 ? false : true;
    }

    @Override
    public boolean deleteUser(String email) {
        int result = sqlSession.update("user.deleteUser", email);

        return result <= 0 ? false : true;
    }

    @Override
    public boolean updateUserToEmail(UpdateUserRequest user) {
        int result = sqlSession.update("user.updateUserToEmail", user);

        return result <= 0 ? false : true;
    }
}
