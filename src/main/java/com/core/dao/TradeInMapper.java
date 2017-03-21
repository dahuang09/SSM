package com.core.dao;

import com.core.pojo.TradeIn;

public interface TradeInMapper {
    int deleteByPrimaryKey(String id);

    int insert(TradeIn record);

    int insertSelective(TradeIn record);

    TradeIn selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(TradeIn record);

    int updateByPrimaryKey(TradeIn record);
}