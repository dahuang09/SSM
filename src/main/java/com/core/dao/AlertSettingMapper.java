package com.core.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.core.pojo.AlertSetting;

public interface AlertSettingMapper {
    int deleteByPrimaryKey(String id);

    int insert(AlertSetting record);

    int insertSelective(AlertSetting record);

    AlertSetting selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(AlertSetting record);

    int updateByPrimaryKey(AlertSetting record);

    int countAlertSetting();

    List<AlertSetting> listAlertSetting(@Param(value = "name") String name, @Param(value = "start") int start,
            @Param(value = "limit") int limit);

    List<AlertSetting> alertAmount();
}
