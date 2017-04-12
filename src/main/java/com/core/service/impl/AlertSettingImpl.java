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

import com.core.dao.AlertSettingMapper;
import com.core.dao.BizNoDefinitionMapper;
import com.core.dao.OrderInMapper;
import com.core.pojo.AlertSetting;
import com.core.pojo.BizNoDefinition;
import com.core.pojo.OrderIn;
import com.core.service.IAlertSettingService;
import com.core.util.UuidUtil;

/**
 * @author damon.huang
 *
 */
@Service("alertSettingService")
public class AlertSettingImpl implements IAlertSettingService {

    private final Logger log = Logger.getLogger(AlertSettingImpl.class);
    @Resource
    private AlertSettingMapper alertSettingMapper;
    private final String BIZ_SUFIX = "AS";
    private final String formatTemplate = "yyyy-MM-dd";
    @Resource
    private BizNoDefinitionMapper bizNoDefinitionMapper;
    @Resource
    private OrderInMapper orderInMapper;

    /* (non-Javadoc)
     * @see com.core.service.IAlertSettingService#addReturnItem(com.core.pojo.AlertSetting)
     */
    public String addAlertSetting(final AlertSetting alertSetting) throws Throwable {
        String bizNo = StringUtils.EMPTY;
        try {
            if (alertSetting == null) {
                log.error("alertSetting is null, plese check");
                return StringUtils.EMPTY;
            }
            setUUID(alertSetting);
            bizNo = generateBizNo();
            alertSetting.setAlertsettingcol(bizNo);
            this.alertSettingMapper.insert(alertSetting);
        } catch (final Throwable e) {
            throw e;
        }
        try {
            bizNoDefinitionMapper.increaseBizNo("alertSetting");
        } catch (final Throwable e) {
            throw e;
        }
        return bizNo;
    }

    /**
     * @return
     */
    private String generateBizNo() {
        int currrentBizNo = 1;
        final BizNoDefinition bizNoDefinition = bizNoDefinitionMapper.selectCurrentBizNo("alertSetting");
        if (bizNoDefinition != null) {
            currrentBizNo = bizNoDefinition.getCurrentno();
        } else {
            bizNoDefinitionMapper.resetBizNo("alertSetting");
        }
        final String dateStr = new SimpleDateFormat(formatTemplate).format(new Date());
        final String bizNo = BIZ_SUFIX + StringUtils.replace(dateStr, "-", "")
                + String.valueOf(currrentBizNo);
        return bizNo;
    }
    /**
     * @param user
     * @return
     */
    private void setUUID(final AlertSetting alterSetting) {
        String uuid = alterSetting.getId();
        uuid = StringUtils.isNotBlank(uuid) ? uuid : UuidUtil.createUUID();
        alterSetting.setId(uuid);
    }


    /* (non-Javadoc)
     * @see com.core.service.IAlertSettingService#listAlertSetting(java.lang.String, int, int)
     */
    public Map<String, ?> listAlertSetting(final String name, final int start, final int limit) {
        final Map<String, Object> map = new HashMap<String, Object>();
        final int total = alertSettingMapper.countAlertSetting();
        final List<AlertSetting> alertSettingList = alertSettingMapper.listAlertSetting(name, start, limit);
        map.put("total", total);
        map.put("alertSettingList", alertSettingList);
        return map;
    }

    /* (non-Javadoc)
     * @see com.core.service.IAlertSettingService#needToSendEmail()
     */
    public Map<String, Object> needToSendEmail() {
        final List<AlertSetting> alertSettings = alertSettingMapper.alertAmount();
        final List<OrderIn> orderIns = orderInMapper.alertExpiredDate();
        final Map<String, Object> map = new HashMap<String, Object>();
        map.put("alertSettings", alertSettings);
        map.put("orderIns", orderIns);
        return map;
    }
}
