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

@RestController
public class UserController {

	@Resource
	private RestTemplate restTemplate;
	
	@Resource
	private LoadBalancerClient loadBalancerClient;
	
	
	/**
	 * 
	 * @Description: TODO 远程调用注册表服务
	 * @author kai  
	 * @date 2017年6月7日 下午10:11:53  
	 *
	 */
	@GetMapping(value = "/user/findById/{id}")
	@ResponseBody
	public User findById(@PathVariable Long id){
		return this.restTemplate.getForObject("http://EUREKA-SERVER/user/findById/" + id, User.class);
	}
	
	@GetMapping("/user/choose")
	public String choose(){
		ServiceInstance choose = loadBalancerClient.choose("EUREKA-SERVER");
		System.out.println(choose);
		System.out.println(choose.getHost() +" : " + choose.getPort()+" : "+ choose.getServiceId());
		return null;
	}
	
}
