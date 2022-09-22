package com.oauth2.sample;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Timer;
import java.util.TimerTask;

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
		String encode = passwordEncoder.encode("1234");
	}

}
