package com.flextime;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class FlextimeApiApplication {
    public static void main(String[] args) {
        SpringApplication.run(FlextimeApiApplication.class, args);
    }
}
