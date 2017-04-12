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

import javax.annotation.Resource;

import org.apache.commons.lang.ObjectUtils;
import org.apache.log4j.Logger;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.core.pojo.AlertSetting;
import com.core.service.IAlertSettingService;

/**
 * @author damon.huang
 *
 */
@RestController
@RequestMapping("/alertSetting")
public class AlertSettingContoller {

    @Resource
    private IAlertSettingService alertSettingService;
    private static Logger logger = Logger.getLogger(AlertSettingContoller.class);

    @RequestMapping(value="/add", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> addAlertSetting(@RequestBody final AlertSetting alertSetting){
        final Map<String, Object> map = new HashMap<String, Object>();
        try {
            final String alertSettingNo = alertSettingService.addAlertSetting(alertSetting);
            map.put("success", true);
            map.put("bizNo", alertSettingNo);
        } catch (final Throwable e) {
            logger.error("添加预警配置失败", e);
        }
        return map;
    }

    @RequestMapping(path="/list", method=RequestMethod.POST)
    public Map<String, Object> list(@RequestBody final Map<String, Object> parameters){
        final Object nameObj = parameters.get("name");
        final Object startObj = parameters.get("start");
        final Object limitObj =  parameters.get("limit");
        final String name = ObjectUtils.toString(nameObj);
        final int start = Integer.parseInt(ObjectUtils.toString(startObj));
        final int limit = Integer.parseInt(ObjectUtils.toString(limitObj));
        final Map<String, Object> map = new HashMap<String, Object>();
        final Map<String, ?> returnMap = alertSettingService.listAlertSetting(name, start, limit);
        map.put("alertSettingList", returnMap.get("alertSettingList"));
        map.put("total", returnMap.get("total"));
        map.put("success", true);
        return map;
    }
}
