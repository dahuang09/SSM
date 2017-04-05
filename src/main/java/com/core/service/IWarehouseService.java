// Copyright (c) 1998-2016 Core Solutions Limited. All rights reserved.
// ============================================================================
// CURRENT VERSION CNT.5.0.1
// ============================================================================
// CHANGE LOG
// CNT.5.0.1 : 2016-XX-XX, damon.huang, creation
// ============================================================================
package com.core.service;

import java.util.List;
import java.util.Map;

import com.core.exception.ServiceException;
import com.core.pojo.Warehouse;

/**
 * @author damon.huang
 *
 */
public interface IWarehouseService {
    public Warehouse getWarehouseById(String warehouseId) throws ServiceException;
    public String addWarehouse(Warehouse warehouse) throws Throwable;
    Map<String, ?> listWarehouse(String warehouseName, int start, int limit);
    List<Warehouse> searchWarehouse() throws ServiceException;
}
