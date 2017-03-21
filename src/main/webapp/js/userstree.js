Ext.lib.Ajax.defaultPostHeader = "application/x-www-form-urlencoded; charset=UTF-8"; 
Ext.onReady(function() {
	
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
		el:'userstree',
		//rootVisible:true,
     //layout:'fit',
     //autoHeight:true,
     //width:100,
     //margins: '5 5 4 5',
     //autoScroll: true,
     //renderTo: 'tree',    // Using this config, a call to render() is not required (在html中存在一个 id 为 tree 的结点) 
     //animate: true,
    // enableDD: false,
     //title: '校宿管管理菜单',
     root: root,    // You must define the root variable before when you set the root config 
     loader:treeloader
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
										        'title' : node.text,
											closable : true,
											html : '<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="users/roomlist.jsp?flatid='+nodeId+'"></iframe>'
										});
						}
						contentPanel.setActiveTab(n);
						
	});
	
						
	
    	tree.render();
    	root.expand(); 
});
	    
