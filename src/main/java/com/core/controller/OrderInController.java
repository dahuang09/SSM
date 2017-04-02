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

import com.core.pojo.OrderIn;
import com.core.service.IOrderInService;

/**
 * @author damon.huang
 *
 */
@RestController
@RequestMapping("/orderIn")
public class OrderInController {
  @Resource
  private IOrderInService orderInService;

  private static Logger logger = Logger.getLogger(OrderInController.class);

  @RequestMapping(value="/addOrderIns", method = RequestMethod.POST)
  @ResponseBody
  public Map<String, Object> addOrderIns(@RequestBody final Map<String, Object> parameters) throws Throwable{
      final String jsonParam = (String) parameters.get("jsonParam");
      final ObjectMapper mapper = new ObjectMapper();
      mapper.registerSubtypes(OrderIn.class);
      final List<OrderIn> orderIns = mapper.readValue(jsonParam, new TypeReference<List<OrderIn>>(){});
      orderInService.addOrderIns(orderIns);
      final Map<String, Object> map = new HashMap<String, Object>();
      map.put("success", true);
      return map;
  }

  @RequestMapping(path="/listOrderIn", method=RequestMethod.POST)
  public Map<String, Object> listUser(@RequestBody final Map<String, Object> parameters){
      final Object nameObj = parameters.get("name");
      final Object startObj = parameters.get("start");
      final Object limitObj =  parameters.get("limit");
      final String name = ObjectUtils.toString(nameObj);
      final int start = Integer.parseInt(ObjectUtils.toString(startObj));
      final int limit = Integer.parseInt(ObjectUtils.toString(limitObj));
      final Map<String, Object> map = new HashMap<String, Object>();
      final Map<String, ?> returnMap = orderInService.listOrderIn(name, start, limit);
      map.put("orderInList", returnMap.get("orderInList"));
      map.put("total", returnMap.get("total"));
      map.put("success", true);
      return map;
  }

}
