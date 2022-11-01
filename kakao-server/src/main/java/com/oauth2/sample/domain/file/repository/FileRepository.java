package com.oauth2.sample.domain.file.repository;

import com.oauth2.sample.domain.file.dto.FileDto;

public interface FileRepository {
    boolean insertFile(FileDto file);
}
