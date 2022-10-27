package com.oauth2.sample.domain.file.service;

import com.oauth2.sample.domain.file.repository.FileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class FileService {

    private final FileRepository fileRepository;

    public String upload(MultipartFile multipartFile) {
        System.out.println("muli = " + multipartFile.getOriginalFilename());

        return ""
    }
}
