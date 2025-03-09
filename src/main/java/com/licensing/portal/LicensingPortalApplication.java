package com.licensing.portal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@SpringBootApplication
@EnableMongoAuditing
public class LicensingPortalApplication {
    public static void main(String[] args) {
        SpringApplication.run(LicensingPortalApplication.class, args);
    }
} 