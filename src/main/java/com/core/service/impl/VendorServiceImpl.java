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
import com.core.dao.VendorMapper;
import com.core.exception.ServiceException;
import com.core.pojo.BizNoDefinition;
import com.core.pojo.Vendor;
import com.core.service.IVendorService;
import com.core.util.UuidUtil;

/**
 * @author damon.huang
 *
 */
@Service("vendorService")
public class VendorServiceImpl implements IVendorService {
    private final String VENDOR_SUFIX = "Vendor";
    private final String formatTemplate = "yyyy-MM-dd";
    private final Logger log = Logger.getLogger(VendorServiceImpl.class);
    @Resource
    private VendorMapper vendorMapper;
    @Resource
    private BizNoDefinitionMapper bizNoDefinitionMapper;

    /* (non-Javadoc)
     * @see com.core.service.IVendorService#getVendorById(java.lang.String)
     */
    public Vendor getVendorById(final String vendorId) throws ServiceException {
        return null;
    }

    /* (non-Javadoc)
     * @see com.core.service.IVendorService#addVendor(com.core.pojo.Vendor)
     */
    public String addVendor(final Vendor vendor) throws Throwable {
        String bizNo = StringUtils.EMPTY;
        try {
            if (vendor == null) {
                log.error("Vendor is null, plese check");
                return StringUtils.EMPTY;
            }
            setUUID(vendor);
            bizNo = generateVendorNo();
            vendor.setVendorno(bizNo);
            vendor.setIsdeleted(0);
            this.vendorMapper.insert(vendor);
        } catch (final Throwable e) {
            throw e;
        }
        try {
            bizNoDefinitionMapper.increaseBizNo("vendor");
        } catch (final Throwable e) {
            throw e;
        }
        return bizNo;

    }

    /**
     * @return
     */
    private String generateVendorNo() {
        int currrentVendorNo = 1;
        final BizNoDefinition bizNoDefinition = bizNoDefinitionMapper.selectCurrentBizNo("vendor");
        if (bizNoDefinition != null) {
            currrentVendorNo = bizNoDefinition.getCurrentno();
        } else {
            bizNoDefinitionMapper.resetBizNo("vendor");
        }
        final String dateStr = new SimpleDateFormat(formatTemplate).format(new Date());
        final String bizNo = VENDOR_SUFIX + StringUtils.replace(dateStr, "-", "")
                + String.valueOf(currrentVendorNo);
        return bizNo;
    }

    private void setUUID(final Vendor vendor) {
        String uuid = vendor.getId();
        uuid = StringUtils.isNotBlank(uuid) ? uuid : UuidUtil.createUUID();
        vendor.setId(uuid);
    }

    public List<Vendor> searchVendor() {
        // TODO Auto-generated method stub
        return null;
    }

    /* (non-Javadoc)
     * @see com.core.service.IVendorService#listVendor(java.lang.String, int, int)
     */
    public Map<String, ?> listVendor(final String vendorName, final int start, final int limit) {
        final Map<String, Object> map = new HashMap<String, Object>();
        final int total = vendorMapper.countVendor();
        final List<Vendor> vendorList = vendorMapper.listVendor(vendorName, start, limit);
        map.put("total", total);
        map.put("vendorList", vendorList);
        return map;
    }



}
