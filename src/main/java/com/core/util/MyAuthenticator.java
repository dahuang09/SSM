// Copyright (c) 1998-2017 Core Solutions Limited. All rights reserved.
// ============================================================================
// CURRENT VERSION CNT.5.0.1
// ============================================================================
// CHANGE LOG
// CNT.5.0.1 : 2017-XX-XX, damon.huang, creation
// ============================================================================
package com.core.util;

import javax.mail.Authenticator;
import javax.mail.PasswordAuthentication;

/**
 * @author damon.huang
 *
 */
public class MyAuthenticator extends Authenticator {

    /**
     * 用户名（登录邮箱）
     */
    private String username;
    /**
     * 密码
     */
    private String password;

    /**
     * 初始化邮箱和密码
     *
     * @param username 邮箱
     * @param password 密码
     */
    public MyAuthenticator(final String username, final String password) {
    this.username = username;
    this.password = password;
    }

    String getPassword() {
    return password;
    }

    @Override
    protected PasswordAuthentication getPasswordAuthentication() {
    return new PasswordAuthentication(username, password);
    }

    String getUsername() {
    return username;
    }

    public void setPassword(final String password) {
    this.password = password;
    }

    public void setUsername(final String username) {
    this.username = username;
    }

}
