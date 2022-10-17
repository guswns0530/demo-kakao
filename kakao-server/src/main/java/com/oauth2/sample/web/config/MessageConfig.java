package com.oauth2.sample.web.config;

import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.context.support.ResourceBundleMessageSource;

import java.util.Locale;

@Primary
@Configuration
public class MessageConfig {
    @Bean
    public MessageSource messageSource() {
        Locale.setDefault(Locale.KOREA);
        ReloadableResourceBundleMessageSource messageSource = new ReloadableResourceBundleMessageSource();

        messageSource.setDefaultEncoding("UTF-8");
        messageSource.setBasenames("classpath:/messages/api_error_message", "classpath:/messages/api_response_message");

        return messageSource;
    }
}
