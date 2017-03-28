package com.core.dao;

import com.core.pojo.BizNoDefinition;

public interface BizNoDefinitionMapper {
    int deleteByPrimaryKey(String id);

    int insert(BizNoDefinition record);

    int insertSelective(BizNoDefinition record);

    BizNoDefinition selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(BizNoDefinition record);

    int updateByPrimaryKey(BizNoDefinition record);

    BizNoDefinition selectCurrentBizNo(String module);

    void increaseBizNo(String module);

    void resetBizNo(String module);
}
