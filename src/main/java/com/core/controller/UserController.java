// Copyright (c) 1998-2016 Core Solutions Limited. All rights reserved.
// ============================================================================
// CURRENT VERSION CNT.5.0.1
// ============================================================================
// CHANGE LOG
// CNT.5.0.1 : 2016-XX-XX, damon.huang, creation
// ============================================================================
package com.core.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.ObjectUtils;
import org.apache.log4j.Logger;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.type.TypeReference;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.core.pojo.User;
import com.core.service.IUserService;

@RestController
@RequestMapping("/user")
public class UserController {
//    @Resource
    private final IUserService userService;

    private static Logger logger = Logger.getLogger(UserController.class);

    @Autowired
    public UserController(final IUserService userService) {
        this.userService = userService;
    }

    @RequestMapping(path="/showUser", method=RequestMethod.GET)
    public String toIndex(final HttpServletRequest request,final Model model){
        final String userId = request.getParameter("id");
        logger.info("joyce test");
        final User user = this.userService.getUserById(userId);
        model.addAttribute("user", user);
        return "showUser";
    }

    @RequestMapping(value="/add", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> addUser(@RequestBody final User user){
        final Map<String, Object> map = new HashMap<String, Object>();
        try {
            final String userNo = userService.addUser(user);
            map.put("success", true);
            map.put("bizNo", userNo);
        } catch (final Throwable e) {
            logger.error("添加用户失败", e);
        }
        return map;
    }

    @RequestMapping(value="/update", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> updateUser(@RequestBody final Map<String, Object> parameters){
        final Map<String, Object> map = new HashMap<String, Object>();
        final String jsonParam = (String) parameters.get("jsonParam");
        final ObjectMapper mapper = new ObjectMapper();
        mapper.registerSubtypes(User.class);
        try {
            final List<User> users = mapper.readValue(jsonParam, new TypeReference<List<User>>(){});
            userService.updateUsers(users);
        } catch (final Throwable e) {
            logger.error("修改用户失败", e);
            map.put("success", false);
        }
        map.put("success", true);
        return map;
    }

    @RequestMapping(path="/listUser", method=RequestMethod.POST)
    public Map<String, Object> listUser(@RequestBody final Map<String, Object> parameters){
        final Object userNameObj = parameters.get("username");
        final Object startObj = parameters.get("start");
        final Object limitObj =  parameters.get("limit");
        final String userName = ObjectUtils.toString(userNameObj);
        final int start = Integer.parseInt(ObjectUtils.toString(startObj));
        final int limit = Integer.parseInt(ObjectUtils.toString(limitObj));
        final Map<String, Object> map = new HashMap<String, Object>();
        final Map<String, ?> returnMap = userService.listUser(userName, start, limit);
        map.put("userlist", returnMap.get("usreList"));
        map.put("total", returnMap.get("total"));
        map.put("success", true);
        return map;
    }

    @RequestMapping(path="/searchUser", method=RequestMethod.POST)
    public Map<String, Object> searchUser(@RequestBody final Map<String, Object> parameters){
        final Object startObj = parameters.get("start");
        final Object limitObj =  parameters.get("limit");
        final int start = Integer.parseInt(ObjectUtils.toString(startObj));
        final int limit = Integer.parseInt(ObjectUtils.toString(limitObj));
        final Map<String, Object> map = new HashMap<String, Object>();
        final Map<String, ?> returnMap = userService.listUser("", start, limit);
        map.put("userlist", returnMap.get("usreList"));
        map.put("total", returnMap.get("total"));
        map.put("success", true);
        return map;
    }
}
