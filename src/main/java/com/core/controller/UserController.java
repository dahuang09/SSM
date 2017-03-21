// Copyright (c) 1998-2016 Core Solutions Limited. All rights reserved.
// ============================================================================
// CURRENT VERSION CNT.5.0.1
// ============================================================================
// CHANGE LOG
// CNT.5.0.1 : 2016-XX-XX, damon.huang, creation
// ============================================================================
package com.core.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.core.exception.ServiceException;
import com.core.pojo.User;
import com.core.service.IUserService;

/**
 * @author damon.huang
 *
 */
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
        logger.info("damon test");
        final User user = this.userService.getUserById(userId);
        model.addAttribute("user", user);
        return "showUser";
    }

    @RequestMapping(value="/add", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object>  addUser(@RequestBody final User user){
        final Map<String, Object> map = new HashMap<String, Object>();
        try {
            final String userNo = userService.addUser(user);
            map.put("success", "ture");
            map.put("bizNo", userNo);
        } catch (final ServiceException e) {
            throw e;
        }
        return map;
    }
}
