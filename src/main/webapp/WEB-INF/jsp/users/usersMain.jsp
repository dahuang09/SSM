<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
   request.setCharacterEncoding("UTF-8");
   response.setCharacterEncoding("UTF-8");
   response.setContentType("text/html; charset=utf-8");
%>

<%-- <%@ taglib prefix="s" uri="/struts-tags" %> --%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">

   <title>库存管理系统首页</title>

    <meta http-equiv="Content-Type" content="application/x-www-form-urlencoded; charset=utf-8" />

    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
    <meta http-equiv="description" content="This is my page">
        <link rel="stylesheet" href="ext/resources/css/ext-all.css" />
        <link rel="stylesheet" href="ext/resources/css/xtheme-blue.css" />
    <script type="text/javascript" src="ext/ext-base.js"></script>
    <script type="text/javascript" src="ext/ext-all.js"></script>
    <script type="text/javascript" src="ext/ext-lang-zh_CN.js"></script>
    <script type="text/javascript" src="ext/miframe.js"></script>
    <script type="text/javascript" src="js/users.js"></script>
    <style type="text/css">

    .settings {
        background-image:url(ext/imgs/collapse-all.gif);
    }
    .tabs {
        background-image:url(ext/imgs/tabs.gif);
    }
    </style>
</head>

  <body>
  <%
     //String regionid = (String)request.getAttribute("regionid");
     //String regionname = (String)request.getAttribute("regionname");
    String regionid = (String)request.getSession().getAttribute("regionid");
    String regionname = (String)request.getSession().getAttribute("regionname");
   //String regionid = request.getParameter("regionid");
   //String regionname = request.getParameter("regionname");
   //String regionname = new String(request.getParameter("regionname").getBytes("ISO8859_1"));
   %>
<input type="hidden" id="myhidden" value=<%=regionid%>>
<input type="hidden" id="myhidden2" value=<%=regionname%>><!--

  <div id="userstree"></div>

--></body>
</html>
