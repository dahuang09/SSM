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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.core.service.IAlertMessageService;

/**
 * @author damon.huang
 *
 */
@RestController("alertMessage")
public class AlertMessageController {
    @Resource
    private IAlertMessageService alertMessageService;

    @RequestMapping(path="/list", method=RequestMethod.POST)
    public Map<String, Object> listItem(@RequestBody final Map<String, Object> parameters){
        final Object nameObj = parameters.get("name");
        final Object startObj = parameters.get("start");
        final Object limitObj =  parameters.get("limit");
        final String name = ObjectUtils.toString(nameObj);
        final int start = Integer.parseInt(ObjectUtils.toString(startObj));
        final int limit = Integer.parseInt(ObjectUtils.toString(limitObj));
        final Map<String, Object> map = new HashMap<String, Object>();
        final Map<String, ?> returnMap = alertMessageService.list(name, start, limit);
        map.put("list", returnMap.get("list"));
        map.put("total", returnMap.get("total"));
        map.put("success", true);
        return map;
    }
}
