package com.core.dao;

import com.core.pojo.OrderOut;

public interface OrderOutMapper {
    int deleteByPrimaryKey(String id);

    int insert(OrderOut record);

    int insertSelective(OrderOut record);

    OrderOut selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(OrderOut record);

    int updateByPrimaryKey(OrderOut record);
}