Ext.onReady(function() {   
	//更换皮肤
    window.ChangeTheme = function(value) {
   
    Ext.util.CSS.swapStyleSheet('theme', value);

   };
   var cookieArr = window.document.cookie.split(";");   
		            var css = null;
		            for(var i=0;i<cookieArr.length;i++) {
		            var arr = cookieArr[i].split("=");
		            if(arr[0]=="css") {
		                  css = arr[1];
		                 }
		            };
		           
		           
		            window.document.getElementsByTagName("link")[1].href="ext/resources/css/xtheme-"+css+ ".css";
	Ext.QuickTips.init();
	
	//表格
	var regionname2 = null;
	  
    var sm = new Ext.grid.CheckboxSelectionModel({handleMouseDown:Ext.emptyFn()}); // CheckBox   
    var cm = new Ext.grid.ColumnModel([   
        new Ext.grid.RowNumberer(), //   
        sm,   
        {header: "<span style='font-weight:bold;font-size:15px;'>&nbsp;&nbsp;&nbsp;&nbsp;区号</span>", dataIndex: 'regionid',width:400,sortable:true,renderer:renderregionid},  
        {header: "区名", id:'regionname',dataIndex: 'regionname',width:400,sortable:true,editor:new Ext.grid.GridEditor(new Ext.form.TextField({allowBlank:false,regex:/^[\u4E00-\u9FA5]+$/,regexText:'只能输入汉字'}))}
    ]);  
    //var ds = new Ext.data.Store({
    var ds = new Ext.data.GroupingStore({
        proxy: new Ext.data.HttpProxy({url: 'regionlist.action'}),   
        reader: new Ext.data.JsonReader({   
            totalProperty: 'total',   
            root: 'regionlist',   
            successProperty: 'success'  
      }, [   
            {name: 'regionid', mapping: 'regionid', type: 'string'}, 
            {name: 'regionname', mapping: 'regionname', type: 'string'}
        ]) ,
        pruneModifiedRecords:true,//每次进行remove或load操作时store会自动modified标记，避免出现下次提交时会把上次那些modified信息都带上
        //分组表格
        //groupField:'regionname',
        sortInfo:{field:'regionid',direction:"ASC"}
    });   
    
   
    
    //var grid = new Ext.grid.GridPanel({ 
    var grid = new Ext.grid.EditorGridPanel({
    	id:'regiongrid',
    	region:'center',
    	border:true,
        ds: ds,   //数据源
        sm: sm,   //每行数据前面的复选框
        cm: cm,   //表格上的列
        view:new Ext.grid.GroupingView(),//分组表格
        clicksToEdit:1,//单击激活编辑器
        stripeRows:true,//数据行间隔的底色
        autoExpandColumn:'regionname',
        loadMask:{msg :'正在加载数据，请稍后.....'},
        viewConfig:{
        	forceFit:true//自动调节每列的宽度使其填满表格
        },
        
        //顶部工具栏
        tbar:new Ext.Toolbar(['-',{
            text:'保存',
            icon : 'ext/imgs/save.jpg',
            //plugins:[filters],
            handler:function(){
            	var modified = ds.modified;  
            	 var m = modified.slice(0);//m是数组；这两句是复制ds.modified,保证ds.modified中的原始数据不受影响。
            	 var jsonArray = [];
            	 Ext.each(m,function(item){ //Ext.each(array,fn(item))作用是遍历array，并对每项分别调用fn函数，item为当前遍历的数组元素（当前元素索引）
            		jsonArray.push(item.data);
            	});
            	if(jsonArray.length!=0){
            		Ext.Ajax.request({
            		url:'editregion.action',
            	 success:function(){
            	 	Ext.Msg.alert('提示','修改成功',function(){ds.reload();});
            	 },failure:function(){
            	   Ext.Msg.alert('错误','与后台联系的时候出现了问题');
            	 },
            	 params:{regionjson:Ext.util.JSON.encode(jsonArray)}
            	});
            	}else{
            		Ext.Msg.alert('提示','你没有修改过任何信息');
            	}
            	
         
            }
        },'-',{                       
                    text: '删除', 
                    icon : 'ext/imgs/del.gif',
                    handler: function(btn, pressed)   
                    {   
                           var rows=Ext.getCmp("regiongrid").getSelectionModel().getSelections();    //获取选中的行   
                            if(rows.length==0)   
                            {   
                                Ext.Msg.alert("提示信息","请您至少选择一个!");   
                            }   
                            else{     
                                Ext.Msg.confirm("提 示!","删除区也会删除负责该区的用户和区下的所有栋和栋里所有的房间,您确定要删除吗?",function(btn){    
                                    if(btn=="yes")   
                                    {   
                                    	Ext.MessageBox.show({
									           title:"请稍等",
									           msg:"正在删除.....",
									           progressText:"",
									           width:300,
									           progress:true,
									           closable:false,
									           animEl:"loding"
									          });
									          
									           var f = function(v) {
									            return function(){
									              var i = v / 11;
									              Ext.MessageBox.updateProgress(i, '');
									             };
									           };
									          for(var i = 1; i < 13; i++) {
									            setTimeout(f(i), i * 100);
									           }
                                    	//var br = Ext.getCmp("roomgrid").getSelectionModel().getSelected().data;
                                    	var jsonArray = [];
                                    	var len = rows.length;
                                    	 for(var i = 0;i<len;i++){
                                    	 	jsonArray.push(rows[i].data);
                                    	 }
						            	Ext.Ajax.request({
						            		url:'deletregion.action',
						            	 success:function(){
						            	 	Ext.Msg.alert('成功','删除区成功',function(){
						            	 	var grid = Ext.getCmp('regiongrid'); 
											var ds = grid.getStore(); 
											ds.remove(rows);});
						            	 },failure:function(){
						            	   Ext.Msg.alert('错误','与后台联系的时候出现了问题');
						            	 },
						            	 params:{deletregionjson:Ext.util.JSON.encode(jsonArray)}
						            	});
                                    	 
                                    }   
                                    else  
                                    {   
                                          //Ext.Msg.alert('tip',rows); 
                                    }   
                                }) ;  
                            }    
                    }   
                },'-']),
        
        //底部分页工具栏 
        bbar: new Ext.PagingToolbar({   
            pageSize:27,   
            store: ds, 
            //plugins:[filters],
            // lastText:"尾页",  
             refreshText:"刷新页面", 
            displayInfo: true,   
            displayMsg: '显示第 {0} 条到 {1} 条记录, 共 {2} 条',   
           emptyMsg: '没有记录', 
           items : ['-',regioncombo1,{xtype:'button',text:'查询', icon : 'ext/imgs/search.gif', handler:function(){searchregion();}},'-' ]
  
        })   
    });  
    ds.on('beforeload', function() {
    	var regionname2 = Ext.getCmp('regioncomboid1').getRawValue();
    	 this.baseParams = {start:0,limit:27,regionname:regionname2};
    });
    ds.load({params: {start: 0, limit:27,regionname:regionname2}}); 
    
      
     
	//表当
	var form1 = new Ext.form.FormPanel({
	  title:'添加区信息',
	  region:'east',
	  split:true,
	  width:300,
	  minSize:100,
	  maxSize:200,
	  collapsible:true,
	  autoHeight:true,
	  //height:100,
	  //width:500,
	  labelWidth:60,
	  labelAlign:'right',
	  frame:true,
	  defaults:{width:200},
	  items:[field1,field2],
	  
	  buttons:[{
	    text:'提交',
	    type:"submit",
	    handler:function(){
	    	if(form1.form.isValid()){
	    		 // 登录时将登录按钮设为disabled，防止重复提交
	    		this.disabled = true,
	    		
	    		Ext.MessageBox.show({
		           title:"请稍等",
		           msg:"正在提交.....",
		           progressText:"",
		           width:300,
		           progress:true,
		           closable:false,
		           animEl:"loding"
		          });
		          
		           var f = function(v) {
		            return function(){
		              var i = v / 11;
		              Ext.MessageBox.updateProgress(i, '');
		             };
		           };
		          for(var i = 1; i < 13; i++) {
		            setTimeout(f(i), i * 50);
		           }
	    		
		    	form1.getForm().submit({
		    		url:'addregion.action',
		            method:"post",
		            // 如果有表单以外的其它参数，可以加在这里。我这里暂时为空，也可以将下面这句省略  
		            params:"",
		            // 第一个参数是传入该表单，第二个是Ext.form.Action对象用来取得服务器端传过来的json数据
			    	  success:function(form,action){
			    	  	Ext.Msg.alert('信息',action.result.message,function(){
			    	  	Ext.getCmp('regiongrid').getStore().reload();
			    	  	});
			    	  	//Ext.getCmp('regiongrid').getStore().reload();
			    	  	//ds.reload();
			    	  },
			    	  failure:function(form,action){
			    	  	if(action.failureType == Ext.form.Action.SERVER_INVALID){
			    	  		Ext.Msg.alert('错误','后台检验失败');
			    	  		ds.reload();
			    	  	}else{
			    	  		Ext.Msg.alert('错误','无法访问后台');
			    	  		ds.reload();
			    	  	}
		    	  }
	    	});
	    	this.disabled = false;
	    	}	
	    }
	  },{
	    text:'重置',
	    handler:function(){
	    	form1.getForm().reset();
	    }
	  }]
	  
	});
	
	var regionpanel = new Ext.Panel({
   	//renderTo: 'iframepanel',
       layout:'border',
       items:[grid,form1]
   });
	 var view = new Ext.Viewport({
    region : 'center',
    layout:'fit',
	  items:[regionpanel]
	});
}); 


  //表格格式
	function renderregionid(value){
	  	var regionid = value;
	  	return "<span style='color:#FF3333;font-weight:bold;'>"+regionid+"</span>"; 

	  }
	  
	  /**下拉框区*/
     var regioncombo1 = new Ext.form.ComboBox({
            id:'regioncomboid1',
            fieldLabel:'区名',
            hiddenName: 'regionid',   
            valueField: 'regionid',   
            displayField: 'regionname',  
            editable: true,
            //editable: false, 
             emptyText:'请选择区名',
            triggerAction: 'all',   
            width: 150,   
            mode: 'remote',   
            minListWidth:250,   
            pageSize:5,   
            store: new Ext.data.JsonStore({
                url: 'regionlist1.action',    
                root:'regionlist',    
                totalProperty: 'total',    
                remoteSort: true,  
                fields:['regionid', 'regionname']   
            })
     });
     
	  //查询
      function searchregion(){
     	var regionname = Ext.getCmp("regioncomboid1").getValue();
     	var regionname2 = regionname.trim();
     	if(regionname2.length<=0 || regionname2.length == ''){
     		Ext.Msg.alert('提示','请选择一个你要查询的区名');
     	}else{
     		  	Ext.getCmp('regiongrid').getStore().load();
     	}
     }
	 	
	 //表单样式
     var field1 = new Ext.form.TextField({
	  fieldLabel:'区号',
	  name:'regionid',
	  allowBlank:false,
	  emptyText:'空',
	  vtype:'alphanum',
	  vtypeText:'只能输入字母和数字',
	  msgTarget:'side'
	});
	
	var field2 = new Ext.form.TextField({
	  fieldLabel:'区名',
	  name:'regionname',
	  allowBlank:false,
	  emptyText:'空',
	  regex:/^[\u4E00-\u9FA5]+$/,
	  regexText:'只能输入汉字',
	  msgTarget:'side'
	});
	  	
	  
	  
	  
	  
	  
	  
	  