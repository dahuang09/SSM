// Copyright (c) 1998-2017 Core Solutions Limited. All rights reserved.
// ============================================================================
// CURRENT VERSION CNT.5.0.1
// ============================================================================
// CHANGE LOG
// CNT.5.0.1 : 2017-XX-XX, damon.huang, creation
// ============================================================================
package com.core.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.core.service.IUserService;

/**
 * @author damon.huang
 *
 */
@Controller
@RequestMapping("/securit")
public class LoginController {
    private static Logger logger = Logger.getLogger(LoginController.class);
    @Resource
    private IUserService userService;

    @RequestMapping("/login")
    public String login(final HttpServletRequest request) {
        final String userId = request.getParameter("userName");
        final String password = request.getParameter("password");
        logger.info(userId + ", " + password);
        return "superuser/main";
    }
}
