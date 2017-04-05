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

import com.core.pojo.Vendor;

/**
 * @author damon.huang
 *
 */
public interface IVendorService {
    public Vendor getVendorById(String vendorId);
    public String addVendor(Vendor vendor) throws Throwable;
    Map<String, ?> listVendor(String vendorName, int start, int limit);
    List<Vendor> searchVendor();
}
