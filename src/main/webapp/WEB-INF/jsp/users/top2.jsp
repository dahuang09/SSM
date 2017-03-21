<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%-- <%@taglib prefix="s" uri="/struts-tags"%> --%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <%-- <base href="<%=basePath%>"> --%>

    <title>My JSP 'index.jsp' starting page</title>
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
    <meta http-equiv="description" content="This is my page">
    <script type="text/javascript" src="js2/time.js"></script>
    <!--<link href="ext/skin/css/base.css" rel="stylesheet" type="text/css">
    --><style><!--
body {
    margin-left: 0px;
    margin-top: 0px;
    margin-right: 0px;
    margin-bottom: 0px;
    width:auto;
    height: auto;

   background: url("images2/logo2.gif") no-repeat;
    }
</style>

  </head>

 <body bgColor='#ffffff' onload="show()">
<table width="100%" border="0" cellpadding="0" cellspacing="0">
  <tr style="height: auto;">
    <td align="left" valign="bottom" style="font-size: 30px;font-weight: bold;height: auto;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
    <td align="right" valign="bottom" style="font-size: 15px;font-weight: bold;height: auto;">
    您好：<span class="username"><s:property value="#session.username" /></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;当前时间:&nbsp;<span id="nowDiv"></span>

  </tr>
</table>
</body>
</html>
