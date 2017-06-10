package com.cloud.user.controller;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.cloud.user.client.UserFeignClient;
import com.cloud.user.pojo.User;

@RestController	
public class UserController {
	
	@Autowired
	private UserFeignClient userFeignClient;
	
	/**
	 * 
	 * @Description: TODO 通过StoreClient 增强请求注册服务方
	 * @author kai  
	 * @date 2017年6月7日 下午10:11:53  
	 *
	 */
	@GetMapping(value = "/user/findById/{id}")
	@ResponseBody
	public User findById(@PathVariable Long id){
		return userFeignClient.findById(id);
	}
	
	/**
	 * 
	 * @Description: TODO 
	 * @author kai  
	 * @date 2017年6月8日 下午9:53:18  
	 *
	 */
	@PostMapping("/user")
	public User postUser(@RequestBody User user){
		return user;
	}
	
	
}
