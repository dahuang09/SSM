package com.core.pojo;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ReturnItem {
    private String id;

    private String returnitemno;

    private String reason;

    private String itemId;

    private String warehouseId;

    private String userId;

    private Integer amount;

    private Item item;
    private Warehouse warehouse;
    private User user;

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
     * @return the user
     */
    public User getUser() {
        return user;
    }

    /**
     * @param user the user to set
     */
    public void setUser(final User user) {
        this.user = user;
    }

    public String getId() {
        return id;
    }

    public void setId(final String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getReturnitemno() {
        return returnitemno;
    }

    public void setReturnitemno(final String returnitemno) {
        this.returnitemno = returnitemno == null ? null : returnitemno.trim();
    }

    public String getReason() {
        return reason;
    }

    public void setReason(final String reason) {
        this.reason = reason == null ? null : reason.trim();
    }

    public String getItemId() {
        return itemId;
    }

    public void setItemId(final String itemId) {
        this.itemId = itemId == null ? null : itemId.trim();
    }

    public String getWarehouseId() {
        return warehouseId;
    }

    public void setWarehouseId(final String warehouseId) {
        this.warehouseId = warehouseId == null ? null : warehouseId.trim();
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(final String userId) {
        this.userId = userId == null ? null : userId.trim();
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(final Integer amount) {
        this.amount = amount;
    }
}
