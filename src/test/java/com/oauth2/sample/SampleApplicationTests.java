package com.oauth2.sample;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.text.SimpleDateFormat;
import java.util.*;

@SpringBootTest
class SampleApplicationTests {
	@Autowired
	public AuthenticationManager authenticationManager;

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
		ArrayList<Object> objects = new ArrayList<>();
		objects.add("1");
		objects.add("2");
		objects.add("3");
		objects.add("4");


		String s = new ObjectMapper().writeValueAsString(objects);

		System.out.println("s = " + s);
    }

}
