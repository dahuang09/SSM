// Copyright (c) 1998-2017 Core Solutions Limited. All rights reserved.
// ============================================================================
// CURRENT VERSION CNT.5.0.1
// ============================================================================
// CHANGE LOG
// CNT.5.0.1 : 2017-XX-XX, damon.huang, creation
// ============================================================================
package com.test.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.core.pojo.Item;
import com.core.service.IItemService;

/**
 * @author damon.huang
 *
 */
@RunWith(SpringJUnit4ClassRunner.class)     //表示继承了SpringJUnit4ClassRunner类
@ContextConfiguration(locations = {"classpath:spring-mybatis.xml"})
public class TestItem {

    @Resource
    private final IItemService itemService = null;
    private static Logger logger = Logger.getLogger(TestItem.class);

    @SuppressWarnings("unchecked")
    @Test
    public void test1() {
        final Map<String, ?> itemCategory = itemService.listItem("", 0, 27);
        final List<Item> itemCategorys = (List<Item>) itemCategory.get("itemList");
        logger.info("size:" + itemCategorys.size());
        for (final Item itemCategory2 : itemCategorys) {
            final String id = itemCategory2.getCategory().getId();
            final String name = itemCategory2.getCategory().getName();
            logger.info("id=" + id + ", name=" + name);
        }

    }

}
