package com.cloud;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient
@SpringBootApplication
public class SpringCloudApplication {
	
	//注释
	public static void main(String[] args) {
		SpringApplication.run(SpringCloudApplication.class, args);
	}
}
