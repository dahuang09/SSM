package com.core.pojo;

public class AlertSetting {
    private String id;

    private String email;

    private String remark;

    private String itemId;

    private String message;

    private Integer alertamount;

    private Integer alertexpireddate;

    private Integer enabled;

    private String alertsettingcol;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email == null ? null : email.trim();
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark == null ? null : remark.trim();
    }

    public String getItemId() {
        return itemId;
    }

    public void setItemId(String itemId) {
        this.itemId = itemId == null ? null : itemId.trim();
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message == null ? null : message.trim();
    }

    public Integer getAlertamount() {
        return alertamount;
    }

    public void setAlertamount(Integer alertamount) {
        this.alertamount = alertamount;
    }

    public Integer getAlertexpireddate() {
        return alertexpireddate;
    }

    public void setAlertexpireddate(Integer alertexpireddate) {
        this.alertexpireddate = alertexpireddate;
    }

    public Integer getEnabled() {
        return enabled;
    }

    public void setEnabled(Integer enabled) {
        this.enabled = enabled;
    }

    public String getAlertsettingcol() {
        return alertsettingcol;
    }

    public void setAlertsettingcol(String alertsettingcol) {
        this.alertsettingcol = alertsettingcol == null ? null : alertsettingcol.trim();
    }
}