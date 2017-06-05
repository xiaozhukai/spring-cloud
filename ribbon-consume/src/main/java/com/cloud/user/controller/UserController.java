package com.cloud.user.controller;

import javax.annotation.Resource;

import org.springframework.web.bind.annotation.RestController;

import com.cloud.user.service.UserService;

@RestController
public class UserController {
	
	@Resource
	private UserService userService;

}
