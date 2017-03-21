package com.core.dao;

import com.core.pojo.Warehouse;

public interface WarehouseMapper {
    int deleteByPrimaryKey(String id);

    int insert(Warehouse record);

    int insertSelective(Warehouse record);

    Warehouse selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(Warehouse record);

    int updateByPrimaryKey(Warehouse record);
}