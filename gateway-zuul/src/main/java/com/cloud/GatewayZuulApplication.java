package com.cloud;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;

@EnableZuulProxy
@SpringBootApplication
public class GatewayZuulApplication {

	public static void main(String[] args) {
		new SpringApplicationBuilder(GatewayZuulApplication.class).web(true).run(args);
	}
}
