package com.core.pojo;

import java.math.BigDecimal;
import java.util.Date;

public class TradeIn {
    private String id;

    private String tradeinno;

    private BigDecimal total;

    private Date tradedate;

    private String remark;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getTradeinno() {
        return tradeinno;
    }

    public void setTradeinno(String tradeinno) {
        this.tradeinno = tradeinno == null ? null : tradeinno.trim();
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
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