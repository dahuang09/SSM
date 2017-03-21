Ext.onReady(function() {
	//var username=Ext.get("username").dom.value;//获取username值
	//var password=Ext.get("password").dom.value;
	
  
		
		
	var tree = new Ext.tree.TreePanel({
		//el:'supertree',
		loader:new Ext.tree.TreeLoader()
	});
	
	var root = new Ext.tree.AsyncTreeNode({
		text:'校宿管管理菜单',
		//id : '0',
		children : [{
			text:'院系信息管理',
			//id:'1',
			children:[{
				text:'院系信息',
				leaf:true,
				id:'1'
			}]
		},{
			text : '用户信息管理',
			//id : '1',
			children : [ {
						text : ' 用户信息  ',
						leaf : true,
						id : '2'
					}]
		},{
			text:'宿舍信息管理',
			//id:'2',
			children : [			
									{
											text : '  区信息  ',
											leaf : true,
											id : '31'
										
						}, {
							               
											text : '  栋信息 ',
											leaf : true,
											id : '32'
								
						}, {
											text : '  房信息  ',
											leaf : true,
											id : '33'
						}]
		},{
			text:'统计',
			//id:'7',
			children : [			
						{
							text : '  学院总评管理  ',
							//id : '71',
							children : [{
								text:'统计本月各学院总评',
								id:'41',
								leaf:true
							},{
								text:'历史总评',
									id:'42',
									leaf:true
							}]
						}, {
							text : '  不及格宿舍管理  ',
							//id : '72',
							children : [{
								text:'统计本月不及格宿舍',
								id:'51',
								leaf:true
							},{
								text:'历史不及格宿舍',
									id:'52',
									leaf:true
							}]
						}]
		}]
	});
	tree.setRootNode(root);
	//tree.render();
	tree.expandAll();// 默认展开全部
	//root.expand(false,true);//第一个参数：是否递归展开所有字节点，false只展开第一级节点，第二个参数：是否要动画效果
	tree.on("click", function(node) {
		var nodeId = node.id;
		var n = contentPanel.getComponent(node.id);
			
		if (nodeId == 1) {
			if (!n) {
				n = contentPanel.add( {
							'id' : node.id,
						        'title' : node.text,
							closable : true,
							html : '<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="superuser/sdeptlistandadd.jsp"></iframe>'
						});
			}
		}
		
		if (nodeId == 2) {
			if (!n) {
				n = contentPanel.add({
					//region:'center',
					'id' : node.id,
						        'title' : node.text,
							closable : true,
							html : '<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="superuser/adminlistandadd.jsp"></iframe>'
							});
			}
		}
			if (nodeId == 31) {
				if (!n) {
					n = contentPanel.add( {
								'id' : node.id,
							        'title' : node.text,
								closable : true,
								html : '<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="superuser/regionlistandadd.jsp"></iframe>'
								//html : '<iframe scrolling="no" frameborder="0" width="100%" height="575" src="superuser/regionlist.jsp"></iframe>'
							});
				}
			}
			if (nodeId == 32) {
				if (!n) {
					n = contentPanel.add( {
								'id' : node.id,
							        'title' : node.text,
								closable : true,
								html : '<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="superuser/flatlistandadd.jsp"></iframe>'
							});
				}
			}
			
			if (nodeId == 33) {
				if (!n) {
					n = contentPanel.add( {
								'id' : node.id,
							        'title' : node.text,
								closable : true,
								html : '<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="superuser/roomlistandadd.jsp"></iframe>'
							});
				}
			}
			
			if (nodeId == 41) {
				if (!n) {
					n = contentPanel.add( {
								'id' : node.id,
							        'title' : node.text,
								closable : true,
								html : '<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="superuser/sdeptgradelist.jsp"></iframe>'
							});
				}
			}
			
			if (nodeId == 42) {
				if (!n) {
					n = contentPanel.add( {
								'id' : node.id,
							        'title' : node.text,
								closable : true,
								html : '<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="superuser/oldsdeptgradelist.jsp"></iframe>'
							});
				}
			}
			
			if (nodeId == 51) {
				if (!n) {
					n = contentPanel.add( {
								'id' : node.id,
							        'title' : node.text,
								closable : true,
								html : '<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="superuser/unroomlist.jsp"></iframe>'
							});
				}
			}
			if (nodeId == 52) {
				if (!n) {
					n = contentPanel.add( {
								'id' : node.id,
							        'title' : node.text,
								closable : true,
								html : '<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="superuser/oldunroomlist.jsp"></iframe>'
							});
				}
			}
			
			
			contentPanel.setActiveTab(n);
	});
});


    /*function editpassword(){
   	                   window_edit.show();
						editpasswordForm.getForm().findField('username').setValue('username');
						editpasswordForm.getForm().findField('password').setValue('password');
   }*/
   
  
			
			
   
   
   