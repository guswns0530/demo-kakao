package com.oauth2.sample.web.security.repository;

import com.oauth2.sample.web.security.dto.User;
import com.oauth2.sample.web.security.dto.UserFactory;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.session.SqlSessionException;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import java.sql.SQLException;
import java.util.*;

@RequiredArgsConstructor
@Repository
public class UserRepositoryImpl implements UserRepository{

    private final SqlSessionTemplate sqlSession;

    @Override
    public Optional<User> findByEmail(String email) {
        Map<String, String> map = sqlSession.selectOne("user.findByEmail", email);
        User user = UserFactory.getUser(map);

        return Optional.ofNullable(user);
    }

    @Override
    public Boolean existByEmail(String email) {
//        Object o = sqlSession.selectOne("", email);

        return sqlSession.selectList("user.findByEmail", email).size() > 0 ? true : false;
    }

    @Override
    public Optional<User> findById(String id) {
        return Optional.empty();
    }

    @Override
    public User save(User user) {
        if(!StringUtils.hasText(user.getId())) {
            String uuid = UUID.randomUUID().toString();
            user.setId(user.getProvider() + ":" + uuid + "_" + new Date().toString());
        }

        int result = sqlSession.insert("user.save", user);

        return user;
    }

    @Override
    public String getRefreshTokenById(String id) {
        return sqlSession.selectOne("user.getRefreshTokenById", id);
    }

    @Override
    public void updateRefreshToken(String id, String token) {
        Map<String, String> map = new HashMap<>();

        map.put("id", id);
        map.put("token", token);

        System.out.println("id = " + id);
        System.out.println("token = " + token);

        sqlSession.update("user.updateRefreshToken", map);
    }
}
