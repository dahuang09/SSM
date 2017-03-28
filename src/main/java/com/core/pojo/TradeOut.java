package com.core.pojo;

import java.util.Date;

public class TradeOut {
    private String id;

    private String tradeoutno;

    private Date tradeoutdate;

    private String remark;

    private String userId;

    private String requester;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getTradeoutno() {
        return tradeoutno;
    }

    public void setTradeoutno(String tradeoutno) {
        this.tradeoutno = tradeoutno == null ? null : tradeoutno.trim();
    }

    public Date getTradeoutdate() {
        return tradeoutdate;
    }

    public void setTradeoutdate(Date tradeoutdate) {
        this.tradeoutdate = tradeoutdate;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark == null ? null : remark.trim();
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId == null ? null : userId.trim();
    }

    public String getRequester() {
        return requester;
    }

    public void setRequester(String requester) {
        this.requester = requester == null ? null : requester.trim();
    }
}