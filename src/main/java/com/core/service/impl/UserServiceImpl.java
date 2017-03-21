// Copyright (c) 1998-2016 Core Solutions Limited. All rights reserved.
// ============================================================================
// CURRENT VERSION CNT.5.0.1
// ============================================================================
// CHANGE LOG
// CNT.5.0.1 : 2016-XX-XX, damon.huang, creation
// ============================================================================
package com.core.service.impl;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.core.dao.UserMapper;
import com.core.exception.ServiceException;
import com.core.pojo.User;
import com.core.service.IUserService;
import com.core.util.BizNoUtil;
import com.core.util.UuidUtil;

/**
 * @author damon.huang
 *
 */
@Service("userService")
public class UserServiceImpl implements IUserService {

    private final String USER_SUFIX = "U";
    private final String formatTemplate = "yyyy-MM-dd";
    private final Logger log = Logger.getLogger(UserServiceImpl.class);
//    @Resource
//    private IUserDao userDao;
    UserMapper userMapper;
    /* (non-Javadoc)
     * @see com.core.service.IUserService#getUserById(java.lang.String)
     */
    public User getUserById(final String userId) throws ServiceException {
        try {
            return this.userMapper.selectByPrimaryKey(userId);
        } catch (final Exception e) {
            throw new ServiceException("根据用户编号查询用户失败", e);
        }
    }
    /* (non-Javadoc)
     * @see com.core.service.IUserService#addUser(com.core.pojo.User)
     */
    public String addUser(final User user) throws ServiceException {
        try {
            if (user == null) {
                log.error("User is null, plese check");
                return StringUtils.EMPTY;
            }
            setUUID(user);
            final String bizNo = generateUserNo();
            user.setUserno(bizNo);
            this.userMapper.insert(user);
            return bizNo;
        } catch (final Exception e) {
            throw new ServiceException("新建用户失败", e);
        }

    }
    /**
     * @return
     */
    private String generateUserNo() {
        final int currentUserNo = BizNoUtil.getInstance().generateBizNo("user");
        final String dateStr = new SimpleDateFormat(formatTemplate).format(new Date());
        final String bizNo = dateStr + String.valueOf(currentUserNo);
        return bizNo;
    }
    /**
     * @param user
     * @return
     */
    private void setUUID(final User user) {
        String uuid = user.getId();
        uuid = StringUtils.isNotBlank(uuid) ? uuid : UuidUtil.createUUID();
        user.setId(uuid);
    }

}
