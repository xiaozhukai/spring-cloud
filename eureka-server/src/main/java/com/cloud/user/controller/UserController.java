package com.cloud.user.controller;

import javax.annotation.Resource;

import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.cloud.user.pojo.User;
import com.cloud.user.service.UserService;
import com.netflix.appinfo.InstanceInfo;
import com.netflix.discovery.EurekaClient;

@RestController
public class UserController {
	
	@Resource
	private UserService userService;
	
	@Resource
	private EurekaClient eurekaClient;
	
	@Resource
	private DiscoveryClient discoveryClient;

	@GetMapping(value = "/user/findById/{id}")
	@ResponseBody
	public User findById(@PathVariable Long id){
		return userService.findOne(id);
	}
	
	/**
	 * 
	 * @Description: TODO 可以通过注册表名查询到ip+端口信息
	 * @author kai  
	 * @date 2017年6月6日 下午11:39:33  
	 *
	 */
	@GetMapping("/eureka-instance")
	@ResponseBody
	public String serviceUrl(){
		InstanceInfo instance = eurekaClient.getNextServerFromEureka("EUREKA-SERVER", false);
		return instance.getHomePageUrl();
	}
	
	
	/**
	 * 
	 * @Description: TODO 可以通过注册表名查询到ip+端口信息
	 * @author kai  
	 * @date 2017年6月6日 下午11:39:33  
	 *
	 */
	@GetMapping("/instance-info")
	@ResponseBody
	public ServiceInstance showUrl(){
		ServiceInstance localServiceInstance = discoveryClient.getLocalServiceInstance();
		return localServiceInstance;
		
	}
}
