package com.oauth2.sample.domain.file.repository;

import com.oauth2.sample.domain.file.dto.FileDto;
import lombok.RequiredArgsConstructor;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class FileRepositoryImpl implements FileRepository {
    private final SqlSessionTemplate sqlSession;

    @Override
    public boolean insertFile(FileDto file) {
        boolean result = sqlSession.insert("insertFile", file) >= 1 ? true :false;

        return result;
    }
}
