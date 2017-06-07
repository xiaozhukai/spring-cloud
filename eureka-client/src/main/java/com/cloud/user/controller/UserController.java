package com.cloud.user.controller;

import javax.annotation.Resource;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.cloud.user.pojo.User;

@RestController
public class UserController {
	
	
	@Resource
	private RestTemplate restTemplate;
	
	@GetMapping(value = "/user/findById/{id}")
	public User findById(@PathVariable Long id){
		return this.restTemplate.getForObject("http://localhost:8000//user/findById/" + id, User.class);
	}

	
}
