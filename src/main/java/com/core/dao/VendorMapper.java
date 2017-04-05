package com.core.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.core.pojo.Vendor;

public interface VendorMapper {
    int deleteByPrimaryKey(String id);

    int insert(Vendor record);

    int insertSelective(Vendor record);

    Vendor selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(Vendor record);

    int updateByPrimaryKey(Vendor record);
    List<Vendor> listVendor(@Param(value = "name") String vendorName, @Param(value = "start") int start,
            @Param(value = "limit") int limit);

    List<Vendor> searchVendor(int offset, int rows);

    int countVendor();
}
