package com.cloud.service;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;

@Service
public class HelloService {

	@Resource
	RestTemplate restTemplate;
	
	@HystrixCommand(fallbackMethod = "helloFallback")
	public String helloService(){
		return restTemplate.getForEntity("http://EUREKA-CLIENT/ribbonConsumer", String.class).getBody();
	}
	public String helloFallback(){
		return "error";
	}
}
