<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page contentType="application/json" pageEncoding="UTF-8"%>
{
    status:<%=request.getAttribute("javax.servlet.error.status_code") %>,
    reason:<%=request.getAttribute("javax.servlet.error.message") %>
}
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
    </HEAD>
    <BODY bgColor=#ffffff leftMargin=0 topMargin=0 rightMargin=0
        marginheight="0" marginwidth="0" onload="javascript:document.form1.username.focus();">
    </BODY>
</HTML>
