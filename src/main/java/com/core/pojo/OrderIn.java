package com.core.pojo;

import java.math.BigDecimal;
import java.util.Date;

public class OrderIn {
    private String id;

    private BigDecimal price;

    private Integer amount;

    private BigDecimal total;

    private Date productdate;

    private Integer keepperiod;

    private Date expireddate;

    private Date datein;

    private String remark;

    private String orderinno;

    private String itemId;

    private String tradeinId;

    private String userId;

    private String vendorId;

    private String warehouseId;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    public Date getProductdate() {
        return productdate;
    }

    public void setProductdate(Date productdate) {
        this.productdate = productdate;
    }

    public Integer getKeepperiod() {
        return keepperiod;
    }

    public void setKeepperiod(Integer keepperiod) {
        this.keepperiod = keepperiod;
    }

    public Date getExpireddate() {
        return expireddate;
    }

    public void setExpireddate(Date expireddate) {
        this.expireddate = expireddate;
    }

    public Date getDatein() {
        return datein;
    }

    public void setDatein(Date datein) {
        this.datein = datein;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark == null ? null : remark.trim();
    }

    public String getOrderinno() {
        return orderinno;
    }

    public void setOrderinno(String orderinno) {
        this.orderinno = orderinno == null ? null : orderinno.trim();
    }

    public String getItemId() {
        return itemId;
    }

    public void setItemId(String itemId) {
        this.itemId = itemId == null ? null : itemId.trim();
    }

    public String getTradeinId() {
        return tradeinId;
    }

    public void setTradeinId(String tradeinId) {
        this.tradeinId = tradeinId == null ? null : tradeinId.trim();
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId == null ? null : userId.trim();
    }

    public String getVendorId() {
        return vendorId;
    }

    public void setVendorId(String vendorId) {
        this.vendorId = vendorId == null ? null : vendorId.trim();
    }

    public String getWarehouseId() {
        return warehouseId;
    }

    public void setWarehouseId(String warehouseId) {
        this.warehouseId = warehouseId == null ? null : warehouseId.trim();
    }
}