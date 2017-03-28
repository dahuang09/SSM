// Copyright (c) 1998-2016 Core Solutions Limited. All rights reserved.
// ============================================================================
// CURRENT VERSION CNT.5.0.1
// ============================================================================
// CHANGE LOG
// CNT.5.0.1 : 2016-XX-XX, damon.huang, creation
// ============================================================================
package com.core.service;

import java.util.List;
import java.util.Map;

import com.core.exception.ServiceException;
import com.core.pojo.User;

/**
 * @author damon.huang
 *
 */
public interface IUserService {
    public User getUserById(String userId) throws ServiceException;
    public String addUser(User user) throws Throwable;
    Map<String, ?> listUser(String userName, int start, int limit);
    List<User> searchUser() throws ServiceException;
}
