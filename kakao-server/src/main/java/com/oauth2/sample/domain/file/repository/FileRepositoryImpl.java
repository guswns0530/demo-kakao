package com.oauth2.sample.domain.file.repository;

import lombok.RequiredArgsConstructor;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class FileRepositoryImpl implements FileRepository {
    private final SqlSessionTemplate sqlSession;
}
