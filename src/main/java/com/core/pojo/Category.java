package com.core.pojo;

public class Category {
    private String id;

    private String name;

    private String categoryno; //测试批量添加功能，可删掉

    private String remark;

    public String getId() {
        return id;
    }

    public void setId(final String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getName() {
        return name;
    }

    public void setName(final String name) {
        this.name = name == null ? null : name.trim();
    }

    public String getCategoryno() {
        return categoryno;
    }

    public void setCategoryno(final String categoryno) {
        this.categoryno = categoryno == null ? null : categoryno.trim();
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(final String remark) {
        this.remark = remark == null ? null : remark.trim();
    }
}
