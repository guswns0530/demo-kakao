package com.oauth2.sample.domain.user.repository;

import com.oauth2.sample.domain.user.request.UpdateUserRequest;
import com.oauth2.sample.web.security.dto.User;
import com.oauth2.sample.web.security.dto.UserFactory;
import lombok.RequiredArgsConstructor;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import javax.swing.text.html.Option;
import java.util.*;

@RequiredArgsConstructor
@Repository
public class UserRepositoryImpl implements UserRepository {

    private final SqlSessionTemplate sqlSession;

    @Override
    public Optional<User> findByEmail(String email) {
        Map<String, String> map = sqlSession.selectOne("user.findByEmail", email);
        User user = UserFactory.getUser(map);

        return Optional.ofNullable(user);
    }

    @Override
    public Boolean existByEmail(String email) {
        return sqlSession.selectList("user.findByEmail", email).size() > 0 ? true : false;
    }

    @Override
    public Optional<User> findById(String id) {
        Map<String, String> map = sqlSession.selectOne("user.findById", id);
        User user = UserFactory.getUser(map);

        return Optional.ofNullable(user);
    }
    
    // 수정 필요: 임시 아이디 발급
    @Deprecated
    @Override
    public User save(User user) {
        if(!StringUtils.hasText(user.getId())) {
            String uuid = UUID.randomUUID().toString();
            user.setId(user.getProvider() + ":" + uuid + "_" + new Date().toString());
        }

        sqlSession.insert("user.save", user);

        return user;
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
        int result = sqlSession.update("", email);

        return result <= 0 ? false : true;
    }

    @Override
    public Optional<User> updateUser(UpdateUserRequest user) {
        int result = sqlSession.update("", user);

        if(result <= 0) {
            return Optional.empty();
        }

        return findByEmail(user.getEmail());
    }
}
