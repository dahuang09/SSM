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

    int updateByVendorNo(Vendor vendor);
    List<Vendor> listVendor(@Param(value = "name") String vendorName, @Param(value = "start") int start,
            @Param(value = "limit") int limit);

    List<Vendor> searchVendor(int offset, int rows);

    int countVendor();


    void updateByVendorNo(@Param(value = "vendorname") String vendorName,
    @Param(value = "address") String address, @Param(value="vendorno") String vendorNo,
    @Param(value = "telno") String telno, @Param(value="email") String email,
    @Param(value = "remark") String remark, @Param(value="fax") String fax);
}
