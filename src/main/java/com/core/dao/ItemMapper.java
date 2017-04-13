package com.core.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.core.pojo.Item;

public interface ItemMapper {
    int deleteByPrimaryKey(String id);

    int insert(Item record);

    int insertSelective(Item record);

    Item selectByPrimaryKey(String id);

    String selectIdByItemNo(String itemNo);

    int updateByPrimaryKeySelective(Item record);

    int updateByPrimaryKey(Item record);

    int countItem();

    void increaseItemActualStock(@Param(value="itemNo")String itemNo, @Param(value="actualStock") int actualStock);

    void increaseItemActualStockById(@Param(value="itemId")String itemId, @Param(value="amount") int amount);

    void reduceItemActualStock(@Param(value="itemNo")String itemNo, @Param(value="actualStock") int actualStock);

    void reduceActualStockById(@Param(value="itemId")String itemId, @Param(value="amount") int amount);

    int countItemByCategoryNo(String categoryno);

    List<Item> listItem(@Param(value = "name") String name, @Param(value = "start") int start,
            @Param(value = "limit") int limit);

    List<Item> listItemInCategory(@Param(value = "categoryno") String name);

    List<Item> listAvailableItem(@Param(value = "categoryno") String name);

    List<Item> listItemInCategoryId(@Param(value = "id") String categoryId);

    List<Item> searchItem();
}
