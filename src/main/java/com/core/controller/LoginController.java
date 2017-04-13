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

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.core.pojo.User;
import com.core.service.IUserService;

@Controller
@RequestMapping("/security")
public class LoginController {
    private static Logger logger = Logger.getLogger(LoginController.class);
    @Resource
    private IUserService userService;

    @RequestMapping("/login")
    public String login(final HttpServletRequest request) throws Exception {
        final String userId = request.getParameter("userName");
        final String password = request.getParameter("password");
        User user = userService.validate(userId, password);
        if(user == null){
        	request.getSession().setAttribute("msg", "用户名或密码错误，请重新登录");
        	return "redirect:/login.jsp";
        } else if (user.getIsadmin() == 1) {
        	return "superuser/main";
        } else {
        	return "users/usersMain";
        }

    }
    @RequestMapping("/logout")
    @ResponseBody
    public Map<String, Object> logout(){
    	Map<String, Object> map = new HashMap<String, Object>();
    	map.put("success", true);
    	return map;
    }
}
