package com.cloud.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cloud.user.pojo.User;

public interface UserRepository extends JpaRepository<User, Long> {

}
