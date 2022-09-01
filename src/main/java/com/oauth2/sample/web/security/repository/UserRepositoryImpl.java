package com.oauth2.sample.web.security.repository;

import com.oauth2.sample.web.security.dto.User;
import com.oauth2.sample.web.security.dto.UserFactory;
import lombok.RequiredArgsConstructor;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RequiredArgsConstructor
@Repository
public class UserRepositoryImpl implements UserRepository{

    private final SqlSessionTemplate sqlSession;

    @Override
    public Optional<User> findByEmail(String email) {

        Map<String, String> map = sqlSession.selectOne("user.findByEmail", email);

        User user = UserFactory.getUser(map);

        return Optional.of(user);
    }

    @Override
    public Boolean existByEmail(String email) {
//        Object o = sqlSession.selectOne("", email);

        return sqlSession.selectList("user.findByEmail", email).size() > 0 ? true : false;
    }

    @Override
    public Optional<User> findById(String id) {
//        sqlSession.selectOne("", id);
        return Optional.empty();
    }

    @Override
    public User save(User user) {
        return null;
    }

}
