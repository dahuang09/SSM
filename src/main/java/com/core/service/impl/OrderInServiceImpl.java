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
import com.core.dao.TradeInMapper;
import com.core.dao.UserMapper;
import com.core.dao.VendorMapper;
import com.core.dao.WarehouseMapper;
import com.core.pojo.BizNoDefinition;
import com.core.pojo.OrderIn;
import com.core.pojo.TradeIn;
import com.core.pojo.User;
import com.core.service.IOrderInService;
import com.core.util.UuidUtil;

/**
 * @author damon.huang
 *
 */
@Service("orderInService")
public class OrderInServiceImpl implements IOrderInService {
    @Resource
    private OrderInMapper orderInMapper;
    @Resource
    private BizNoDefinitionMapper bizNoDefinitionMapper;
    @Resource
    private TradeInMapper tradeInMapper;
    @Resource
    private ItemMapper itemMapper;
    @Resource
    private UserMapper userMapper;
    @Resource
    private VendorMapper vendorMapper;
    @Resource
    private WarehouseMapper warehouseMapper;

    private final String BIZ_NO_SUFIX = "TI";
    private final String ORDER_IN_BIZ_NO_SUFIX = "OI";
    private final String formatTemplate = "yyyy-MM-dd";
    private final Logger log = Logger.getLogger(OrderInServiceImpl.class);


    /* (non-Javadoc)
     * @see com.core.service.IOrderInService#addOrderIns(java.util.List)
     */
    public void addOrderIns(final List<OrderIn> orderIns) {
        final String tradeInId = createTradeIn();
        final Map<String, Integer> itmeActualStockMap = new HashMap<String, Integer>();
        for (final OrderIn orderIn : orderIns) {
            final String itemNo = orderIn.getItemno();
            Integer actualStock = itmeActualStockMap.get(itemNo);
            if (actualStock == null) {
                itmeActualStockMap.put(itemNo, orderIn.getAmount());
            } else {
                actualStock = actualStock + orderIn.getAmount();
                itmeActualStockMap.put(itemNo, actualStock);
            }
            final String itemId = itemMapper.selectIdByItemNo(itemNo);
            orderIn.setItemId(itemId);
            orderIn.setTradeinId(tradeInId);
            orderIn.setOrderinno(generateBizNo("orderIn", ORDER_IN_BIZ_NO_SUFIX));
            orderIn.setId(UuidUtil.createUUID());
            orderIn.setVendorId("ef4b1988395b4e0fbeec9b09669007b0");
            orderIn.setWarehouseId("716587d595b04a4a8e8e787500cb1232");
            orderInMapper.insert(orderIn);
            bizNoDefinitionMapper.increaseBizNo("orderIn");
        }
        bizNoDefinitionMapper.increaseBizNo("tradeIn");

        for (final Entry<String, Integer> itemActualStock : itmeActualStockMap.entrySet()) {
            final String itemNo = itemActualStock.getKey();
            final Integer actualStock = itemActualStock.getValue();
            itemMapper.increaseItemActualStock(itemNo, actualStock);
        }

        log.info("test");
    }

    private String createTradeIn() {
        final User user = userMapper.selectByPrimaryKey("joyce");
        final TradeIn tradeIn = new TradeIn();
        tradeIn.setUserId(user.getId());
        tradeIn.setId(UuidUtil.createUUID());
        tradeIn.setTradeinno(generateBizNo("tradeIn", BIZ_NO_SUFIX));
        tradeIn.setTradeindate(new Date());
        tradeInMapper.insert(tradeIn);
        return tradeIn.getId();
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
     * @see com.core.service.IOrderInService#listOrderIn(java.lang.String, int, int)
     */
    public Map<String, ?> listOrderIn(final String name, final int start, final int limit) {
        final Map<String, Object> map = new HashMap<String, Object>();
        final int total = orderInMapper.countOrderIn();
        final List<OrderIn> orderList = orderInMapper.listOrderIn(name, start, limit);
        map.put("total", total);
        map.put("orderInList", orderList);
        return map;
    }
}
