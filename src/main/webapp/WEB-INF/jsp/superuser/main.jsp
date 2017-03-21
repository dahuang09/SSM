<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">

    <title>库存后台管理系统首页</title>

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

    <!--<script type="text/javascript" src="ext/managediframe/uxvismode.js"></script>
    <script type="text/javascript" src="ext/managediframe/multidom.js"></script>
    <script type="text/javascript" src="ext/managediframe/mif.js"></script>
    <script type="text/javascript" src="ext/managediframe/mifmsg.js"></script>miframe.js

    -->
    <script type="text/javascript" src="ext/miframe.js"></script>
    <script type="text/javascript" src="js/superuser.js"></script>
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
    <!--<div id="supertree"></div>

  --></body>
</html>
