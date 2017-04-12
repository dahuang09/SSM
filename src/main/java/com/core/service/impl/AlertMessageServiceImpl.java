// Copyright (c) 1998-2017 Core Solutions Limited. All rights reserved.
// ============================================================================
// CURRENT VERSION CNT.5.0.1
// ============================================================================
// CHANGE LOG
// CNT.5.0.1 : 2017-XX-XX, damon.huang, creation
// ============================================================================
package com.core.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.core.dao.AlertMessageMapper;
import com.core.pojo.AlertMessage;
import com.core.service.IAlertMessageService;

/**
 * @author damon.huang
 *
 */
@Service("alertMessgeService")
public class AlertMessageServiceImpl implements IAlertMessageService {

    @Resource
    private AlertMessageMapper alertMessageMapper;
    private final Logger logger = Logger.getLogger(AlertMessageServiceImpl.class);

    /* (non-Javadoc)
     * @see com.core.service.IAlertMessageService#list(java.lang.String, int, int)
     */
    public Map<String, Object> list(final String searchValue, final int limit, final int start) {
        final int total = alertMessageMapper.count();
        final List<AlertMessage> list = alertMessageMapper.list(searchValue, limit, start);
        final Map<String, Object> map = new HashMap<String, Object>();
        map.put("list", list);
        map.put("total", total);
        return map;
    }

}
