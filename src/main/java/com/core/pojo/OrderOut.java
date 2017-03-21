package com.core.pojo;

import java.util.Date;

public class OrderOut {
    private String id;

    private String oderoutno;

    private Integer amount;

    private Date dateout;

    private String remark;

    private String requester;

    private String tradeoutId;

    private String itemId;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getOderoutno() {
        return oderoutno;
    }

    public void setOderoutno(String oderoutno) {
        this.oderoutno = oderoutno == null ? null : oderoutno.trim();
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public Date getDateout() {
        return dateout;
    }

    public void setDateout(Date dateout) {
        this.dateout = dateout;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark == null ? null : remark.trim();
    }

    public String getRequester() {
        return requester;
    }

    public void setRequester(String requester) {
        this.requester = requester == null ? null : requester.trim();
    }

    public String getTradeoutId() {
        return tradeoutId;
    }

    public void setTradeoutId(String tradeoutId) {
        this.tradeoutId = tradeoutId == null ? null : tradeoutId.trim();
    }

    public String getItemId() {
        return itemId;
    }

    public void setItemId(String itemId) {
        this.itemId = itemId == null ? null : itemId.trim();
    }
}