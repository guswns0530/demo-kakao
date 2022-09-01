package com.oauth2.sample;

import com.nimbusds.jose.util.Base64;
import com.oauth2.sample.web.security.dto.Role;
import com.oauth2.sample.web.security.dto.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.util.SerializationUtils;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.ObjectOutputStream;

@SpringBootTest
class SampleApplicationTests {
	@Autowired
	public AuthenticationManager authenticationManager;

	@Test
	void contextLoads() {
		System.out.println("authenticationManager = " + authenticationManager);
	}
}
