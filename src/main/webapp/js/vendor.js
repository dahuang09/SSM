Ext.onReady(function(){
	Ext.lib.Ajax.defaultPostHeader = "application/x-www-form-urlencoded; charset=UTF-8";


	//更换皮肤

var themes =
    [
        ['blue', '默认'],
        ['gray', '灰色'],
        ['olive', '橄榄绿'],
        ['darkgray', '暗灰色'],
        ['green', '绿色'],
        ['black', '黑色'],
        ['purple', '紫色'],
        ['chocolate', '咖啡色'],
        ['calista', '混色']
    ];
    var cbThemes = new Ext.form.ComboBox
    ({
        id: 'cbThemes',
        store: themes,
        width: 100,
        typeAhead: true,
        editable:false,
        triggerAction: 'all',
        emptyText:'界面主题',
        selectOnFocus:true
    });
    cbThemes.on
    ({
        "select":function()
                {
                   var css =   cbThemes.getValue();
                   //设置cookies
                   var date=new Date();
                   date.setTime(date.getTime()+30*24*3066*1000);
                   document.getElementsByTagName("link")[1].href="ext/resources/css/xtheme-" + css + ".css";
                   document.cookie="css="+css+";expires="+date.toGMTString();


                   //var sub = document.getElementById('Sub');
                  var subs = document.getElementsByName('Sub');
                  var len = subs.length;
                  for(var i=0;i<len;i++){

                  	if (subs[i] && subs[i].contentWindow.Ext) {//验证窗体是否包含Ext

                    subs[i].contentWindow.ChangeTheme('ext/resources/css/xtheme-' + css + '.css');//这是重点注意contentWindow的用法
                }
                  }

                }
    });
    var cookieArr = window.document.cookie.split(";");
		            var css = null;
		            for(var i=0;i<cookieArr.length;i++) {
		            var arr = cookieArr[i].split("=");
		            if(arr[0]=="css") {
		                  css = arr[1];
		                 }
		            };

		            //alert(css);
		            window.document.getElementsByTagName("link")[1].href="ext/resources/css/xtheme-"+css+ ".css";


	var regionid=Ext.get("myhidden").dom.value;
	var regionname=Ext.get("myhidden2").dom.value;

	var root = new Ext.tree.AsyncTreeNode({
			text:regionname,
			draggable : false,
			id : regionid
		});

		var treeloader = new Ext.tree.TreeLoader({
		  dataUrl : 'loaduserstree.action'
		});

		var tree = new Ext.tree.TreePanel({
			title:'菜单',
			iconCls:'settings',
			region:'west',
			width:200,
			minSize:100,
			maxSize:250,
			autoScroll:true,
			collapsible:true,
			split:true,
		 root: root,    // You must define the root variable before when you set the root config
		 loader:treeloader,
		 bbar : [{
					text : '开始',
					icon : 'ext/imgs/plugin.gif',
					//iconCls : 'icon-plugin',
					menu : new Ext.menu.Menu({
						items : [{
							text : '关于本系统',
							icon : 'ext/imgs/info.gif',
							//iconCls : 'icon-info',
							handler : function() {
								new Ext.Window({
									closeAction : 'close',
									resizable : false,
									bodyStyle : 'padding: 7',
									modal : true,
									title : '关于本系统',
									html : '本系统采用目前较为流行的技术实现,<br>前台使用了ExtJs技术,所以实现了跨浏览器<br>' +
											'本程序在IE6,IE7,IE8,IE9,chrome,FireFox均测试通过!<br><br>主要技术: Spring + SpringMVC + Mybatis + ExtJs3.3.1<br><br>'
											+ '数&nbsp;&nbsp;据&nbsp;&nbsp;库: MySQL',
									width : 300,
									height : 200
								}).show();
							}
						}, {
							text : '退出系统',
							icon : 'ext/imgs/delete.gif',
							//iconCls : 'icon-delete',
							handler : function() {
								Ext.Msg.confirm('操作提示', '您确定要退出本系统?', function(btn) {
									if ('yes' == btn) {
										Ext.Ajax.request({
											url : 'Logout.action',
											success : function() {
												location = '/WEB-INF/index.jsp';
											},
											failure : function() {
												Ext.Msg.show({
													title : '错误提示',
													msg : '退出系统失败!',
													icon : Ext.Msg.ERROR,
													buttons : Ext.Msg.OK
												});
											}
										});
									}
								});
							}
						},{
					text:'仍未完善的数据',
					icon : 'ext/imgs/search.gif',
					handler:function(){
						var n = contentPanel.getComponent('roomlist2');
						if (!n)	{
							n = contentPanel.add( {
											'id' : 'roomlist2',
											iconCls:'tabs',
										        'title' : '仍未完善数据的房间',
											closable : true,
											html : '<iframe name="Sub" scrolling="auto" frameborder="0" width="100%" height="100%" src="users/roomlist2.jsp?regionid='+regionid+'"></iframe>'
										});
						}
						contentPanel.setActiveTab(n);
					}
				}]
					})
				},'-',cbThemes]
		 });

		   treeloader.on("beforeload", function(treeLoader, node) {
		    treeLoader.baseParams.id = node.id;   //node.id为树节点的id,传给后台的参数
		}, this);

		//测试添加树节点的响应事件
		tree.on("click", function(node) {
					var nodeId = node.id;
						var n = contentPanel.getComponent(node.id);
							if (!n)	{
								n = contentPanel.add( {
												'id' : node.id,
												iconCls:'tabs',
											        'title' : node.text,
												closable : true,
												html : '<iframe name="Sub" scrolling="auto" frameborder="0" width="100%" height="100%" src="/common/vendor.jsp?flatid='+nodeId+'"></iframe>'
											});
							}
							contentPanel.setActiveTab(n);

		});
		root.expand(true,true);
		var viewport=new Ext.Viewport({
		    layout:'border',
			frame:'true',
			items:[
				   {region:'north',
				   layout : 'fit',
				    split : false,
				    collapsible:true,
				    height:65,
				    html:'<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="users/top.jsp"></iframe>'
				    //html:'<center><font color="red" size="12" style="margin:-15px 0px 0px 0px">后台管理系统</font></center>'
				   },
				   {region:'center',
					   layout : 'fit',
					   border : false,
						//height:800,
					    items:[
							   contentPanel=new Ext.TabPanel({
															 id:'centerP',
															 enableTabScroll:true,//能够滚动收缩
															 activeTab:0,//激活第一个标签
															 items:[{
																	id:'homePage',
																	iconCls:'tabs',
																	layout:'fit',
																	title:'首页',
																	autoScroll:true,
																	html:'首页'
															 }]
							   })
						]
				   },
				   tree,
				   {region:'south',height:30,html:'<center><font color="red" size="4">order by:计算机094</font></center>'}
				  ]
		});




	});


