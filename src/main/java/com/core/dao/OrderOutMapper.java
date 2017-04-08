package com.core.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.core.pojo.OrderOut;

public interface OrderOutMapper {
    int deleteByPrimaryKey(String id);

    int insert(OrderOut record);

    int insertSelective(OrderOut record);

    OrderOut selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(OrderOut record);

    int updateByPrimaryKey(OrderOut record);

    int countOrderOut();

    List<OrderOut> listOrderOut(@Param(value = "name") String name, @Param(value = "start") int start,
            @Param(value = "limit") int limit);

    List<OrderOut> listOrderOutByItemId(String itemId);

    void updateOrderOutAmountBy(String orderOutId, int amount, int increaseFlag);
}
