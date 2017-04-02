// Copyright (c) 1998-2017 Core Solutions Limited. All rights reserved.
// ============================================================================
// CURRENT VERSION CNT.5.0.1
// ============================================================================
// CHANGE LOG
// CNT.5.0.1 : 2017-XX-XX, damon.huang, creation
// ============================================================================
package com.core.service;

import java.util.List;
import java.util.Map;

import com.core.pojo.OrderOut;

/**
 * @author damon.huang
 *
 */
public interface IOrderOutService {
    void addOrderOuts(List<OrderOut> orderOuts);
    Map<String, ?> listOrderOut(String name, int start, int limit);
}
