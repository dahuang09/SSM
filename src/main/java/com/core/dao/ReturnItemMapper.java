package com.core.dao;

import com.core.pojo.ReturnItem;

public interface ReturnItemMapper {
    int deleteByPrimaryKey(String id);

    int insert(ReturnItem record);

    int insertSelective(ReturnItem record);

    ReturnItem selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(ReturnItem record);

    int updateByPrimaryKey(ReturnItem record);
}