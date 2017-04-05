package com.core.pojo;

public class Warehouse {
    private String id;

    private String name;

    private String remark;

    private Integer iddeleted;

    private String warehouseno;

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

    public String getRemark() {
        return remark;
    }

    public void setRemark(final String remark) {
        this.remark = remark == null ? null : remark.trim();
    }

    public Integer getIddeleted() {
        return iddeleted;
    }

    public void setIddeleted(final Integer iddeleted) {
        this.iddeleted = iddeleted;
    }

    public String getWarehouseno() {
        return warehouseno;
    }

    public void setWarehouseno(final String warehouseno) {
        this.warehouseno = warehouseno == null ? null : warehouseno.trim();
    }

    /**
     * @param i
     */

}