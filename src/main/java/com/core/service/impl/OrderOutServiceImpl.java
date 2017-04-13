// Copyright (c) 1998-2017 Core Solutions Limited. All rights reserved.
// ============================================================================
// CURRENT VERSION CNT.5.0.1
// ============================================================================
// CHANGE LOG
// CNT.5.0.1 : 2017-XX-XX, damon.huang, creation
// ============================================================================
package com.core.service.impl;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.core.dao.BizNoDefinitionMapper;
import com.core.dao.ItemMapper;
import com.core.dao.OrderInMapper;
import com.core.dao.OrderOutMapper;
import com.core.dao.TradeOutMapper;
import com.core.dao.UserMapper;
import com.core.dao.VendorMapper;
import com.core.dao.WarehouseMapper;
import com.core.pojo.BizNoDefinition;
import com.core.pojo.OrderOut;
import com.core.pojo.TradeOut;
import com.core.pojo.User;
import com.core.service.IOrderOutService;
import com.core.util.UuidUtil;

/**
 * @author damon.huang
 *
 */
@Service("orderOutService")
public class OrderOutServiceImpl implements IOrderOutService {

    @Resource
    private OrderOutMapper orderOutMapper;
    @Resource
    private OrderInMapper orderInMapper;
    @Resource
    private BizNoDefinitionMapper bizNoDefinitionMapper;
    @Resource
    private TradeOutMapper tradeOutMapper;
    @Resource
    private ItemMapper itemMapper;
    @Resource
    private UserMapper userMapper;
    @Resource
    private VendorMapper vendorMapper;
    @Resource
    private WarehouseMapper warehouseMapper;

    private final String TRADE_OUT_BIZ_NO_SUFIX = "TO";
    private final String ORDER_OUT_BIZ_NO_SUFIX = "OO";
    private final String formatTemplate = "yyyy-MM-dd";
    private final Logger log = Logger.getLogger(OrderOutServiceImpl.class);

    /* (non-Javadoc)
     * @see com.core.service.IOrderOutService#addOrderOuts(java.util.List)
     */
    public void addOrderOuts(final List<OrderOut> orderOuts) {
        final String tradeOutId = createTradeOut();
        final Map<String, Integer> itmeActualStockMap = new HashMap<String, Integer>();
        for (final OrderOut orderOut : orderOuts) {
            final String itemNo = orderOut.getItemno();
            Integer actualStockOut = itmeActualStockMap.get(itemNo);
            if (actualStockOut == null) {
                itmeActualStockMap.put(itemNo, orderOut.getAmount());
            } else {
                actualStockOut = actualStockOut + orderOut.getAmount();
                itmeActualStockMap.put(itemNo, actualStockOut);
            }
            final String itemId = itemMapper.selectIdByItemNo(itemNo);
            orderOut.setItemId(itemId);
            orderOut.setTradeoutId(tradeOutId);
            orderOut.setOderoutno(generateBizNo("orderOut", ORDER_OUT_BIZ_NO_SUFIX));
            orderOut.setId(UuidUtil.createUUID());
            orderOutMapper.insert(orderOut);
            bizNoDefinitionMapper.increaseBizNo("orderOut");
        }
        bizNoDefinitionMapper.increaseBizNo("tradeOut");

        for (final Entry<String, Integer> itemActualOutStock : itmeActualStockMap.entrySet()) {
            final String itemNo = itemActualOutStock.getKey();
            final Integer actualStock = itemActualOutStock.getValue();
            itemMapper.reduceItemActualStock(itemNo, actualStock);
        }

        log.info("test");

    }

    private String createTradeOut() {
        final User user = userMapper.selectByPrimaryKey("joyce");
        final TradeOut tradeOut = new TradeOut();
        tradeOut.setUserId(user.getId());
        tradeOut.setId(UuidUtil.createUUID());
        tradeOut.setTradeoutno(generateBizNo("tradeOut", TRADE_OUT_BIZ_NO_SUFIX));
        tradeOut.setTradeoutdate(new Date());
        tradeOutMapper.insert(tradeOut);
        return tradeOut.getId();
    }

    private String generateBizNo(final String moduleId, final String moduleSufix) {
        int currrentBizNo = 1;
        final BizNoDefinition bizNoDefinition = bizNoDefinitionMapper.selectCurrentBizNo(moduleId);
        if (bizNoDefinition != null) {
            currrentBizNo = bizNoDefinition.getCurrentno();
        } else {
            bizNoDefinitionMapper.resetBizNo(moduleId);
        }
        final String dateStr = new SimpleDateFormat(formatTemplate).format(new Date());
        final String bizNo = moduleSufix + StringUtils.replace(dateStr, "-", "")
                + String.valueOf(currrentBizNo);
        return bizNo;
    }

    /* (non-Javadoc)
     * @see com.core.service.IOrderOutService#listOrderOut(java.lang.String, int, int)
     */
    public Map<String, ?> listOrderOut(final String name, final int start, final int limit) {
        final Map<String, Object> map = new HashMap<String, Object>();
        final int total = orderOutMapper.countOrderOut();
        final List<OrderOut> orderList = orderOutMapper.listOrderOut(name, start, limit);
        map.put("total", total);
        map.put("orderOutList", orderList);
        return map;
    }

}
