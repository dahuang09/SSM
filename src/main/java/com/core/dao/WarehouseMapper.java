package com.core.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.core.pojo.Warehouse;

public interface WarehouseMapper {
    int deleteByPrimaryKey(String id);

    int insert(Warehouse record);

    int insertSelective(Warehouse record);

    Warehouse selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(Warehouse record);

    int updateByPrimaryKey(Warehouse record);

    List<Warehouse> listWarehouse(@Param(value = "name") String warehouseName, @Param(value = "start") int start,
            @Param(value = "limit") int limit);

    List<Warehouse> searchWarehouse(int offset, int rows);

    int countWarehouse();

	void updateByWarehouseNo(@Param(value = "name") String name,@Param(value = "remark") String remark,
			@Param(value="warehouseno") String warehouseNo);
}
