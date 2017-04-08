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
import com.core.dao.ItemMapper;
import com.core.pojo.BizNoDefinition;
import com.core.pojo.Item;
import com.core.service.IItemService;
import com.core.util.UuidUtil;

/**
 * @author damon.huang
 *
 */
@Service("itemService")
public class ItemServiceImpl implements IItemService {

    private final String ITEM_SUFIX = "ITM";
    private final String formatTemplate = "yyyy-MM-dd";
    private final Logger log = Logger.getLogger(ItemServiceImpl.class);
    @Resource
    private CategoryMapper categoryMapper;
    @Resource
    private BizNoDefinitionMapper bizNoDefinitionMapper;
    @Resource
    private ItemMapper itemMapper;

    /* (non-Javadoc)
     * @see com.core.service.IItemService#deleteByPrimaryKey(java.lang.String)
     */
    public int deleteByPrimaryKey(final String id) {
        return 0;
    }

    /* (non-Javadoc)
     * @see com.core.service.IItemService#insert(com.core.pojo.Item)
     */
    public String insert(final Item record) throws Throwable {
        String bizNo = StringUtils.EMPTY;
        try {
            if (record == null) {
                log.error("item is null, plese check");
                return StringUtils.EMPTY;
            }
            setUUID(record);
            bizNo = generateItemNo();
            record.setItemno(bizNo);
            this.itemMapper.insert(record);
        } catch (final Throwable e) {
            throw e;
        }
        try {
            bizNoDefinitionMapper.increaseBizNo("item");
        } catch (final Throwable e) {
            throw e;
        }
        return bizNo;
    }

    /**
     * @return
     */
    private String generateItemNo() {
        int currrentBizNo = 1;
        final BizNoDefinition bizNoDefinition = bizNoDefinitionMapper.selectCurrentBizNo("item");
        if (bizNoDefinition != null) {
            currrentBizNo = bizNoDefinition.getCurrentno();
        } else {
            bizNoDefinitionMapper.resetBizNo("item");
        }
        final String dateStr = new SimpleDateFormat(formatTemplate).format(new Date());
        final String bizNo = ITEM_SUFIX + StringUtils.replace(dateStr, "-", "")
                + String.valueOf(currrentBizNo);
        return bizNo;
    }
    /**
     * @param user
     * @return
     */
    private void setUUID(final Item item) {
        String uuid = item.getId();
        uuid = StringUtils.isNotBlank(uuid) ? uuid : UuidUtil.createUUID();
        item.setId(uuid);
    }

    /* (non-Javadoc)
     * @see com.core.service.IItemService#insertSelective(com.core.pojo.Item)
     */
    public int insertSelective(final Item record) {
        // TODO Auto-generated method stub
        return 0;
    }

    /* (non-Javadoc)
     * @see com.core.service.IItemService#selectByPrimaryKey(java.lang.String)
     */
    public Item selectByPrimaryKey(final String id) {
        // TODO Auto-generated method stub
        return null;
    }

    /* (non-Javadoc)
     * @see com.core.service.IItemService#updateByPrimaryKeySelective(com.core.pojo.Item)
     */
    public int updateByPrimaryKeySelective(final Item record) {
        // TODO Auto-generated method stub
        return 0;
    }

    /* (non-Javadoc)
     * @see com.core.service.IItemService#updateByPrimaryKey(com.core.pojo.Item)
     */
    public int updateByPrimaryKey(final Item record) {
        // TODO Auto-generated method stub
        return 0;
    }

    /* (non-Javadoc)
     * @see com.core.service.IItemService#listItem(java.lang.String, int, int)
     */
    public Map<String, ?> listItem(final String name, final int start, final int limit) {
        final Map<String, Object> map = new HashMap<String, Object>();
        final int total = itemMapper.countItem();
        final List<Item> itemList = itemMapper.listItem(name, start, limit);
        map.put("total", total);
        map.put("itemList", itemList);
        return map;
    }

    /* (non-Javadoc)
     * @see com.core.service.IItemService#searchItem()
     */
    public List<Item> searchItem() {
        // TODO Auto-generated method stub
        return null;
    }

    /* (non-Javadoc)
     * @see com.core.service.IItemService#listItemInCategory(java.lang.String, int, int)
     */
    public Map<String, ?> listItemInCategory(final String name) {
        final Map<String, Object> map = new HashMap<String, Object>();
        final List<Item> itemList = itemMapper.listItemInCategory(name);
        map.put("total", itemList.size());
        map.put("itemList", itemList);
        return map;
    }

    /* (non-Javadoc)
     * @see com.core.service.IItemService#searchAvailableItem(java.lang.String)
     */
    public Map<String, ?> searchAvailableItem(final String name) {
        final Map<String, Object> map = new HashMap<String, Object>();
        final List<Item> itemList = itemMapper.listAvailableItem(name);
        map.put("total", itemList.size());
        map.put("itemList", itemList);
        return map;
    }

    /* (non-Javadoc)
     * @see com.core.service.IItemService#listItemInCategoryId(java.lang.String)
     */
    public Map<String, ?> listItemInCategoryId(final String categoryId) {
        final Map<String, Object> map = new HashMap<String, Object>();
        final List<Item> itemList = itemMapper.listItemInCategoryId(categoryId);
        map.put("total", itemList.size());
        map.put("itemList", itemList);
        return map;
    }

}
