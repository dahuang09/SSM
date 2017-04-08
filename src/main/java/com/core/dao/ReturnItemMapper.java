package com.core.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.core.pojo.Item;
import com.core.pojo.ReturnItem;

public interface ReturnItemMapper {
    int deleteByPrimaryKey(String id);

    int insert(ReturnItem record);

    int insertSelective(ReturnItem record);

    ReturnItem selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(ReturnItem record);

    int updateByPrimaryKey(ReturnItem record);

    int countReturnItem();

    List<Item> listReturnItem(@Param(value = "name") String name, @Param(value = "start") int start,
            @Param(value = "limit") int limit);
}
