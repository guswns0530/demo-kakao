package com.oauth2.sample.domain.email.service;

import com.oauth2.sample.domain.email.dto.EmailConfirmToken;
import com.oauth2.sample.domain.user.repository.UserRepository;
import com.oauth2.sample.web.security.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.mail.Session;
import javax.servlet.http.HttpSession;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class EmailConfirmService {
    private final EmailSenderService emailSenderService;
    private final UserRepository userRepository;

    public void createEmailConfirmToken(String email, HttpSession session) {
        if(!(StringUtils.hasText(email) && Pattern.matches("^[a-zA-Z0-9+-\\_.]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$", email))) {
            throw new BadRequestException("이메일 형식이 맞지 않습니다.");
        }

        if(userRepository.existByEmail(email)) {
            throw new BadRequestException("이미 사용중인 이메일입니다.");
        }


        EmailConfirmToken token = EmailConfirmToken.createEmailConfirmToken(email);

        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(email);
        mailMessage.setSubject("회원가입 이메일 인증");
        mailMessage.setText(token.getId());
        emailSenderService.sendEmail(mailMessage);

        session.setAttribute(EmailConfirmToken.EMAIL_TOKEN_SESSION_KEY, token);
    }

    public void checkEmailConfirmToken(String confirmToken, HttpSession session) {
        Object object = session.getAttribute(EmailConfirmToken.EMAIL_TOKEN_SESSION_KEY);
        if(object == null) {
            throw new BadRequestException("잘못된 접근입니다.");
        }
        EmailConfirmToken emailConfirmToken = (EmailConfirmToken) object;

        if(emailConfirmToken.isExpired()) {
            throw new BadRequestException("인증시간이 초과되었습니다.");
        }
        if(!confirmToken.equals(emailConfirmToken.getId())) {
            throw new BadRequestException("인증번호가 일치하지 않습니다.");
        }

        emailConfirmToken.useToken();
    }
}
