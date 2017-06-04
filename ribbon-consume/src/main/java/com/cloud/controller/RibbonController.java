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
import com.cloud.service.HelloService;

@RestController
public class RibbonController {
	private static final Logger LOGGER = LoggerFactory.getLogger(RibbonController.class);
	
	@Resource
	HelloService helloService;
	@Resource
	private LoadBalancerClient loadBalancerClient;
	@Resource
	private RestTemplate restTemplate;
	
	@GetMapping(value="/ribbon-consumer")
	public String helloConsumer(){
		return helloService.helloService();
	}
	
	@GetMapping(value="/user/{id}")
	public User findById(@PathVariable Long id){
		//EUREKA-SERVER这个就是虚拟的主机名
		return this.restTemplate.getForObject("http://EUREKA-CLIENT/" + id, User.class);
	}
	
	@GetMapping(value="/log-user-instance")
	public void logUserInstance(){
		ServiceInstance serviceInstance = this.loadBalancerClient.choose("EUREKA-CLIENT");
		RibbonController.LOGGER.info("{}:{}:{}", serviceInstance.getServiceId(), serviceInstance.getHost(),serviceInstance.getPort());
	}

}
