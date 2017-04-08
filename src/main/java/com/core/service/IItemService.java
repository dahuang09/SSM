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

import com.core.pojo.Item;

/**
 * @author damon.huang
 *
 */
public interface IItemService {
    int deleteByPrimaryKey(String id);

    String insert(Item record) throws Throwable;

    int insertSelective(Item record);

    Item selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(Item record);

    int updateByPrimaryKey(Item record);

    Map<String, ?> listItem(String name, int start, int limit);

    Map<String, ?> listItemInCategory(String name);

    Map<String, ?> listItemInCategoryId(String categoryId);

    Map<String, ?> searchAvailableItem(String name);

    List<Item> searchItem();
}
