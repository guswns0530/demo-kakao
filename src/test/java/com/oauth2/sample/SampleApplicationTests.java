package com.oauth2.sample;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.AuthenticationManager;

@SpringBootTest
class SampleApplicationTests {
	@Autowired
	public AuthenticationManager authenticationManager;

	@Test
	void contextLoads() {
		System.out.println("authenticationManager = " + authenticationManager);
	}

}
