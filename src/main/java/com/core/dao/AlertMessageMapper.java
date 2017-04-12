package com.core.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.core.pojo.AlertMessage;

public interface AlertMessageMapper {
    int deleteByPrimaryKey(String id);

    int insert(AlertMessage record);

    int insertSelective(AlertMessage record);

    AlertMessage selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(AlertMessage record);

    int updateByPrimaryKey(AlertMessage record);

    int count();

    List<AlertMessage> list(@Param(value="searchValue") String searchValue,
            @Param(value="limit") int limit, @Param(value="start") int start);
}
