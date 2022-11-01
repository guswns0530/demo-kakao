package com.oauth2.sample.domain.file.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@Builder
public class FileDto {
    private Long fileId;
    private String email;
    private String originalName;
    private String originalExt;

    public FileDto(Long fileId, String email, String originalName, String originalExt) {
        this.fileId = fileId;
        this.email = email;
        this.originalName = originalName;
        this.originalExt = originalExt;
    }
}
