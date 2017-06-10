package com.cloud.user.client;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.cloud.user.pojo.User;

/**
 * 
 * @ClassName: UserFeignClient
 * @Description: TODO 实现一个 增强类 StoreClient.java 配置的是服务的提供方注册表的名称
 * @author kai
 * @date 2017年6月7日 下午11:50:09
 * @version V1.0
 *
 */
@FeignClient("EUREKA-SERVER")
public interface UserFeignClient {

	/**
	 * 
	 * @Description: TODO 直接在controller的类调用  get提交
	 * @author kai  
	 * @date 2017年6月7日 下午11:54:31  
	 *
	 */
	@RequestMapping(method = RequestMethod.GET,value = "/user/findById/{id}")
	public User findById(@PathVariable("id") Long id);
	
	
	/**
	 * 
	 * @Description: TODO 直接controller的类调用  post提交
	 * @author kai  
	 * @date 2017年6月8日 下午9:56:30  
	 *
	 */
	@RequestMapping(method = RequestMethod.POST,value = "/user")
	public User postUser(@RequestBody User user);
}
