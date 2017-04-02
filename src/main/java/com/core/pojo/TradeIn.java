package com.core.pojo;

import java.util.Date;

public class TradeIn {
    private String id;

    private String tradeinno;

    private Date tradeindate;

    private String remark;

    private String userId;

    public String getId() {
        return id;
    }

    public void setId(final String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getTradeinno() {
        return tradeinno;
    }

    public void setTradeinno(final String tradeinno) {
        this.tradeinno = tradeinno == null ? null : tradeinno.trim();
    }

    public Date getTradeindate() {
        return tradeindate;
    }

    public void setTradeindate(final Date tradeindate) {
        this.tradeindate = tradeindate;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(final String remark) {
        this.remark = remark == null ? null : remark.trim();
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(final String userId) {
        this.userId = userId == null ? null : userId.trim();
    }
}
