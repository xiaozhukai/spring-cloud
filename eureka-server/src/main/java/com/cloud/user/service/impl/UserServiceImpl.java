package com.cloud.user.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.cloud.user.dao.UserDao;
import com.cloud.user.pojo.User;
import com.cloud.user.service.UserService;

@Service
public class UserServiceImpl implements UserService{
	@Resource
	private UserDao userDao;
	

	@Override
	public User findOne(Long id) {		
		return userDao.findOne(id);
	}

}
