package com.oauth2.sample.domain.file.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@Builder
public class File {
    private String fileId;
    private String email;
    private String fileName;
    private String originalName;
    private String originalExt;

    public File(String fileId, String email, String fileName, String originalName, String originalExt) {
        this.fileId = fileId;
        this.email = email;
        this.fileName = fileName;
        this.originalName = originalName;
        this.originalExt = originalExt;
    }
}
