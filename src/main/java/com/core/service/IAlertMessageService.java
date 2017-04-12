// Copyright (c) 1998-2017 Core Solutions Limited. All rights reserved.
// ============================================================================
// CURRENT VERSION CNT.5.0.1
// ============================================================================
// CHANGE LOG
// CNT.5.0.1 : 2017-XX-XX, damon.huang, creation
// ============================================================================
package com.core.service;

import java.util.Map;

/**
 * @author damon.huang
 *
 */
public interface IAlertMessageService {
    Map<String, Object> list(String searchValue, int limit, int start);
}
