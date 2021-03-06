package com.cloud;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.cloud.netflix.ribbon.RibbonClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.client.RestTemplate;

import com.config.LoadConfiguration;

@EnableDiscoveryClient
@SpringBootApplication
@RibbonClient(name = "EUREKA-SERVER" , configuration = LoadConfiguration.class)
public class RibbonApplication {
	
	@Bean
	@LoadBalanced
	RestTemplate restTemplate(){
		return new RestTemplate();
	}
	

	public static void main(String[] args) {
		SpringApplication.run(RibbonApplication.class, args);
	}
}
