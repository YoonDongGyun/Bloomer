package com.exmaple.flory;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
public class FloryApplication {

	public static void main(String[] args) {
		SpringApplication.run(FloryApplication.class, args);
	}

}
