Ext.onReady(function() {

	var tree = new Ext.tree.TreePanel( {
		rootVisible : false
	});
	var tree = new Ext.tree.TreePanel( {});
	var root = new Ext.tree.AsyncTreeNode( {
		text : '校宿管后台管理',
		id : '0',
		children : [ {
			text : '用户管理',
			id : '1',
			children : [			
					{
						text : '  添加用户  ',
						leaf : true,
						id : '11'
					}, {
						text : '  查看用户  ',
						leaf : true,
						id : '12'
					} ]
		}, {
			text : '南区宿舍',
			id : '2',
			children : [			
					{
						text : '  南一  ',
						leaf : true,
						id : '21'
					}, {
						text : '  南二  ',
						leaf : true,
						id : '22'
					},{
						text : '  南三  ',
						leaf : true,
						id : '23'
					},{
						text : '  南四  ',
						leaf : true,
						id : '24'
					},{
						text : '  南五  ',
						leaf : true,
						id : '25'
					},{
						text : '  南六  ',
						leaf : true,
						id : '26'
					},{
						text : '  南七  ',
						leaf : true,
						id : '27'
					},{
						text : '  南八  ',
						leaf : true,
						id : '28'
					} ]
		},{
			text : '东区宿舍',
			id : '3',
			children : [			
					{
						text : '  东一  ',
						leaf : true,
						id : '31'
					}, {
						text : '  东二  ',
						leaf : true,
						id : '32'
					},{
						text : '  东三  ',
						leaf : true,
						id : '33'
					},{
						text : '  东四  ',
						leaf : true,
						id : '34'
					},{
						text : '  东五  ',
						leaf : true,
						id : '35'
					},{
						text : '  东六  ',
						leaf : true,
						id : '36'
					},{
						text : '  东七  ',
						leaf : true,
						id : '37'
					},{
						text : '  东八  ',
						leaf : true,
						id : '38'
					} ]
		},{
			text : '中区宿舍',
			id : '4',
			children : [			
					{
						text : '  中A  ',
						leaf : true,
						id : '41'
					}, {
						text : '  中B  ',
						leaf : true,
						id : '42'
					},{
						text : '  中C  ',
						leaf : true,
						id : '43'
					},{
						text : '  中D  ',
						leaf : true,
						id : '44'
					},{
						text : '  中E  ',
						leaf : true,
						id : '45'
					},{
						text : '  中F  ',
						leaf : true,
						id : '46'
					},{
						text : '  中G  ',
						leaf : true,
						id : '47'
					},{
						text : '  中H  ',
						leaf : true,
						id : '48'
					} ]
		}, {
			text : '退出',
			leaf : true,
			id : '5',
			listeners : {
				'click' : function() {
					window.close();
				}
			}
		} ]
	});
	tree.setRootNode(root);
	tree.render("tree");
	//tree.expandAll();// 默认展开全部
	root.expand(false,true);//第一个参数：是否递归展开所有字节点，false只展开第一级节点，第二个参数：是否要动画效果
	tree.on("click", function(node) {
					var nodeId = node.id;
					var n = contentPanel.getComponent(node.id);
					//打开南区操作面板
						if (nodeId == 21) {
							if (!n) {
								n = contentPanel.add( {
											'id' : node.id,
										        'title' : node.text,
											closable : true,
											html : '<iframe scrolling="no" frameborder="0" width="100%" height="620" src="south1.html"></iframe>'
										});
							}
							;
						}
						
						if (nodeId == 22) {
							if (!n) {
								n = contentPanel
										.add( {
											'id' : node.id,
											'title' : node.text,
											closable : true,
											html : '<iframe scrolling="no" frameborder="0" width="100%" height="620" src="south2.html"></iframe>'
										});
							}
							;
						}
						
						if (nodeId == 23) {
							if (!n) {
								n = contentPanel
										.add( {
											'id' : node.id,
											'title' : node.text,
											closable : true,
											html : '<iframe scrolling="no" frameborder="0" width="100%" height="620" src="south3.html"></iframe>'
										});
							}
							;
						}
						if (nodeId == 24) {
							if (!n) {
								n = contentPanel
										.add( {
											'id' : node.id,
											'title' : node.text,
											closable : true,
											html : '<iframe scrolling="no" frameborder="0" width="100%" height="620" src="south4.html"></iframe>'
										});
							}
							;
						}	
						if (nodeId == 25) {
							if (!n) {
								n = contentPanel
										.add( {
											'id' : node.id,
											'title' : node.text,
											closable : true,
											html : '<iframe scrolling="no" frameborder="0" width="100%" height="620" src="south5.html"></iframe>'
										});
							}
							;
						}	
						if (nodeId == 26) {
							if (!n) {
								n = contentPanel
										.add( {
											'id' : node.id,
											'title' : node.text,
											closable : true,
											html : '<iframe scrolling="no" frameborder="0" width="100%" height="620" src="south6.html"></iframe>'
										});
							}
							;
						}	
						if (nodeId == 27) {
							if (!n) {
								n = contentPanel
										.add( {
											'id' : node.id,
											'title' : node.text,
											closable : true,
											html : '<iframe scrolling="no" frameborder="0" width="100%" height="620" src="south7.html"></iframe>'
										});
							}
							;
						}	
						if (nodeId == 28) {
							if (!n) {
								n = contentPanel
										.add( {
											'id' : node.id,
											'title' : node.text,
											closable : true,
											html : '<iframe scrolling="no" frameborder="0" width="100%" height="620" src="south8.html"></iframe>'
										});
							}
							;
						}	
						//打开东区操作面板
						if (nodeId == 31) {
							if (!n) {
								n = contentPanel.add( {
											'id' : node.id,
										        'title' : node.text,
											closable : true,
											html : '<iframe scrolling="no" frameborder="0" width="100%" height="620" src="east1.html"></iframe>'
										});
							}
							;
						}
						
						if (nodeId == 32) {
							if (!n) {
								n = contentPanel
										.add( {
											'id' : node.id,
											'title' : node.text,
											closable : true,
											html : '<iframe scrolling="no" frameborder="0" width="100%" height="620" src="east2.html"></iframe>'
										});
							}
							;
						}
						
						if (nodeId == 33) {
							if (!n) {
								n = contentPanel
										.add( {
											'id' : node.id,
											'title' : node.text,
											closable : true,
											html : '<iframe scrolling="no" frameborder="0" width="100%" height="620" src="east3.html"></iframe>'
										});
							}
							;
						}
						if (nodeId == 34) {
							if (!n) {
								n = contentPanel
										.add( {
											'id' : node.id,
											'title' : node.text,
											closable : true,
											html : '<iframe scrolling="no" frameborder="0" width="100%" height="620" src="east4.html"></iframe>'
										});
							}
							;
						}	
						if (nodeId == 35) {
							if (!n) {
								n = contentPanel
										.add( {
											'id' : node.id,
											'title' : node.text,
											closable : true,
											html : '<iframe scrolling="no" frameborder="0" width="100%" height="620" src="east5.html"></iframe>'
										});
							}
							;
						}	
						if (nodeId == 36) {
							if (!n) {
								n = contentPanel
										.add( {
											'id' : node.id,
											'title' : node.text,
											closable : true,
											html : '<iframe scrolling="no" frameborder="0" width="100%" height="620" src="east6.html"></iframe>'
										});
							}
							;
						}	
						if (nodeId == 37) {
							if (!n) {
								n = contentPanel
										.add( {
											'id' : node.id,
											'title' : node.text,
											closable : true,
											html : '<iframe scrolling="no" frameborder="0" width="100%" height="620" src="east7.html"></iframe>'
										});
							}
							;
						}	
						if (nodeId == 38) {
							if (!n) {
								n = contentPanel
										.add( {
											'id' : node.id,
											'title' : node.text,
											closable : true,
											html : '<iframe scrolling="no" frameborder="0" width="100%" height="620" src="east8.html"></iframe>'
										});
							}
							;
						}
						//打开中区操作面板
						if (nodeId == 41) {
							if (!n) {
								n = contentPanel.add( {
											'id' : node.id,
										        'title' : node.text,
											closable : true,
											html : '<iframe scrolling="no" frameborder="0" width="100%" height="620" src="center1.html"></iframe>'
										});
							}
							;
						}
						
						if (nodeId == 42) {
							if (!n) {
								n = contentPanel
										.add( {
											'id' : node.id,
											'title' : node.text,
											closable : true,
											html : '<iframe scrolling="no" frameborder="0" width="100%" height="620" src="center2.html"></iframe>'
										});
							}
							;
						}
						
						if (nodeId == 43) {
							if (!n) {
								n = contentPanel
										.add( {
											'id' : node.id,
											'title' : node.text,
											closable : true,
											html : '<iframe scrolling="no" frameborder="0" width="100%" height="620" src="center3.html"></iframe>'
										});
							}
							;
						}
						if (nodeId == 44) {
							if (!n) {
								n = contentPanel
										.add( {
											'id' : node.id,
											'title' : node.text,
											closable : true,
											html : '<iframe scrolling="no" frameborder="0" width="100%" height="620" src="center4.html"></iframe>'
										});
							}
							;
						}	
						if (nodeId == 45) {
							if (!n) {
								n = contentPanel
										.add( {
											'id' : node.id,
											'title' : node.text,
											closable : true,
											html : '<iframe scrolling="no" frameborder="0" width="100%" height="620" src="center5.html"></iframe>'
										});
							}
							;
						}	
						if (nodeId == 46) {
							if (!n) {
								n = contentPanel
										.add( {
											'id' : node.id,
											'title' : node.text,
											closable : true,
											html : '<iframe scrolling="no" frameborder="0" width="100%" height="620" src="center6.html"></iframe>'
										});
							}
							;
						}	
						if (nodeId == 47) {
							if (!n) {
								n = contentPanel
										.add( {
											'id' : node.id,
											'title' : node.text,
											closable : true,
											html : '<iframe scrolling="no" frameborder="0" width="100%" height="620" src="center7.html"></iframe>'
										});
							}
							;
						}	
						if (nodeId == 48) {
							if (!n) {
								n = contentPanel
										.add( {
											'id' : node.id,
											'title' : node.text,
											closable : true,
											html : '<iframe scrolling="no" frameborder="0" width="100%" height="620" src="center8.html"></iframe>'
										});
							}
							;
						}	

						contentPanel.setActiveTab(n);
					})

	});