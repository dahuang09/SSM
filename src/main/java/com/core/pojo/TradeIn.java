package com.core.pojo;

public class TradeIn {
    private String id;

    private String tradeinno;

    private Integer tradeindate;

    private String remark;

    private String userId;

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

    public Integer getTradeindate() {
        return tradeindate;
    }

    public void setTradeindate(Integer tradeindate) {
        this.tradeindate = tradeindate;
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
}