package com.core.pojo;

public class OrderOut {
    private String id;

    private String oderoutno;

    private Integer amount;

    private String remark;

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

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark == null ? null : remark.trim();
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