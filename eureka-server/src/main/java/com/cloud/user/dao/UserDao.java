package com.cloud.user.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cloud.user.pojo.User;

public interface UserDao extends JpaRepository<User, Long> {

}
