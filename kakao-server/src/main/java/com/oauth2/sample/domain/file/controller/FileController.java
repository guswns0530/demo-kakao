package com.oauth2.sample.domain.file.controller;

import lombok.RequiredArgsConstructor;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletResponse;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

@Controller
@RequiredArgsConstructor
@RequestMapping("/file")
public class FileController {


    @Value("${spring.servlet.multipart.location}")
    private String location;

    @GetMapping("/{email}/{path}")
    public ResponseEntity<?> getImage(@PathVariable String email, @PathVariable String path, HttpServletResponse response) throws IOException {
        InputStream in = new FileInputStream(location + "/" + email + "/" + path);

        return ResponseEntity.ok().body(IOUtils.toByteArray(in));
    }
}
