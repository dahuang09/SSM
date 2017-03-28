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
import com.core.dao.CategoryMapper;
import com.core.pojo.BizNoDefinition;
import com.core.pojo.Category;
import com.core.service.ICategoryService;
import com.core.util.UuidUtil;

/**
 * @author damon.huang
 *
 */
@Service("categoryService")
public class CategoryServiceImpl implements ICategoryService {

    private final String CATEGORY_SUFIX = "CY";
    private final String formatTemplate = "yyyy-MM-dd";
    private final Logger log = Logger.getLogger(CategoryServiceImpl.class);
    @Resource
    private CategoryMapper categoryMapper;
    @Resource
    private BizNoDefinitionMapper bizNoDefinitionMapper;

    /* (non-Javadoc)
     * @see com.core.service.ICategoryService#addCategory(com.core.pojo.Category)
     */
    public String addCategory(final Category category) throws Throwable {
        String bizNo = StringUtils.EMPTY;
        try {
            if (category == null) {
                log.error("category is null, plese check");
                return StringUtils.EMPTY;
            }
            setUUID(category);
            bizNo = generateCategoryNo();
            category.setCategoryno(bizNo);
            this.categoryMapper.insert(category);
        } catch (final Throwable e) {
            throw e;
        }
        try {
            bizNoDefinitionMapper.increaseBizNo("category");
        } catch (final Throwable e) {
            throw e;
        }
        return bizNo;
    }

    /**
     * @return
     */
    private String generateCategoryNo() {
        int currrentCategoryNo = 1;
        final BizNoDefinition bizNoDefinition = bizNoDefinitionMapper.selectCurrentBizNo("category");
        if (bizNoDefinition != null) {
            currrentCategoryNo = bizNoDefinition.getCurrentno();
        } else {
            bizNoDefinitionMapper.resetBizNo("category");
        }
        final String dateStr = new SimpleDateFormat(formatTemplate).format(new Date());
        final String bizNo = CATEGORY_SUFIX + StringUtils.replace(dateStr, "-", "")
                + String.valueOf(currrentCategoryNo);
        return bizNo;
    }
    /**
     * @param user
     * @return
     */
    private void setUUID(final Category category) {
        String uuid = category.getId();
        uuid = StringUtils.isNotBlank(uuid) ? uuid : UuidUtil.createUUID();
        category.setId(uuid);
    }

    /* (non-Javadoc)
     * @see com.core.service.ICategoryService#listCategory(java.lang.String, int, int)
     */
    public Map<String, ?> listCategory(final String name, final int start, final int limit) {
        final Map<String, Object> map = new HashMap<String, Object>();
        final int total = categoryMapper.countCategory();
        final List<Category> categoryList = categoryMapper.listCategory(name, start, limit);
        map.put("total", total);
        map.put("categoryList", categoryList);
        return map;
    }

    /* (non-Javadoc)
     * @see com.core.service.ICategoryService#searchCategory()
     */
    public List<Category> searchCategory() {
        // TODO Auto-generated method stub
        return null;
    }
}
