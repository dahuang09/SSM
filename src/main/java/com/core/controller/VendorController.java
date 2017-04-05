// Copyright (c) 1998-2017 Core Solutions Limited. All rights reserved.
// ============================================================================
// CURRENT VERSION CNT.5.0.1
// ============================================================================
// CHANGE LOG
// CNT.5.0.1 : 2017-XX-XX, damon.huang, creation
// ============================================================================
package com.core.controller;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang.ObjectUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.core.pojo.Vendor;
import com.core.service.IVendorService;

/**
 * @author damon.huang
 *
 */
@RestController
@RequestMapping("/vendor")
public class VendorController {
    private final IVendorService iVendorService;

    private static Logger logger = Logger.getLogger(VendorController.class);

    @Autowired
    public VendorController(final IVendorService iVendorService) {
        this.iVendorService = iVendorService;
    }

    @RequestMapping(value="/add", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> addVendor(@RequestBody final Vendor vendor){
        final Map<String, Object> map = new HashMap<String, Object>();
        try {
            final String vendorNo = iVendorService.addVendor(vendor);
            map.put("success", true);
            map.put("bizNo", vendorNo);
        } catch (final Throwable e) {
            logger.error("添加供应商失败", e);
        }
        return map;
    }

    @RequestMapping(path="/listVendor", method=RequestMethod.POST)
    public Map<String, Object> listVendor(@RequestBody final Map<String, Object> parameters){
        final Object nameObj = parameters.get("name");
        final Object startObj = parameters.get("start");
        final Object limitObj =  parameters.get("limit");
        final String name = ObjectUtils.toString(nameObj);
        final int start = Integer.parseInt(ObjectUtils.toString(startObj));
        final int limit = Integer.parseInt(ObjectUtils.toString(limitObj));
        final Map<String, Object> map = new HashMap<String, Object>();
        final Map<String, ?> returnMap = iVendorService.listVendor(name, start, limit);
        map.put("vendorList", returnMap.get("vendorList"));
        map.put("total", returnMap.get("total"));
        map.put("success", true);
        return map;
    }

    @RequestMapping(path="/searchVendor", method=RequestMethod.POST)
    public Map<String, Object> searchVendor(@RequestBody final Map<String, Object> parameters){
        final Object startObj = parameters.get("start");
        final Object limitObj =  parameters.get("limit");
        final int start = Integer.parseInt(ObjectUtils.toString(startObj));
        final int limit = Integer.parseInt(ObjectUtils.toString(limitObj));
        final Map<String, Object> map = new HashMap<String, Object>();
        final Map<String, ?> returnMap = iVendorService.listVendor("", start, limit);
        map.put("vendorList", returnMap.get("vendorList"));
        map.put("total", returnMap.get("total"));
        map.put("success", true);
        return map;
    }
}
