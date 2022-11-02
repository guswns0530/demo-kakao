package com.oauth2.sample.domain.user.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.Null;

@Getter
@Setter
@NoArgsConstructor
public class UpdateUserRequest {
    private String id;

    private String name;

    private MultipartFile profileImageFile;

    private MultipartFile backgroundImageFile;

    @Null(message = "잘못된 접근입니다.")
    private String profileImage;

    @Null(message = "잘못된 접근입니다.")
    private String backgroundImage;

    @JsonProperty("removeProfileImage")
    private boolean removeProfileImage;

    @JsonProperty("removeBackgroundImage")
    private boolean removeBackgroundImage;

    private String message;

    @Null( message = "잘못된 접근입니다.")
    private String email;

    @JsonProperty("removeProfileImage")
    public boolean getRemoveProfileImage() {
        return removeProfileImage;
    }

    @JsonProperty("removeBackgroundImage")
    public boolean getRemoveBackgroundImage() {
        return removeBackgroundImage;
    }

    @JsonProperty("removeProfileImage")
    public void setRemoveProfileImage(boolean removeProfileImage) {
        this.removeProfileImage = removeProfileImage;
    }

    @JsonProperty("removeBackgroundImage")
    public void setRemoveBackgroundImage(boolean removeBackgroundImage) {
        this.removeBackgroundImage = removeBackgroundImage;
    }
}
