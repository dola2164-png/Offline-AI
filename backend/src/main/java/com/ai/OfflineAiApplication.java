package com.ai;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.ai", "com.controller", "com.service", "com.config", "com.dto"})
public class OfflineAiApplication {
    public static void main(String[] args) {
        SpringApplication.run(OfflineAiApplication.class, args);
    }
}