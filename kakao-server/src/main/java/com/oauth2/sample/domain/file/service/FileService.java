package com.oauth2.sample.domain.file.service;

import com.oauth2.sample.domain.file.dto.FileDto;
import com.oauth2.sample.domain.file.repository.FileRepository;
import com.oauth2.sample.web.security.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class FileService {

    private final FileRepository fileRepository;

    @Value("${spring.servlet.multipart.location}")
    private String location;

    public List<String> uploadFiles(String email, MultipartFile[] files) throws IOException {

        AtomicInteger atomicInteger = new AtomicInteger();

        File dir = new File(location + "\\" + email);

        Stream<String> stringStream = Arrays.stream(files).map(file -> {
            Long fileId = Long.parseLong(new Date().getTime() + "" + atomicInteger.getAndIncrement());
            String path = insertFile(email, file, fileId);

            return path;
        });

        return stringStream.collect(Collectors.toList());
    }

    public String uploadFile(String email, MultipartFile file) throws IOException {

        File dir = new File(location + "\\" + email);

        Long fileId = new Date().getTime();
        String path = insertFile(email, file, fileId);

        return path;
    }

    private String insertFile(String email, MultipartFile file, Long fileId) {
        File dest = new File(email + "/" + fileId);

        try {
            file.transferTo(dest);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        String filename = file.getOriginalFilename();
        String ext = FilenameUtils.getExtension(filename);
        String contentType = file.getContentType();
        Long size = file.getSize();

        FileDto fileDto = FileDto.builder()
                .fileId(fileId)
                .email(email)
                .originalName(filename)
                .originalExt(ext)
                .build();

        boolean result = fileRepository.insertFile(fileDto);

        if (!result) {
            throw new BadRequestException("데이터베이스 입력중 오류가 발생하였습니다.");
        }

        return dest.getPath();
    }
}
