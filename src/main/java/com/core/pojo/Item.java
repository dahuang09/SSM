package com.core.pojo;

import java.math.BigDecimal;

public class Item {
    private String id;

    private String itemname;

    private Integer safetystock;

    private Integer actualstock;

    private String itemno;

    private String categoryId;

    private BigDecimal price;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getItemname() {
        return itemname;
    }

    public void setItemname(String itemname) {
        this.itemname = itemname == null ? null : itemname.trim();
    }

    public Integer getSafetystock() {
        return safetystock;
    }

    public void setSafetystock(Integer safetystock) {
        this.safetystock = safetystock;
    }

    public Integer getActualstock() {
        return actualstock;
    }

    public void setActualstock(Integer actualstock) {
        this.actualstock = actualstock;
    }

    public String getItemno() {
        return itemno;
    }

    public void setItemno(String itemno) {
        this.itemno = itemno == null ? null : itemno.trim();
    }

    public String getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(String categoryId) {
        this.categoryId = categoryId == null ? null : categoryId.trim();
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }
}