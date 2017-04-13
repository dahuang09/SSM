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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.core.dao.BizNoDefinitionMapper;
import com.core.dao.UserMapper;
import com.core.exception.ServiceException;
import com.core.pojo.BizNoDefinition;
import com.core.pojo.User;
import com.core.service.IUserService;
import com.core.util.Md5Util;
import com.core.util.UuidUtil;

@Service("userService")
public class UserServiceImpl implements IUserService{

    private final String USER_SUFIX = "User";
    private final String formatTemplate = "yyyy-MM-dd";
    private final Logger log = Logger.getLogger(UserServiceImpl.class);
    @Resource
    private UserMapper userMapper;
    @Resource
    private BizNoDefinitionMapper bizNoDefinitionMapper;
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
    public String addUser(final User user) throws Throwable {
        String bizNo = StringUtils.EMPTY;
        try {
            if (user == null) {
                log.error("User is null, plese check");
                return StringUtils.EMPTY;
            }
            setUUID(user);
            bizNo = generateUserNo();
            user.setUserno(bizNo);
            String plainPwd = user.getPassword();
            String md5Pwd = Md5Util.toMD5(plainPwd);
            user.setPassword(md5Pwd);
            user.setIsdeleted(0);
            this.userMapper.insert(user);
        } catch (final Throwable e) {
            throw e;
        }
        try {
            bizNoDefinitionMapper.increaseBizNo("user");
        } catch (final Throwable e) {
            throw e;
        }
        return bizNo;
    }
    /**
     * @return
     */
    private String generateUserNo() {
        int currrentUserNo = 1;
        final BizNoDefinition bizNoDefinition = bizNoDefinitionMapper.selectCurrentBizNo("user");
        if (bizNoDefinition != null) {
            currrentUserNo = bizNoDefinition.getCurrentno();
        } else {
            bizNoDefinitionMapper.resetBizNo("user");
        }
        final String dateStr = new SimpleDateFormat(formatTemplate).format(new Date());
        final String bizNo = USER_SUFIX + StringUtils.replace(dateStr, "-", "")
                + String.valueOf(currrentUserNo);
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

    /* (non-Javadoc)
     * @see com.core.service.IUserService#searchUser()
     */
    public List<User> searchUser() throws ServiceException {
        // TODO Auto-generated method stub
        return null;
    }
    /* (non-Javadoc)
     * @see com.core.service.IUserService#listUser(java.lang.String, int, int)
     */
    public Map<String, ?> listUser(final String userName, final int start, final int limit) {
        final Map<String, Object> map = new HashMap<String, Object>();
        final int total = userMapper.countUser();
        final List<User> userList = userMapper.listUser(userName, start, limit);
        map.put("total", total);
        map.put("usreList", userList);
        return map;
    }
	public User validate(String userName, String password) throws Exception{
		try {
			String	encodedPassword = Md5Util.toMD5(password);
			User user = userMapper.validate(userName,encodedPassword);
			return user;
		} catch (Exception e) {
			log.error("根据用户名和密码找不回来数据, userName" + userName + ", password=" + password, e);
			throw e;
		}
	}

	public void updateUsers(List<User> users) throws Exception {
		if(users == null || users.size() == 0) {
			return;
		}
		for (User user : users) {
			String userName = user.getUsername();
			String userNo = user.getUserno();
			String plainPwd = user.getPassword();
            String md5Pwd = Md5Util.toMD5(plainPwd);
			userMapper.updateByUserNo(userName, md5Pwd, userNo);
		}
		log.info("修改用户完成");
	}

}
