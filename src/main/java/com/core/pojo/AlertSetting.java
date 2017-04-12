package com.core.pojo;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class AlertSetting {
    private String id;

    private String email;

    private String remark;

    private String message;

    private Integer alertamount;

    private Integer alertexpireddate;

    private Integer enabled;

    private String alertsettingcol;

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

    public String getEmail() {
        return email;
    }

    public void setEmail(final String email) {
        this.email = email == null ? null : email.trim();
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(final String remark) {
        this.remark = remark == null ? null : remark.trim();
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(final String message) {
        this.message = message == null ? null : message.trim();
    }

    public Integer getAlertamount() {
        return alertamount;
    }

    public void setAlertamount(final Integer alertamount) {
        this.alertamount = alertamount;
    }

    public Integer getAlertexpireddate() {
        return alertexpireddate;
    }

    public void setAlertexpireddate(final Integer alertexpireddate) {
        this.alertexpireddate = alertexpireddate;
    }

    public Integer getEnabled() {
        return enabled;
    }

    public void setEnabled(final Integer enabled) {
        this.enabled = enabled;
    }

    public String getAlertsettingcol() {
        return alertsettingcol;
    }

    public void setAlertsettingcol(final String alertsettingcol) {
        this.alertsettingcol = alertsettingcol == null ? null : alertsettingcol.trim();
    }

    public String getItemId() {
        return itemId;
    }

    public void setItemId(final String itemId) {
        this.itemId = itemId == null ? null : itemId.trim();
    }
}
