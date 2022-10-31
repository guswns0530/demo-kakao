package com.oauth2.sample.domain.file.service;

import com.oauth2.sample.domain.file.repository.FileRepository;
import com.oauth2.sample.web.config.AppProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class FileService {

    @Value("${spring.servlet.multipart.location}")
    private String location;

    public void upload(MultipartFile file) {
        System.out.println("file.getOriginalFilename() = " + file.getOriginalFilename());
        System.out.println("file.getContentType() = " + file.getContentType());
        System.out.println("file.getName() = " + file.getName());
        System.out.println("file.getSize() = " + file.getSize());
        File dest = new  File(location + file.getOriginalFilename());
        try {
            file.transferTo(dest);
        } catch (Exception exception) {
            exception.printStackTrace();
        }
    }
}
