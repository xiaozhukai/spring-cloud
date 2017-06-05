package com.cloud.user.controller;

import javax.annotation.Resource;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.cloud.user.pojo.User;
import com.cloud.user.service.UserService;

@RestController
public class UserController {
	
	@Resource
	private UserService userService;

	@GetMapping(value = "/user/findById/{id}")
	@ResponseBody
	public User findById(@PathVariable Long id){
		return userService.findOne(id);
	}
}
