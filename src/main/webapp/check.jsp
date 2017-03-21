<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
<title>校宿管—学生查询宿舍评分</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="description" content="Place your description here" />
<meta name="keywords" content="put, your, keyword, here" />
<meta name="author" content="cssMoban.com - website templates provider" />
<link rel="stylesheet" type="text/css" href="ext/resources/css/ext-all.css"/>
   
    <script type="text/javascript" src="ext/ext-base.js"></script>
   
    <script type="text/javascript" src="ext/ext-all.js"></script>
    <script type="text/javascript" src="ext/ext-lang-zh_CN.js"></script>
    <script type="text/javascript" src="js/check.js"></script>
    <script type="text/javascript" src="js/checkresult.js"></script>
    
		<link href="css/style.css" rel="stylesheet" type="text/css" />
<script src="js2/jquery-1.4.2.min.js" type="text/javascript"></script>
<script src="js2/cufon-yui.js" type="text/javascript"></script>
<script src="js2/cufon-replace.js" type="text/javascript"></script>
<script src="js2/AvantGarde_Bk_BT_400.font.js" type="text/javascript"></script>
<script src="js2/Myriad_Pro_300.font.js" type="text/javascript"></script>
<script src="js2/jcarousellite.js" type="text/javascript"></script>

<script>
			function check(){
				var frm = document.getElementById('contacts-form');
				if(frm.regionname.value==""){
					alert("区名名不能为空!");
					//document.form1.username.focus();
					return false;
				}else if(frm.flatname.value==""){
				    alert("栋名不能为空!");
				    //frm.password.focus();
				    return false;
				}else {
					return true;
				}
			}
		</script>

<script type="text/javascript">

	$(document).ready(function(){
	  $("a.new_window").attr("target", "_blank");
	});
		
</script>
<!--[if lt IE 7]>
<script type="text/javascript" src="js2/ie_png.js"></script>
<script type="text/javascript">
	ie_png.fix('.png, .carousel-box .next img, .carousel-box .prev img');
</script>
<link href="css/ie6.css" rel="stylesheet" type="text/css" />
<![endif]-->
</head>
<body id="page4">
<div class="tail-top-left"></div>
<div class="tail-top">
<!-- header -->
	<div id="header">
		<div class="row-1">
			<div class="fleft"><img src="images2/logo.gif" alt="" /></div>
			<div class="fright">
				<ul>
					<!--<li><a href="index.html">home</a></li>
					<li><a href="about-us.html">about</a></li>
					<li><a href="articles.html">articles</a></li>
					<li><a href="contact-us.html" class="active">contacts</a></li>
					<li><a href="sitemap.html">sitemap</a></li>
				--></ul>
			</div>
		</div>
		<div class="row-2"><span><b><img src="images2/slogan.gif" alt="" /></b><img src="images2/button.gif" alt="" /></span></div>
	</div>
<!-- content -->
	<div id="content">
		<div class="row-1">
			<div class="inside">
				<div class="container">
					<div class="aside">
						<h3>Login</h3>
						<ul>
							<li>
								<img src="images2/pic1.gif" alt="" /><div class="extra-wrap"><span>users login</span><a href="../schoolmanagement/index.jsp">用户登录...</a></div>
							</li>
							<li>
								<!--<img src="images2/pic2.gif" alt="" />--><div class="extra-wrap"></div>
							</li>
							<li>
								<!--<img src="images2/pic3.gif" alt="" />--><div class="extra-wrap"></div>
							</li>
							<li>
								<!--<img src="images2/pic4.gif" alt="" />--><div class="extra-wrap"></div>
							</li>
							<li>
								<!--<img src="images2/pic5.gif" alt="" />--><div class="extra-wrap"></div>
							</li>
						</ul>
						<!--<div class="wrapper"><a href="#" class="link1"><em><b>Learn More</b></em></a></div>
					--></div>
					<div class="content"><div class="inner_copy"></div>
						<h5 style="border-bottom:1px solid #d4d4d4;padding:0 0 0 10px;margin-bottom:20px;left:-10px;position:relative;font-size: 28px;">查询</h5>
						<ul class="ul">
							<li class="li" style="float:left;">
					           	区&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名:<input type="text" value="" id="regionname"/>
						  </li>
						  <li class="li" style="float:left;">
						     <label>栋&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名:</label><input type="text" value="" id="flatname"/>
						</li>
						<li class="li" style="float:left;">
						   <label>房&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号:</label><br/>
						   <input type="text" value="" id="room"/>
                        </li>   
                        <li class="li" style="float:left;">
                        <br/>
                           <div id="submit"></div>
                        </li>
                        </ul>
                        </div>
					<div class="clear"></div>
				</div>
				<div id="result"></div>
				<!--<div id="divspace" style="width: 100px; background-color: red;"></div><div id="result"></div>
			--></div>
		</div>
		<div class="tail-middle">
			<div class="row-2">
				<div class="inside">
					<h3>Our Contacts</h3>
					<div class="indent">
						<div class="box1">
							<div class="border-top">
								<div class="border-bot">
									<div class="left-top-corner">
										<div class="right-top-corner">
											<div class="right-bot-corner">
												<div class="left-bot-corner">
													<div class="inner">
														<div class="wrapper">
															<div class="address fleft"><b>办公室地址:</b>黄桂清***<br />
																<b>部门:</b>学生工作处校宿管部门<br />
																<b>电话:</b>12345678912<br />
																<b>邮箱:</b>123456@163.com</div>
																<div class="extra-column"><b>我们的宗旨:</b><br />
																为学生营造一个良好的学习氛围
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
<!-- footer -->
	<!--<div id="footer">
		<div class="footer">Copyright - Type in your name here<br />
			<a href="http://www.cssmoban.com/" class="new_window">网站模板</a> from cssMoban.com<br />
			<a href="http://www.cssmoban.com/" class="new_window">cssMoban.com</a> provided by cssMoban.com
		</div>
	</div>
</div>
--><script type="text/javascript"> Cufon.now(); </script>
</body>
</html>
