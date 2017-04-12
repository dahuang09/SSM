// Copyright (c) 1998-2017 Core Solutions Limited. All rights reserved.
// ============================================================================
// CURRENT VERSION CNT.5.0.1
// ============================================================================
// CHANGE LOG
// CNT.5.0.1 : 2017-XX-XX, damon.huang, creation
// ============================================================================
package com.core.util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.log4j.Logger;

import com.core.dao.AlertSettingMapper;
import com.core.dao.OrderInMapper;
import com.core.dao.factory.SessionFactory;
import com.core.pojo.AlertSetting;
import com.core.pojo.Item;
import com.core.pojo.OrderIn;
import com.core.service.IAlertSettingService;

/**
 * @author damon.huang
 *
 */
public class TimerChecker {
    private static final Logger logger = Logger.getLogger(TimerChecker.class);
    @Resource
    private static IAlertSettingService alertSettingService;
    private static volatile TimerChecker instance;
    private static final ScheduledExecutorService service = Executors.newSingleThreadScheduledExecutor();
    private static final int day = 1; //检查间隔
    private static final int CHECK_INTERVAL_DAY = 1000 * 60 * 60 * 24 * day;
    private static String messageTemplate =
            "请检查仓库商品预警信息： <br/>"
            + "商品编号: %1$s, 当前库存量: %2$d, 预警数量: %3$d<br/>"
            + "保存期限: %4$d, 预警期限: + %5$d";
    private TimerChecker (){

    }

    public static TimerChecker getInstance() {
        if (instance == null) {
            synchronized (TimerChecker.class) {
                if (instance == null) {
                    instance = new TimerChecker();
                }
            }
        }
        return instance;
    }

    public void showDown() {
        try {
            if (service != null) {
                service.shutdownNow();
            }
        } catch (final Throwable e) {
            logger.error("关闭失败", e);
        }
    }

    public void init() {
        service.scheduleWithFixedDelay(new Runnable() {
            public void run() {
                try {
                    logger.info("预警检查开始");
                    sendEmail();
                    logger.info("预警检查完成");
                } catch (final Throwable e) {
                    logger.error(e.getCause(), e);
                }
            }
        }, 0, 10000, TimeUnit.MILLISECONDS);
    }

    public static void sendEmail() {
        final SqlSessionFactory sqlSessionFactory = SessionFactory.getInstance().getSqlSessionFactory();
        final SqlSession session = sqlSessionFactory.openSession();
        List<AlertSetting> alertSettings = new ArrayList<AlertSetting>();
        List<OrderIn> orderIns = new ArrayList<OrderIn>();
        try {
            final AlertSettingMapper alertSettingMapper = session.getMapper(AlertSettingMapper.class);
            final OrderInMapper orderInMapper = session.getMapper(OrderInMapper.class);
            alertSettings = alertSettingMapper.alertAmount();
            orderIns = orderInMapper.alertExpiredDate();
        } finally {
            session.close();
        }
        final Map<String, EmailInfo> emailInfoMap = new HashMap<String, TimerChecker.EmailInfo>();
        checkAmount(emailInfoMap, alertSettings);
        checkPeriod(emailInfoMap, orderIns);

        if(emailInfoMap != null && emailInfoMap.size() > 0) {
            for (final Entry<String, EmailInfo> entry : emailInfoMap.entrySet()) {
                final EmailInfo info = entry.getValue();
                final String email = info.getEmai();
                final String itemNo = info.getItemno();
                final int currentStock = info.getActualStock();
                final int alertStock = info.getAlertAmount();
                final int keepPeriod = info.getKeepPeriod();
                final int alertPeriod = info.getAlertExpiredDate();
                final String msgText = String.format(messageTemplate, itemNo, currentStock,
                        alertStock, keepPeriod, alertPeriod);
                try {
                    MailUtil.sendMessageToUser("3259149590@qq.com", "test from app");
                } catch (final Throwable e) {
                    logger.error("定期发送预警邮件失败", e);
                }
                //要加记录到alertMessage表里面
            }
        }
        try {
            MailUtil.sendMessageToUser("3259149590@qq.com", "test from app");
        } catch (final Throwable e) {
            logger.error("定期发送预警邮件失败", e);
        }
    }

