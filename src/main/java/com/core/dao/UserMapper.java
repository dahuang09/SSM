package com.core.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.core.pojo.User;

public interface UserMapper {
    int deleteByPrimaryKey(String id);

    int insert(User record);

    int insertSelective(User record);

    User selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(User record);

    int updateByPrimaryKey(User record);

    List<User> listUser(@Param(value = "username") String username, @Param(value = "start") int start,
            @Param(value = "limit") int limit);

    List<User> searchUser(int offset, int rows);

    int countUser();

    User validate(@Param(value = "username") String username, @Param(value = "password") String password);

    void updateByUserNo(@Param(value = "username") String username,
    		@Param(value = "password") String password, @Param(value="userno") String userNo);
}
