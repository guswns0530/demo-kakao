package com.oauth2.sample;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.oauth2.sample.domain.chat.request.SelectChatListRequest;
import com.oauth2.sample.domain.email.dto.EmailConfirmToken;
import com.oauth2.sample.domain.email.service.EmailConfirmService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.text.SimpleDateFormat;
import java.util.*;
import java.util.regex.Pattern;

@SpringBootTest
class SampleApplicationTests {
	@Autowired
	public AuthenticationManager authenticationManager;

	@Autowired
	public EmailConfirmService emailConfirmService;

	@Autowired
	public PasswordEncoder passwordEncoder;

	@Test
	void contextLoads() {
		System.out.println("authenticationManager = " + authenticationManager);
	}

	@Test
	void passwordEncoderTest() {
		System.out.println("new Date() = " + new Date().getTime());
	}

	@Test
	void simpleDateFormat() {
		Date date = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("YYYY-MM-dd HH:mm:ss");

		System.out.println(String.format("sdf.format = " + sdf.format(date)));
	}

	@Test
	void listToString() throws JsonProcessingException {
		System.out.println("SelectChatListRequest.SelectType.LOAD.name() = " + SelectChatListRequest.SelectType.LOAD.name());
    }

	@Test
	void send() {
//		EmailConfirmToken emailConfirmToken = emailConfirmService.createEmailConfirmToken("wooae1234@gmail.com");

		boolean matches = Pattern.matches("^[a-zA-Z0-9+-\\_.]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$", "wooae1234@gmail.com");

		System.out.println("matches = " + matches);

	}
}
