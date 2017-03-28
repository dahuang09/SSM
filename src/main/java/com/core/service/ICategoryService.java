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

import com.core.pojo.Category;

/**
 * @author damon.huang
 *
 */
public interface ICategoryService {
    String addCategory(Category category) throws Throwable;
    Map<String, ?> listCategory(String name, int start, int limit);
    List<Category> searchCategory();
}
