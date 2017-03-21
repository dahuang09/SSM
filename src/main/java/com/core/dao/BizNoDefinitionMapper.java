package com.core.dao;

import java.util.Map;

import com.core.pojo.BizNoDefinition;

public interface BizNoDefinitionMapper {
    int deleteByPrimaryKey(String id);

    int insert(BizNoDefinition record);

    int insertSelective(BizNoDefinition record);

    BizNoDefinition selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(BizNoDefinition record);

    int updateByPrimaryKey(BizNoDefinition record);

    int selectCurrentBizNo(String module);

    void updateBizNo(Map<String, Object> parameters);
}
