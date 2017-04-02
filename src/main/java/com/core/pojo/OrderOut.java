package com.core.pojo;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class OrderOut {
    private String id;

    private String oderoutno;

    private Integer amount;

    private String remark;

    private String tradeoutId;

    private String itemId;

    private String itemno;

    private Item item;
    private Category category;
    private TradeOut tradeOut;



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
     * @return the tradeOut
     */
    public TradeOut getTradeOut() {
        return tradeOut;
    }

    /**
     * @param tradeOut the tradeOut to set
     */
    public void setTradeOut(final TradeOut tradeOut) {
        this.tradeOut = tradeOut;
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

    public String getId() {
        return id;
    }

    public void setId(final String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getOderoutno() {
        return oderoutno;
    }

    public void setOderoutno(final String oderoutno) {
        this.oderoutno = oderoutno == null ? null : oderoutno.trim();
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(final Integer amount) {
        this.amount = amount;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(final String remark) {
        this.remark = remark == null ? null : remark.trim();
    }

    public String getTradeoutId() {
        return tradeoutId;
    }

    public void setTradeoutId(final String tradeoutId) {
        this.tradeoutId = tradeoutId == null ? null : tradeoutId.trim();
    }

    public String getItemId() {
        return itemId;
    }

    public void setItemId(final String itemId) {
        this.itemId = itemId == null ? null : itemId.trim();
    }
}
