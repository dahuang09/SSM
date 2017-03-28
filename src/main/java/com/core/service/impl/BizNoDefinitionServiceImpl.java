// Copyright (c) 1998-2017 Core Solutions Limited. All rights reserved.
// ============================================================================
// CURRENT VERSION CNT.5.0.1
// ============================================================================
// CHANGE LOG
// CNT.5.0.1 : 2017-XX-XX, damon.huang, creation
// ============================================================================
package com.core.service.impl;

import org.springframework.stereotype.Service;

import com.core.dao.BizNoDefinitionMapper;
import com.core.pojo.BizNoDefinition;
import com.core.service.IBizNoDefinitionService;

/**
 * @author damon.huang
 *
 */
@Service("bizNoDefinitionService")
public class BizNoDefinitionServiceImpl implements IBizNoDefinitionService {

    BizNoDefinitionMapper bizNoDefinitionMapper;

    /* (non-Javadoc)
     * @see com.core.service.IBizNoDefinitionService#getCurrentBizNo(java.lang.String)
     */
    public int getCurrentBizNo(final String module) {
        final BizNoDefinition bizNoDefinition = bizNoDefinitionMapper.selectCurrentBizNo(module);
        return bizNoDefinition.getCurrentno();
    }

}
