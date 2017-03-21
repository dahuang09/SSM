// Copyright (c) 1998-2017 Core Solutions Limited. All rights reserved.
// ============================================================================
// CURRENT VERSION CNT.5.0.1
// ============================================================================
// CHANGE LOG
// CNT.5.0.1 : 2017-XX-XX, damon.huang, creation
// ============================================================================
package com.core.util;

import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.apache.ibatis.session.SqlSession;
import org.mybatis.spring.support.SqlSessionDaoSupport;

import com.core.exception.DaoException;
import com.core.pojo.BizNoDefinition;

/**
 * @author damon.huang
 *
 */
public final class BizNoUtil extends SqlSessionDaoSupport {
    private static BizNoUtil instance;
    private final  SqlSession sqlSession = super.getSqlSession();


    private BizNoUtil() {

    }

    public static BizNoUtil getInstance() {
        if (instance == null) {
            synchronized (BizNoUtil.class) {
                if (instance == null) {
                    instance = new BizNoUtil();
                }
            }
        }
        return instance;

    }

    public int generateBizNo(final String module) throws DaoException {
        if (StringUtils.isBlank(module)) {
            logger.error("module不应该为空，module=" + module);
            return 0;
        }
        int bizNo = 1;
        try {
            if (StringUtils.equals(module, "user")) {
                final BizNoDefinition bizNoDef
                    = sqlSession.selectOne("com.core.dao.BizNoDefinitionMapper.selectCurrentBizNo", module);
                if (bizNoDef != null) {
                    bizNo = bizNoDef.getCurrentno() + 1;
                }
            }
        } catch (final Throwable e) {
            throw new DaoException("根据module从数据库取数据回来失败，module=" + module, e);
        }
        return bizNo;
    }

    public void updateBizNo(final int bizNo, final String module)  throws DaoException {
        if (StringUtils.isBlank(module)) {
            logger.error("module不应该为空，module=" + module);
            return;
        }
        try {
            final Map<String, Object> parameters = new HashMap<String, Object>();
            parameters.put("module", module);
            parameters.put("bizNo", bizNo);
            sqlSession.update("com.core.dao.BizNoDefinitionMapper.updateBizNo", parameters);
        } catch (final Throwable e) {
            throw new DaoException("根据module从更新bizNo失败， module="
                                        + module +" ,bizNo=" + bizNo, e);
        }
    }


}
