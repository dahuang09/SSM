package com.core.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.core.pojo.OrderIn;

public interface OrderInMapper {
    int deleteByPrimaryKey(String id);

    int insert(OrderIn record);

    int insertSelective(OrderIn record);

    OrderIn selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(OrderIn record);

    int updateByPrimaryKey(OrderIn record);

    int countOrderIn();

    List<OrderIn> listOrderIn(@Param(value = "name") String name, @Param(value = "start") int start,
            @Param(value = "limit") int limit);

    List<OrderIn> alertExpiredDate();
}
