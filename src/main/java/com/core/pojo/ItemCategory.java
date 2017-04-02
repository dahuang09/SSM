package com.core.pojo;

import java.math.BigDecimal;

public class ItemCategory {
    private String id;

    private String itemname;

    private Integer safetystock;

    private Integer actualstock;

    private String itemno;

    private String categoryId;

    private BigDecimal price;

    private String categoryName;

    private Category category;

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
     * @return the categoryName
     */
    public String getCategoryName() {
        return categoryName;
    }

    /**
     * @param categoryName the categoryName to set
     */
    public void setCategoryName(final String categoryName) {
        this.categoryName = categoryName;
    }

    public String getId() {
        return id;
    }

    public void setId(final String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getItemname() {
        return itemname;
    }

    public void setItemname(final String itemname) {
        this.itemname = itemname == null ? null : itemname.trim();
    }

    public Integer getSafetystock() {
        return safetystock;
    }

    public void setSafetystock(final Integer safetystock) {
        this.safetystock = safetystock;
    }

    public Integer getActualstock() {
        return actualstock;
    }

    public void setActualstock(final Integer actualstock) {
        this.actualstock = actualstock;
    }

    public String getItemno() {
        return itemno;
    }

    public void setItemno(final String itemno) {
        this.itemno = itemno == null ? null : itemno.trim();
    }

    public String getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(final String categoryId) {
        this.categoryId = categoryId == null ? null : categoryId.trim();
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(final BigDecimal price) {
        this.price = price;
    }
}
