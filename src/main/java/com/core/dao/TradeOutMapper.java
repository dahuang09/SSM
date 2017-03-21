package com.core.dao;

import com.core.pojo.TradeOut;

public interface TradeOutMapper {
    int deleteByPrimaryKey(String id);

    int insert(TradeOut record);

    int insertSelective(TradeOut record);

    TradeOut selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(TradeOut record);

    int updateByPrimaryKey(TradeOut record);
}