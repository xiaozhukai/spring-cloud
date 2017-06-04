package com.cloud.controller;

import javax.annotation.Resource;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.loadbalancer.LoadBalancerClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.cloud.pojo.User;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;

@RestController
public class HystrixController {

	private static final Logger LOGGER = LoggerFactory.getLogger(RibbonController.class);
	
	@Resource
	private LoadBalancerClient loadBalancerClient;
	@Resource
	private RestTemplate restTemplate;
	
	@HystrixCommand(fallbackMethod = "fallbackMethod")
	@GetMapping(value="/users/{id}")
	public User findById(@PathVariable Long id){
		//EUREKA-SERVER这个就是虚拟的主机名
		return this.restTemplate.getForObject("http://EUREKA-CLIENT/" + id, User.class);
	}
	
	public User findByIdFallbackMethod(Long id){
		User user = new User();
		user.setId(-1L);
		user.setName("默认用户");
		return user;
	}
	
	@GetMapping(value="/log-user-instances")
	public void logUserInstance(){
		ServiceInstance serviceInstance = this.loadBalancerClient.choose("EUREKA-CLIENT");
		HystrixController.LOGGER.info("{}:{}:{}", serviceInstance.getServiceId(), serviceInstance.getHost(),serviceInstance.getPort());
	}
}
