package com.core.pojo;

import java.util.Date;

public class TradeOut {
    private String id;

    private String tradeoutno;

    private Date tradedate;

    private String remark;

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

    public Date getTradedate() {
        return tradedate;
    }

    public void setTradedate(Date tradedate) {
        this.tradedate = tradedate;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark == null ? null : remark.trim();
    }
}