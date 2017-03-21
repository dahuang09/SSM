package com.core.dao;

import com.core.pojo.Vendor;

public interface VendorMapper {
    int deleteByPrimaryKey(String id);

    int insert(Vendor record);

    int insertSelective(Vendor record);

    Vendor selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(Vendor record);

    int updateByPrimaryKey(Vendor record);
}