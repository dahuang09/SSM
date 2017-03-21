package com.core.dao;

import com.core.pojo.AlertSetting;

public interface AlertSettingMapper {
    int deleteByPrimaryKey(String id);

    int insert(AlertSetting record);

    int insertSelective(AlertSetting record);

    AlertSetting selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(AlertSetting record);

    int updateByPrimaryKey(AlertSetting record);
}