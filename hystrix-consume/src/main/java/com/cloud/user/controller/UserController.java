package com.cloud.user.controller;

import javax.annotation.Resource;

import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.loadbalancer.LoadBalancerClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.cloud.user.pojo.User;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;

@RestController
public class UserController {

	@Resource
	private RestTemplate restTemplate;

	
	/**
	 * 
	 * @Description: TODO 使用@HystrixCommand对controller方法实现断路机制
	 * @author kai  
	 * @date 2017年6月10日 下午6:07:57  
	 *
	 */
	@HystrixCommand(fallbackMethod = "findByIdFallBack")
	@GetMapping(value = "/user/findById/{id}")
	@ResponseBody
	public User findById(@PathVariable Long id){
		return this.restTemplate.getForObject("http://EUREKA-SERVER/user/findById/" + id, User.class);
	}
	
	/**
	 * 
	 * @Description: TODO 断路器实现的方法 ，名称必须fallbackMethod后面的名称一样，当上面方法连接到eureka注册表中的服务提供方无法连接的时候，就直接走到对应下面这个方法里面
	 * @author kai  
	 * @date 2017年6月10日 下午6:10:03  
	 *
	 */
	public User findByIdFallBack(Long id){
		User user = new User();
		user.setId(0L);
		return user;
	}
}
