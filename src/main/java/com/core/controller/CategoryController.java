// Copyright (c) 1998-2017 Core Solutions Limited. All rights reserved.
// ============================================================================
// CURRENT VERSION CNT.5.0.1
// ============================================================================
// CHANGE LOG
// CNT.5.0.1 : 2017-XX-XX, damon.huang, creation
// ============================================================================
package com.core.controller;

import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang.ObjectUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.core.pojo.Category;
import com.core.service.ICategoryService;

/**
 * @author damon.huang
 *
 */
@RestController
@RequestMapping("/category")
public class CategoryController {
    private final ICategoryService iCategoryService;

    private static Logger logger = Logger.getLogger(CategoryController.class);

    @Autowired
    public CategoryController(final ICategoryService iCategoryService) {
        this.iCategoryService = iCategoryService;
    }

    @RequestMapping(value="/add", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> addCategory(@RequestBody final Category category){
        final Map<String, Object> map = new HashMap<String, Object>();
        try {
            final String categoryNo = iCategoryService.addCategory(category);
            map.put("success", true);
            map.put("bizNo", categoryNo);
        } catch (final Throwable e) {
            logger.error("添加商品类目失败", e);
        }
        return map;
    }

    @RequestMapping(path="/listCategory", method=RequestMethod.POST)
    public Map<String, Object> listUser(@RequestBody final Map<String, Object> parameters){
        final Object nameObj = parameters.get("name");
        final Object startObj = parameters.get("start");
        final Object limitObj =  parameters.get("limit");
        final String name = ObjectUtils.toString(nameObj);
        final int start = Integer.parseInt(ObjectUtils.toString(startObj));
        final int limit = Integer.parseInt(ObjectUtils.toString(limitObj));
        final Map<String, Object> map = new HashMap<String, Object>();
        final Map<String, ?> returnMap = iCategoryService.listCategory(name, start, limit);
        map.put("categoryList", returnMap.get("categoryList"));
        map.put("total", returnMap.get("total"));
        map.put("success", true);
        return map;
    }

    @RequestMapping(path="/searchCategory", method=RequestMethod.POST)
    public Map<String, Object> searchUser(@RequestBody final Map<String, Object> parameters){
        final Object startObj = parameters.get("start");
        final Object limitObj =  parameters.get("limit");
        final int start = Integer.parseInt(ObjectUtils.toString(startObj));
        final int limit = Integer.parseInt(ObjectUtils.toString(limitObj));
        final Map<String, Object> map = new HashMap<String, Object>();
        final Map<String, ?> returnMap = iCategoryService.listCategory("", start, limit);
        map.put("categoryList", returnMap.get("categoryList"));
        map.put("total", returnMap.get("total"));
        map.put("success", true);
        return map;
    }
}
