package com.oauth2.sample;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SampleApplication {

	public static void main(String[] args) {
		SpringApplication.run(SampleApplication.class, args);
	}

}

//https://theheydaze.tistory.com/477
//https://ozofweird.tistory.com/586
//https://europani.github.io/spring/2022/01/15/036-oauth2-jwt.html#h-oauth2authenticationsuccesshandler
//https://spring.io/blog/2022/02/21/spring-security-without-the-websecurityconfigureradapter
//https://docs.spring.io/spring-security/reference/servlet/getting-started.html

//1.		토큰의 생명 주기를 굉장히 짧게 하는 방법 (5분 이내). 해당 시간이 지나면, 새롭게 토큰을 만든다.
//2.		시스템에서 최근에 만료된 토큰을 저장해 두는 것
//3.		서버 로그아웃 기능 자체를 없애고, 클라이언트에 토큰 삭제를 맡기는 방법 좋은 시스템의 경우엔 앞에 두가지 방법을 선택한다. 그러나 두 문제의 해결책에서 볼 수 있는 것처럼, 두 방법은 모두 중앙에서 인증을 관리해야 하는 시스템이 필요하며 이는 더 이상 JWT의 장점을 유효하지 않게 만든다.