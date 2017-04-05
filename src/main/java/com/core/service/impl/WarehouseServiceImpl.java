// Copyright (c) 1998-2017 Core Solutions Limited. All rights reserved.
// ============================================================================
// CURRENT VERSION CNT.5.0.1
// ============================================================================
// CHANGE LOG
// CNT.5.0.1 : 2017-XX-XX, damon.huang, creation
// ============================================================================
package com.core.service.impl;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.core.dao.BizNoDefinitionMapper;
import com.core.dao.WarehouseMapper;
import com.core.exception.ServiceException;
import com.core.pojo.BizNoDefinition;
import com.core.pojo.Warehouse;
import com.core.service.IWarehouseService;
import com.core.util.UuidUtil;
@Service("warehouseService")
public class WarehouseServiceImpl implements IWarehouseService {
    private final String WAREHOUSE_SUFIX = "WH";
    private final String formatTemplate = "yyyy-MM-dd";
    private final Logger log = Logger.getLogger(WarehouseServiceImpl.class);
    @Resource
    private WarehouseMapper warehouseMapper;
    @Resource
    private BizNoDefinitionMapper bizNoDefinitionMapper;
    /* (non-Javadoc)
     * @see com.core.service.IWarehouseService#getWarehouseById(java.lang.String)
     */
    public Warehouse getWarehouseById(final String warehouseId) throws ServiceException {
        try {
            return this.warehouseMapper.selectByPrimaryKey(warehouseId);
        } catch (final Exception e) {
            throw new ServiceException("根据仓库编号查询用户失败", e);
        }
    }

    /* (non-Javadoc)
     * @see com.core.service.IWarehouseService#addWarehouse(com.core.pojo.Warehouse)
     */
    public String addWarehouse(final Warehouse warehouse) throws Throwable {
        String bizNo = StringUtils.EMPTY;
        try {
            if (warehouse == null) {
                log.error("Warehouse is null, plese check");
                return StringUtils.EMPTY;
            }
            setUUID(warehouse);
            bizNo = generateWarehouseNo();
            warehouse.setWarehouseno(bizNo);
            warehouse.setIddeleted(0);
            this.warehouseMapper.insert(warehouse);
        } catch (final Throwable e) {
            throw e;
        }
        try {
            bizNoDefinitionMapper.increaseBizNo("warehouse");
        } catch (final Throwable e) {
            throw e;
        }
        return bizNo;
    }

    private String generateWarehouseNo() {
        int currrentWarehouseNo = 1;
        final BizNoDefinition bizNoDefinition = bizNoDefinitionMapper.selectCurrentBizNo("warehouse");
        if (bizNoDefinition != null) {
            currrentWarehouseNo = bizNoDefinition.getCurrentno();
        } else {
            bizNoDefinitionMapper.resetBizNo("warehouse");
        }
        final String dateStr = new SimpleDateFormat(formatTemplate).format(new Date());
        final String bizNo = WAREHOUSE_SUFIX + StringUtils.replace(dateStr, "-", "")
                + String.valueOf(currrentWarehouseNo);
        return bizNo;
    }
    private void setUUID(final Warehouse warehouse) {
        String uuid = warehouse.getId();
        uuid = StringUtils.isNotBlank(uuid) ? uuid : UuidUtil.createUUID();
        warehouse.setId(uuid);
    }

    /* (non-Javadoc)
     * @see com.core.service.IUserService#searchUser()
     */
    public List<Warehouse> searchWarehouse() throws ServiceException {
        // TODO Auto-generated method stub
        return null;
    }

    /* (non-Javadoc)
     * @see com.core.service.IWarehouseService#listWarehouse(java.lang.String, int, int)
     */
    public Map<String, ?> listWarehouse(final String warehouseName, final int start, final int limit) {
        final Map<String, Object> map = new HashMap<String, Object>();
        final int total = warehouseMapper.countWarehouse();
        final List<Warehouse> warehouseList = warehouseMapper.listWarehouse(warehouseName, start, limit);
        map.put("total", total);
        map.put("warehouseList", warehouseList);
        return map;
    }


}