    /**
     * @param emailInfoMap
     * @param entry
     */
    private static void checkPeriod(final Map<String, EmailInfo> emailInfoMap, final List<OrderIn> list) {
        for (final OrderIn orderIn : list) {
            final Item item = orderIn.getItem();
            final AlertSetting alertSetting = orderIn.getAlertSetting();
            final String itemNo = item.getItemno();
            final EmailInfo emailInfo = emailInfoMap.get(itemNo);
            final int alertExpiredDate = alertSetting.getAlertexpireddate();
            final int keepPeriod = orderIn.getKeepperiod();
            if (emailInfo == null) {
                final String email = alertSetting.getEmail();
                final EmailInfo info = new TimerChecker.EmailInfo(itemNo, 0, 0,
                        alertExpiredDate, keepPeriod, email);
                emailInfoMap.put(itemNo, info);
            } else {
                emailInfo.setAlertExpiredDate(alertExpiredDate);
                emailInfo.setKeepPeriod(keepPeriod);
            }
        }
    }

    /**
     * @param emailInfoMap
     * @param entry
     */
    private static void checkAmount(final Map<String, EmailInfo> emailInfoMap, final List<AlertSetting> list) {
        //库存量预警
        for (final AlertSetting alertSetting : list) {
            final Item item = alertSetting.getItem();
            final String itemNo = item.getItemno();
            final EmailInfo emailInfo = emailInfoMap.get(itemNo);
            if (emailInfo == null) {
                final int actualStock = item.getActualstock();
                final int alertAmount = alertSetting.getAlertamount();
                final String email = alertSetting.getEmail();
                final EmailInfo info = new TimerChecker.EmailInfo(itemNo, actualStock, alertAmount, email);
                emailInfoMap.put(itemNo, info);
            }
        }
    }

    public static final class EmailInfo {
        private String itemno;
        private int actualStock;
        private int alertAmount;
        private int alertExpiredDate;
        private int keepPeriod;
        private String emai;

        /**
         * @param itemno
         * @param alertExpiredDate
         * @param keepPeriod
         * @param emai
         */
        public EmailInfo(final String itemno, final int alertExpiredDate,
                final int keepPeriod, final String emai) {
            this.itemno = itemno;
            this.alertExpiredDate = alertExpiredDate;
            this.keepPeriod = keepPeriod;
            this.emai = emai;
            this.actualStock = 0;
            this.alertAmount = 0;
        }
        /**
         * @param itemno
         * @param actualStock
         * @param alertAmount
         * @param alertExpiredDate
         * @param keepPeriod
         * @param emai
         */
        public EmailInfo(final String itemno, final int actualStock,
                final int alertAmount, final int alertExpiredDate, final int keepPeriod,
                final String emai) {
            this.itemno = itemno;
            this.actualStock = actualStock;
            this.alertAmount = alertAmount;
            this.alertExpiredDate = alertExpiredDate;
            this.keepPeriod = keepPeriod;
            this.emai = emai;
        }
        /**
         * @return the itemno
         */
        public String getItemno() {
            return itemno;
        }
        /**
         * @param itemno the itemno to set
         */
        public void setItemno(final String itemno) {
            this.itemno = itemno;
        }
        /**
         * @return the actualStock
         */
        public int getActualStock() {
            return actualStock;
        }
        /**
         * @param actualStock the actualStock to set
         */
        public void setActualStock(final int actualStock) {
            this.actualStock = actualStock;
        }
        /**
         * @return the alertAmount
         */
        public int getAlertAmount() {
            return alertAmount;
        }
        /**
         * @param alertAmount the alertAmount to set
         */
        public void setAlertAmount(final int alertAmount) {
            this.alertAmount = alertAmount;
        }
        /**
         * @return the alertExpiredDate
         */
        public int getAlertExpiredDate() {
            return alertExpiredDate;
        }
        /**
         * @param alertExpiredDate the alertExpiredDate to set
         */
        public void setAlertExpiredDate(final int alertExpiredDate) {
            this.alertExpiredDate = alertExpiredDate;
        }
        /**
         * @return the keepPeriod
         */
        public int getKeepPeriod() {
            return keepPeriod;
        }
        /**
         * @param keepPeriod the keepPeriod to set
         */
        public void setKeepPeriod(final int keepPeriod) {
            this.keepPeriod = keepPeriod;
        }
        /**
         * @return the emai
         */
        public String getEmai() {
            return emai;
        }
        /**
         * @param emai the emai to set
         */
        public void setEmai(final String emai) {
            this.emai = emai;
        }
    }
}
