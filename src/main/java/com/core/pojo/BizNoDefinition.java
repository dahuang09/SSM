package com.core.pojo;

import java.util.Date;

public class BizNoDefinition {
    private String id;

    private Integer currentno;

    private Date updatedon;

    private String module;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    public Integer getCurrentno() {
        return currentno;
    }

    public void setCurrentno(Integer currentno) {
        this.currentno = currentno;
    }

    public Date getUpdatedon() {
        return updatedon;
    }

    public void setUpdatedon(Date updatedon) {
        this.updatedon = updatedon;
    }

    public String getModule() {
        return module;
    }

    public void setModule(String module) {
        this.module = module == null ? null : module.trim();
    }
}