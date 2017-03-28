package com.core.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.core.pojo.Category;

public interface CategoryMapper {
    int deleteByPrimaryKey(String id);

    int insert(Category record);

    int insertSelective(Category record);

    Category selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(Category record);

    int updateByPrimaryKey(Category record);

    List<Category> listCategory(@Param(value = "name") String name, @Param(value = "start") int start,
            @Param(value = "limit") int limit);

    int countCategory();
}
