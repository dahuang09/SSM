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

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.core.dao.BizNoDefinitionMapper;
import com.core.dao.ItemMapper;
import com.core.dao.ReturnItemMapper;
import com.core.dao.UserMapper;
import com.core.pojo.BizNoDefinition;
import com.core.pojo.Item;
import com.core.pojo.ReturnItem;
import com.core.pojo.User;
import com.core.service.IReturnItemService;
import com.core.util.UuidUtil;

/**
 * @author damon.huang
 *
 */
@Service("returnItemSerivce")
public class ReturnItemServiceImpl implements IReturnItemService {

    private final String RETURN_ITEM_SUFIX = "RI";
    private final String formatTemplate = "yyyy-MM-dd";
    private final Logger log = Logger.getLogger(ReturnItemServiceImpl.class);
    @Resource
    private BizNoDefinitionMapper bizNoDefinitionMapper;
    @Resource
    private ReturnItemMapper returnItemMapper;
    @Resource
    private UserMapper userMapper;
//    private OrderOutMapper orderOutMapper;
//    private OrderInMapper orderInMapper;
    @Resource
    private ItemMapper itemMapper;

    /* (non-Javadoc)
     * @see com.core.service.IReturnItemService#addReturnItem(com.core.pojo.ReturnItem)
     */
    public String addReturnItem(final ReturnItem returnItem) throws Throwable {
        String bizNo = StringUtils.EMPTY;
        try {
            if (returnItem == null) {
                log.error("returnItem is null, plese check");
                return StringUtils.EMPTY;
            }
            final String itemId = returnItem.getItemId();
            final int returnAmount = returnItem.getAmount();
            itemMapper.increaseItemActualStockById(itemId, returnAmount);
//            final List<OrderOut> orderOuts = orderOutMapper.listOrderOutByItemId(itemId);
//            for (final OrderOut orderOut : orderOuts) {
//                final int orderOutAmount = orderOut.getAmount();
//                if (orderOutAmount >= returnAmount) {
//                    orderOutMapper.updateOrderOutAmountBy(orderOut.getId(), returnAmount, 0);
//                    break;
//                } else {
//                    returnAmount = returnAmount - orderOutAmount;
//                    orderOutMapper.updateOrderOutAmountBy(orderOut.getId(), orderOutAmount, 0);
//                }
//            }
            returnItem.setId(UuidUtil.createUUID());
            bizNo = generateReturnItemNo();
            returnItem.setReturnitemno(bizNo);
            final User user = userMapper.selectByPrimaryKey("joyce");
            final String userId = user.getId();
            returnItem.setWarehouseId("5c3c2353f73e44f38fb9f2e5f2b0585b");
            returnItem.setUserId(userId);
            this.returnItemMapper.insert(returnItem);
        } catch (final Throwable e) {
            throw e;
        }
        try {
            bizNoDefinitionMapper.increaseBizNo("returnItem");
        } catch (final Throwable e) {
            throw e;
        }
        return bizNo;
    }

    private String generateReturnItemNo() {
        int currrentBizNo = 1;
        final BizNoDefinition bizNoDefinition = bizNoDefinitionMapper.selectCurrentBizNo("returnItem");
        if (bizNoDefinition != null) {
            currrentBizNo = bizNoDefinition.getCurrentno();
        } else {
            bizNoDefinitionMapper.resetBizNo("returnItem");
        }
        final String dateStr = new SimpleDateFormat(formatTemplate).format(new Date());
        final String bizNo = RETURN_ITEM_SUFIX + StringUtils.replace(dateStr, "-", "")
                + String.valueOf(currrentBizNo);
        return bizNo;
    }

    /* (non-Javadoc)
     * @see com.core.service.IReturnItemService#listReturnItem(java.lang.String, int, int)
     */
    public Map<String, ?> listReturnItem(final String name, final int start, final int limit) {
        final Map<String, Object> map = new HashMap<String, Object>();
        final int total = returnItemMapper.countReturnItem();
        final List<Item> returnItemList = returnItemMapper.listReturnItem(name, start, limit);
        map.put("total", total);
        map.put("returnItemList", returnItemList);
        return map;
    }

}
