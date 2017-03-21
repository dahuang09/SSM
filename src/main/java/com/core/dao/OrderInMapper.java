package com.core.dao;

import com.core.pojo.OrderIn;

public interface OrderInMapper {
    int deleteByPrimaryKey(String id);

    int insert(OrderIn record);

    int insertSelective(OrderIn record);

    OrderIn selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(OrderIn record);

    int updateByPrimaryKey(OrderIn record);
}