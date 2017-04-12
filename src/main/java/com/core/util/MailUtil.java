// Copyright (c) 1998-2017 Core Solutions Limited. All rights reserved.
// ============================================================================
// CURRENT VERSION CNT.5.0.1
// ============================================================================
// CHANGE LOG
// CNT.5.0.1 : 2017-XX-XX, damon.huang, creation
// ============================================================================
package com.core.util;

import java.util.Calendar;
import java.util.List;
import java.util.Properties;

import javax.mail.Message.RecipientType;
import javax.mail.MessagingException;
import javax.mail.NoSuchProviderException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.apache.log4j.Logger;

/**
 * @author damon.huang
 *
 */
public final class MailUtil {

    private static final Logger logger = Logger.getLogger(MailUtil.class);
    private static final String fromUser = "823771179@qq.com";
    private static final String fromUserPwd = "gxrvsllphlyhbgac";
    private static final String subject = "预警提示";

    private MailUtil() {

    }

    @SuppressWarnings("static-access")
    public static void sendMessageToUsers(final List<String> to, final String messageText)
                 throws MessagingException {
        // 第一步：配置javax.mail.Session对象
        final Properties props = new Properties();
        props.put("mail.smtp.host", "smtp.qq.com");
        props.put("mail.smtp.starttls.enable","true");//使用 STARTTLS安全连接
        props.put("mail.smtp.port", "25");
        props.put("mail.smtp.auth", "true");        // 使用验证
        final Session mailSession = Session.getInstance(props,new MyAuthenticator(fromUser,fromUserPwd));

        // 第二步：编写消息
        final InternetAddress fromAddress = new InternetAddress(fromUser);
        final InternetAddress[] addresses = new InternetAddress[to.size()];
        for (int i = 0; i < to.size(); i++) {
            addresses[i] = new InternetAddress(to.get(i));
        }

        final MimeMessage message = new MimeMessage(mailSession);

        message.setFrom(fromAddress);
        message.addRecipients(RecipientType.TO, addresses);

        message.setSentDate(Calendar.getInstance().getTime());
        message.setSubject(subject);
        message.setContent(messageText, "text/html; charset=utf-8");

        // 第三步：发送消息
        final Transport transport = mailSession.getTransport("smtp");
        transport.connect("smtp.qq.com",fromUser, fromUserPwd);
        transport.send(message, message.getRecipients(RecipientType.TO));
        logger.info("发送");
    }

    @SuppressWarnings("static-access")
    public static void sendMessageToUser(final String to, final String messageText) throws Throwable {
        try {
            // 第一步：配置javax.mail.Session对象
            final Properties props = new Properties();
            props.put("mail.smtp.host", "smtp.qq.com");
            props.put("mail.smtp.starttls.enable","true");//使用 STARTTLS安全连接
            props.put("mail.smtp.port", "25");
            props.put("mail.smtp.auth", "true");        // 使用验证
            final Session mailSession = Session.getInstance(props,new MyAuthenticator(fromUser,fromUserPwd));
            // 第二步：编写消息
            final InternetAddress fromAddress = new InternetAddress(fromUser);
            final InternetAddress toAddress = new InternetAddress(to);
            final MimeMessage message = new MimeMessage(mailSession);
            message.setFrom(fromAddress);
            message.addRecipient(RecipientType.TO, toAddress);
//            message.addRecipient(RecipientType.CC, fromAddress);
            message.setSentDate(Calendar.getInstance().getTime());
            message.setSubject(subject);
            message.setContent(messageText, "text/html; charset=utf-8");
            // 第三步：发送消息
            final Transport transport = mailSession.getTransport();
//        transport.connect("smtp.qq.com",fromUser, fromUserPwd);
            transport.send(message, message.getRecipients(RecipientType.TO));
            logger.info("发送");
        } catch (final AddressException e) {
            logger.error("发送失败", e);
            throw e;
        } catch (final NoSuchProviderException e) {
            logger.error("发送失败", e);
            throw e;
        } catch (final MessagingException e) {
            logger.error("发送失败", e);
            throw e;
        }
    }
}
