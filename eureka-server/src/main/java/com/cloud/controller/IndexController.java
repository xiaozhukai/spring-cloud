package com.cloud.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class IndexController {
	
	
	private final Logger logger = Logger.getLogger(getClass());
	
	@Autowired
	private DiscoveryClient client;
	
	@RequestMapping("/")
	public ModelAndView log(HttpServletRequest request,HttpServletResponse response){
		ServiceInstance instance = client.getLocalServiceInstance();
		logger.info("zzzzzzzzym,host:"+instance.getHost()+",service_id"+instance.getServiceId());
		ModelAndView mv = new ModelAndView("index");
		return mv;
	}
	
	
	@RequestMapping("/arithmetic")
	public String query(HttpServletRequest request,HttpServletResponse response){
		return "arithmetic";
	}
	
	@RequestMapping("/appearance")
	public String register(HttpServletRequest request,HttpServletResponse response){
		return "appearance";
	}
	
	@RequestMapping("/wx")
	public String wx(HttpServletRequest request,HttpServletResponse response){
		return null;
	}
	
	
	@RequestMapping("/testJson")
	public String testJson(){
		return "test";
	}
}
