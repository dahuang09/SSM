package com.core.pojo;

import java.math.BigDecimal;
import java.util.Date;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
@JsonIgnoreProperties(ignoreUnknown = true)
public class OrderIn {
    private String id;

    private BigDecimal price;

    private Integer amount;

    private BigDecimal total;

    private Date productdate;

    private Integer keepperiod;

    private Date expireddate;

    private String remark;

    private String orderinno;

    private String itemId;

    private String tradeinId;

    private String vendorId;

    private String warehouseId;

    //自己手动加的
    private String itemno;
    private String categoryno;

    private Category category;
    private Item item;
    private Vendor vendor;
    private Warehouse warehouse;
    private TradeIn tradeIn;
    private AlertSetting alertSetting;

    /**
     * @return the alertSetting
     */
    public AlertSetting getAlertSetting() {
        return alertSetting;
    }

    /**
     * @param alertSetting the alertSetting to set
     */
    public void setAlertSetting(final AlertSetting alertSetting) {
        this.alertSetting = alertSetting;
    }

    /**
     * @return the category
     */
    public Category getCategory() {
        return category;
    }

    /**
     * @param category the category to set
     */
    public void setCategory(final Category category) {
        this.category = category;
    }

    /**
     * @return the item
     */
    public Item getItem() {
        return item;
    }

    /**
     * @param item the item to set
     */
    public void setItem(final Item item) {
        this.item = item;
    }

    /**
     * @return the vendor
     */
    public Vendor getVendor() {
        return vendor;
    }

    /**
     * @param vendor the vendor to set
     */
    public void setVendor(final Vendor vendor) {
        this.vendor = vendor;
    }

    /**
     * @return the warehouse
     */
    public Warehouse getWarehouse() {
        return warehouse;
    }

    /**
     * @param warehouse the warehouse to set
     */
    public void setWarehouse(final Warehouse warehouse) {
        this.warehouse = warehouse;
    }

    /**
     * @return the tradeIn
     */
    public TradeIn getTradeIn() {
        return tradeIn;
    }

    /**
     * @param tradeIn the tradeIn to set
     */
    public void setTradeIn(final TradeIn tradeIn) {
        this.tradeIn = tradeIn;
    }

    /**
     * @return the itemno
     */
    public String getItemno() {
        return itemno;
    }

    /**
     * @param itemno the itemno to set
     */
    public void setItemno(final String itemno) {
        this.itemno = itemno;
    }

    /**
     * @return the categoryno
     */
    public String getCategoryno() {
        return categoryno;
    }

    /**
     * @param categoryno the categoryno to set
     */
    public void setCategoryno(final String categoryno) {
        this.categoryno = categoryno;
    }

    public String getId() {
        return id;
    }

    public void setId(final String id) {
        this.id = id == null ? null : id.trim();
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(final BigDecimal price) {
        this.price = price;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(final Integer amount) {
        this.amount = amount;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(final BigDecimal total) {
        this.total = total;
    }

    public Date getProductdate() {
        return productdate;
    }

    public void setProductdate(final Date productdate) {
        this.productdate = productdate;
    }

    public Integer getKeepperiod() {
        return keepperiod;
    }

    public void setKeepperiod(final Integer keepperiod) {
        this.keepperiod = keepperiod;
    }

    public Date getExpireddate() {
        return expireddate;
    }

    public void setExpireddate(final Date expireddate) {
        this.expireddate = expireddate;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(final String remark) {
        this.remark = remark == null ? null : remark.trim();
    }

    public String getOrderinno() {
        return orderinno;
    }

    public void setOrderinno(final String orderinno) {
        this.orderinno = orderinno == null ? null : orderinno.trim();
    }

    public String getItemId() {
        return itemId;
    }

    public void setItemId(final String itemId) {
        this.itemId = itemId == null ? null : itemId.trim();
    }

    public String getTradeinId() {
        return tradeinId;
    }

    public void setTradeinId(final String tradeinId) {
        this.tradeinId = tradeinId == null ? null : tradeinId.trim();
    }

    public String getVendorId() {
        return vendorId;
    }

    public void setVendorId(final String vendorId) {
        this.vendorId = vendorId == null ? null : vendorId.trim();
    }

    public String getWarehouseId() {
        return warehouseId;
    }

    public void setWarehouseId(final String warehouseId) {
        this.warehouseId = warehouseId == null ? null : warehouseId.trim();
    }
}
