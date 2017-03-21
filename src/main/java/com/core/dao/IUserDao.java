package com.core.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.core.pojo.User;

@Repository
public interface IUserDao {
    int deleteByPrimaryKey(String id);
    User selectByPrimaryKey(@Param("id") String id);
    void addUser(User user);
}
