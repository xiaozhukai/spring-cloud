package com.config;

import javax.annotation.Resource;

import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.netflix.client.config.IClientConfig;
import com.netflix.loadbalancer.IRule;
import com.netflix.loadbalancer.RandomRule;

@Configuration
public class LoadConfiguration {
	
	@Resource
	private IClientConfig config;
	
	/**
	 * 
	 * @Description: TODO 这个设置之后废除算法访问，使用随机访问
	 * @author kai  
	 * @date 2017年6月7日 下午10:02:32  
	 *
	 */
	@Bean
	@ConditionalOnMissingBean
	public IRule ribbonRule(IClientConfig config){
		return new RandomRule();
		
	}

}
