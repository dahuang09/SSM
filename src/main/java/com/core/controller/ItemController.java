// Copyright (c) 1998-2017 Core Solutions Limited. All rights reserved.
// ============================================================================
// CURRENT VERSION CNT.5.0.1
// ============================================================================
// CHANGE LOG
// CNT.5.0.1 : 2017-XX-XX, damon.huang, creation
// ============================================================================
package com.core.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.lang.ObjectUtils;
import org.apache.log4j.Logger;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.type.TypeReference;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.core.pojo.Item;
import com.core.service.IItemService;

/**
 * @author damon.huang
 *
 */
@RestController
@RequestMapping("/item")
public class ItemController {
  @Resource
  private IItemService itemService;

  private static Logger logger = Logger.getLogger(ItemController.class);

  @RequestMapping(value="/add", method = RequestMethod.POST)
  @ResponseBody
  public Map<String, Object> addItem(@RequestBody final Item item){
      final Map<String, Object> map = new HashMap<String, Object>();
      logger.info("item=" + item.toString());
      try {
          final String userNo = itemService.insert(item);
          map.put("success", true);
          map.put("bizNo", userNo);
      } catch (final Throwable e) {
          logger.error("添加商品失败", e);
      }
      return map;
  }

  @RequestMapping(path="/listItem", method=RequestMethod.POST)
  public Map<String, Object> listItem(@RequestBody final Map<String, Object> parameters){
      final Object nameObj = parameters.get("name");
      final Object startObj = parameters.get("start");
      final Object limitObj =  parameters.get("limit");
      final String name = ObjectUtils.toString(nameObj);
      final int start = Integer.parseInt(ObjectUtils.toString(startObj));
      final int limit = Integer.parseInt(ObjectUtils.toString(limitObj));
      final Map<String, Object> map = new HashMap<String, Object>();
      final Map<String, ?> returnMap = itemService.listItem(name, start, limit);
      map.put("itemList", returnMap.get("itemList"));
      map.put("total", returnMap.get("total"));
      map.put("success", true);
      return map;
  }

//  @RequestMapping(path="/addItems", method=RequestMethod.POST)
//  public Map<String, Object> addItems(@RequestBody final List<Item> items) {
//      logger.info(items.size());
//      final Map<String, Object> map = new HashMap<String, Object>();
//      return map;
//
//  }

  @RequestMapping(path="/addItems", method=RequestMethod.POST)
  public Map<String, Object> addItems(@RequestBody final Map<String, Object> parameters) throws Throwable {
      final String jsonParam = (String) parameters.get("jsonParam");
      final ObjectMapper mapper = new ObjectMapper();
      mapper.registerSubtypes(Item.class);
      final List<Item> items = mapper.readValue(jsonParam, new TypeReference<List<Item>>(){});
      logger.info(items.get(0).toString());
      final Map<String, Object> map = new HashMap<String, Object>();
      return map;
  }

  @RequestMapping(path="/searchItemInCategory", method=RequestMethod.POST)
  public Map<String, Object> searchItemInCategory(@RequestBody final Map<String, Object> parameters){
      final Object nameObj = parameters.get("name");
      final String name = ObjectUtils.toString(nameObj);
      final Map<String, Object> map = new HashMap<String, Object>();
      final Map<String, ?> returnMap = itemService.listItemInCategory(name);
      map.put("itemList", returnMap.get("itemList"));
      map.put("total", returnMap.get("total"));
      map.put("success", true);
      return map;
  }

  @RequestMapping(path="/searchItemInCategoryId", method=RequestMethod.POST)
  public Map<String, Object> searchItemInCategoryId(@RequestBody final Map<String, Object> parameters){
      final Object idObj = parameters.get("id");
      final String categoryId = ObjectUtils.toString(idObj);
      final Map<String, Object> map = new HashMap<String, Object>();
      final Map<String, ?> returnMap = itemService.listItemInCategoryId(categoryId);
      map.put("itemList", returnMap.get("itemList"));
      map.put("total", returnMap.get("total"));
      map.put("success", true);
      return map;
  }

  @RequestMapping(path="/searchAvailableItem", method=RequestMethod.POST)
  public Map<String, Object> searchAvailableItem(@RequestBody final Map<String, Object> parameters){
      final Object nameObj = parameters.get("name");
      final String name = ObjectUtils.toString(nameObj);
      final Map<String, Object> map = new HashMap<String, Object>();
      final Map<String, ?> returnMap = itemService.searchAvailableItem(name);
      map.put("itemList", returnMap.get("itemList"));
      map.put("total", returnMap.get("total"));
      map.put("success", true);
      return map;
  }
}
