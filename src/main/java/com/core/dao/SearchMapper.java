package com.core.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.core.pojo.Search;

public interface SearchMapper {
    int deleteByPrimaryKey(String id);

    int insert(Search record);

    int insertSelective(Search record);

    Search selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(Search record);

    int updateByPrimaryKey(Search record);
    List<Search> listSearch(@Param(value = "name") String searchName, @Param(value = "start") int start,
            @Param(value = "limit") int limit);

    List<Search> searchSearch(int offset, int rows);


	int countSearch();
}
