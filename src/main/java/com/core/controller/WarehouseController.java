// Copyright (c) 1998-2017 Core Solutions Limited. All rights reserved.
// ============================================================================
// CURRENT VERSION CNT.5.0.1
// ============================================================================
// CHANGE LOG
// CNT.5.0.1 : 2017-XX-XX, damon.huang, creation
// ============================================================================
package com.core.controller;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.ObjectUtils;
import org.apache.log4j.Logger;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.type.TypeReference;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.core.pojo.Vendor;
import com.core.pojo.Warehouse;
import com.core.service.IWarehouseService;

/**
 * @author damon.huang
 *
 */
@RestController
@RequestMapping("/warehouse")
public class WarehouseController {
    private final IWarehouseService iWarehouseService;

    private static Logger logger = Logger.getLogger(WarehouseController.class);

    @Autowired
    public WarehouseController(final IWarehouseService iWarehouseService) {
        this.iWarehouseService = iWarehouseService;
    }

    @RequestMapping(value="/add", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> addWarehouse(@RequestBody final Warehouse warehouse){
        final Map<String, Object> map = new HashMap<String, Object>();
        try {
            final String warehouseNo = iWarehouseService.addWarehouse(warehouse);
            map.put("success", true);
            map.put("bizNo", warehouseNo);
        } catch (final Throwable e) {
            logger.error("添加仓库失败", e);
        }
        return map;
    }
    @RequestMapping(value="/update", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> updateWarehouse(@RequestBody final Map<String, Object> parameters){
    	final Map<String, Object> map = new HashMap<String, Object>();
    	final String jsonParam = (String) parameters.get("jsonParam");
        final ObjectMapper mapper = new ObjectMapper();
        mapper.registerSubtypes(Warehouse.class);
        try {
			final List<Warehouse> warehouses = mapper.readValue(jsonParam, new TypeReference<List<Warehouse>>(){});
			iWarehouseService.updateWarehouses(warehouses);
		} catch (Throwable e) {
			logger.error("修改仓库失败", e);
			map.put("success", false);
		}
        map.put("success", true);
        return map;
    }

    @RequestMapping(path="/listWarehouse", method=RequestMethod.POST)
    public Map<String, Object> listWarehouse(@RequestBody final Map<String, Object> parameters){
        final Object nameObj = parameters.get("name");
        final Object startObj = parameters.get("start");
        final Object limitObj =  parameters.get("limit");
        final String name = ObjectUtils.toString(nameObj);
        final int start = Integer.parseInt(ObjectUtils.toString(startObj));
        final int limit = Integer.parseInt(ObjectUtils.toString(limitObj));
        final Map<String, Object> map = new HashMap<String, Object>();
        final Map<String, ?> returnMap = iWarehouseService.listWarehouse(name, start, limit);
        map.put("warehouseList", returnMap.get("warehouseList"));
        map.put("total", returnMap.get("total"));
        map.put("success", true);
        return map;
    }

    @RequestMapping(path="/searchWarehouse", method=RequestMethod.POST)
    public Map<String, Object> searchWarehouse(@RequestBody final Map<String, Object> parameters){
        final Object startObj = parameters.get("start");
        final Object limitObj =  parameters.get("limit");
        final int start = Integer.parseInt(ObjectUtils.toString(startObj));
        final int limit = Integer.parseInt(ObjectUtils.toString(limitObj));
        final Map<String, Object> map = new HashMap<String, Object>();
        final Map<String, ?> returnMap = iWarehouseService.listWarehouse("", start, limit);
        map.put("warehouseList", returnMap.get("warehouseList"));
        map.put("total", returnMap.get("total"));
        map.put("success", true);
        return map;
    }
}
