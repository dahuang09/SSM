// Copyright (c) 1998-2017 Core Solutions Limited. All rights reserved.
// ============================================================================
// CURRENT VERSION CNT.5.0.1
// ============================================================================
// CHANGE LOG
// CNT.5.0.1 : 2017-XX-XX, damon.huang, creation
// ============================================================================
package com.core.service;

import com.core.exception.ServiceException;

/**
 * @author damon.huang
 *
 */
public interface IBizNoDefinitionService {
    int getCurrentBizNo(String module) throws ServiceException;
}
