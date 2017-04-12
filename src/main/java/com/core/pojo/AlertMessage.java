package com.core.pojo;

import java.util.Date;

public class AlertMessage {
    private String id;

    private String altermsgno;

    private String email;

    private Date createddate;

    private String remark;

    private String itemId;

    private Item item;

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

    public String getId() {
        return id;
    }

    public void setId(final String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getAltermsgno() {
        return altermsgno;
    }

    public void setAltermsgno(final String altermsgno) {
        this.altermsgno = altermsgno == null ? null : altermsgno.trim();
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(final String email) {
        this.email = email == null ? null : email.trim();
    }

    public Date getCreateddate() {
        return createddate;
    }

    public void setCreateddate(final Date createddate) {
        this.createddate = createddate;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(final String remark) {
        this.remark = remark == null ? null : remark.trim();
    }

    public String getItemId() {
        return itemId;
    }

    public void setItemId(final String itemId) {
        this.itemId = itemId == null ? null : itemId.trim();
    }
}
