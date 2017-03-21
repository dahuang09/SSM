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
    var regionid = null;
    var flatid = null;
    var roomid2 = null;
    var sdeptid2 = null;
    
	
	/**加载栋信息*/
	var flatstore = new Ext.data.Store({
	   proxy: new Ext.data.HttpProxy({url: 'flatlist1.action'}),   
        reader: new Ext.data.JsonReader({   
            totalProperty: 'total',   
            root: 'flatlist',   
            successProperty: 'success'  
      }, [   
            {name: 'flatid', mapping: 'flatid', type: 'string'}, 
            {name: 'flatname', mapping: 'flatname', type: 'string'}
        ]) 
	});
    
	 /**下拉框栋*/
	    var flatcombo = new Ext.form.ComboBox({
	      fieldLabel:'栋名', 
	    	id:'flatcomboid',
	      store:flatstore,
	      width: 60,     
	    // minListWidth:100, 
	      emptyText:'栋名',
	      mode:'local',
	      //allowBlank:false,
	      triggerAction:'query',
	      valueField:'flatid',
	      displayField:'flatname',
	      //readOnly:true
	      hiddenName:'flatid'
	    }); 
	/**数字store*/
 var numberstore = new Ext.data.SimpleStore({
	  fields:['numberid'],
	  data:[['0'],['1'],['2'],['3'],['4'],['5'],['6'],['7'],['8'],['9']]
	});
	 /** 数字下拉框*/
     var numbercombo1 = new Ext.form.ComboBox({
     	id:'numbercombo1',
     	store:numberstore,
     	//emptyText:'0',
     	mode:'local',
     	width: 40,
     	// minListWidth:10,
     	triggerAction:'all',
     	//hiddenName: 'numberid',   
        valueField: 'numberid',   
        displayField: 'numberid'
        //value:'numberid'
     	
     });
     var numbercombo2 = new Ext.form.ComboBox({
     	id:'numbercombo2',
     	store:numberstore,
     	//emptyText:'0',
     	mode:'local',
     	width: 40,
     	 //minListWidth:10,
     	triggerAction:'all',
     	//hiddenName: 'numberid',   
        valueField: 'numberid',   
        displayField: 'numberid'
        //value:'1'
     	
     });
     var numbercombo3 = new Ext.form.ComboBox({
     	id:'numbercombo3',
     	store:numberstore,
     	//emptyText:'0',
     	mode:'local',
     	width: 40,
     	 //minListWidth:10,
     	triggerAction:'all',
     	//hiddenName: 'numberid',   
        valueField: 'numberid',   
        displayField: 'numberid'
        //value:'1'
     	
     });
	
    
   var sm = new Ext.grid.CheckboxSelectionModel({handleMouseDown:Ext.emptyFn()/*,singleSelect:true*/}); // CheckBox   
    var cm = new Ext.grid.ColumnModel([   
        new Ext.grid.RowNumberer(), //   
        sm, 
        {header: "<span style='font-weight:bold;font-size:15px;'>&nbsp;&nbsp;&nbsp;&nbsp;房号</span>", dataIndex: 'roomid',width:200,sortable:true,renderer:renderroomid},
         {header: "系别", dataIndex: 'sdeptname',width:200,sortable:true,editor:new Ext.grid.GridEditor(sdeptcombo4)},
        //{header: "栋号", dataIndex: 'flatid',width:200,sortable:true},
        {header: "栋名", dataIndex: 'flatname',width:200,sortable:true},
        {header:"区名",id:'regionname',dataIndex:'regionname',width:200,sortable:true}
        
       /*,
       renderer:function(value){
    	   var sname = this.renderer(value);
        	return sname;
        }   */
        
        
        
    ]);  
    //var ds = new Ext.data.Store({
    var ds = new Ext.data.GroupingStore({
    	id:'ds',
        proxy: new Ext.data.HttpProxy({url: 'superroomlist.action'}),   
        reader: new Ext.data.JsonReader({   
            totalProperty: 'total',   
            root: 'findroomlist',   
            successProperty: 'success'  
      }, [   
		{name: 'flatid', mapping: 'flat.flatid', type: 'string'},   
		{name: 'flatname', mapping: 'flat.flatname', type: 'string'},
        {name: 'roomid', mapping: 'roomid', type: 'string'}, 
        {name: 'sdeptname', mapping: 'sdept.sdeptname', type: 'string'},
         {name: 'regionname', mapping: 'flat.region.regionname', type: 'string'}
            
        ]) ,
        pruneModifiedRecords:true,//每次进行remove或load操作时store会自动modified标记，避免出现下次提交时会把上次那些modified信息都带上
        //分组表格
        groupField:'regionname',
        sortInfo:{field:'flatid',direction:"ASC"}
    });   
    
    
    //var grid = new Ext.grid.GridPanel({ 
    var grid = new Ext.grid.EditorGridPanel({
        region:'center',
    	id:'roomgrid',
        ds: ds,   //数据源
        sm: sm,   //每行数据前面的复选框
        cm: cm,   //表格上的列
        view:new Ext.grid.GroupingView(),//分组表格
        clicksToEdit:1,//单击激活编辑器
        stripeRows:true,//数据行间隔的底色
        loadMask:true,//读取数据时的遮罩和提示功能
        autoExpandColumn:'regionname',
        viewConfig:{
        	forceFit:true//自动调节每列的宽度使其填满表格
        },
        
        //顶部工具栏
        tbar:new Ext.Toolbar(['-',{
            text:'保存',
            icon : 'ext/imgs/save.jpg',
            handler:function(){
            	var modified = ds.modified;  
            	 var m = modified.slice(0);//m是数组；这两句是复制ds.modified,保证ds.modified中的原始数据不受影响。
            	 var jsonArray = [];
            	 Ext.each(m,function(item){ //Ext.each(array,fn(item))作用是遍历array，并对每项分别调用fn函数，item为当前遍历的数组元素（当前元素索引）
            		jsonArray.push(item.data);
            	});
            	if(jsonArray.length!=0){
            		Ext.Ajax.request({
            		url:'editsuperroom.action',
            	 success:function(){
            	 	Ext.Msg.alert('成功','成功提交',function(){ds.reload();});
            	 },failure:function(){
            	   Ext.Msg.alert('错误','与后台联系的时候出现了问题');
            	 },
            	 params:{roomjson:Ext.util.JSON.encode(jsonArray)}
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
                           var rows=Ext.getCmp("roomgrid").getSelectionModel().getSelections();    //获取选中的行   
                            if(rows.length==0)   
                            {   
                                Ext.Msg.alert("提示信息","请您至少选择一个!");   
                            }   
                            else{     
                                Ext.Msg.confirm("提 示!","您确定要删除吗?",function(btn){    
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
						            		url:'deletroom.action',
						            	 success:function(){
						            	 	Ext.Msg.alert('成功','删除房间成功',function(){
						            	 	var grid = Ext.getCmp('roomgrid'); 
											var ds = grid.getStore(); 
											ds.remove(rows);});
						            	 },failure:function(){
						            	   Ext.Msg.alert('错误','与后台联系的时候出现了问题');
						            	 },
						            	 params:{roomjson:Ext.util.JSON.encode(jsonArray)}
						            	});
                                    	 
                                    }   
                                    else  
                                    {   
                                          //Ext.Msg.alert('tip',rows); 
                                    }   
                                }) ;  
                            }    
                    }   
                },'-' ]),
        
        //底部分页工具栏 
        bbar: new Ext.PagingToolbar({   
            pageSize:27,   
            store: ds, 
            // lastText:"尾页",  
             refreshText:"刷新页面", 
            displayInfo: true,   
            displayMsg: '显示第 {0} 条到 {1} 条记录, 共 {2} 条',   
           emptyMsg: '没有记录',
           items:['-',regioncombo,'-',flatcombo,'-',sdeptcombo,'-',numbercombo1,numbercombo2,numbercombo3,'-',search,'-']  
        })   
    });  
    ds.load({params: {start: 0, limit:27,rid:regionid,fid:flatid,roomid:roomid2,sdeptid:sdeptid2}}); 
    
    regioncombo.on('select',function(comboBox){
     var value = comboBox.getValue();
      Ext.getCmp('flatcomboid').setValue(null);
     flatstore.load({params:{id:value}});
    });
    
    ds.on('beforeload', function() {
    	var regionname2 = Ext.getCmp('regioncomboid').getRawValue();//displayField属性里面的值,获取regioncomboid下拉框里的regionname
    	var flatname2 = Ext.getCmp('flatcomboid').getRawValue();//displayField属性里面的值,获取regioncomboid下拉框里的regionname
    	var sdeptname2 = Ext.getCmp('sdeptcomboid').getRawValue();
    	var number1 = Ext.getCmp('numbercombo1').getRawValue();
    	var number2 = Ext.getCmp('numbercombo2').getRawValue();
    	var number3 = Ext.getCmp('numbercombo3').getRawValue();
    	var roomid2 = number1+number2+number3;
    	//Ext.Msg.alert('区名',regionname2);
    	//Ext.Msg.alert('栋名',flatname2);
    	 this.baseParams = {start: 0, limit:27,rid:regionname2,fid:flatname2,roomid:roomid2,sdeptid:sdeptname2};
    });
   
 
    //表单
	//加载栋信息
	var flatstore1 = new Ext.data.Store({
	   proxy: new Ext.data.HttpProxy({url: 'flatlist1.action'}),   
        reader: new Ext.data.JsonReader({   
            totalProperty: 'total',   
            root: 'flatlist',   
            successProperty: 'success'  
      }, [   
            {name: 'flatid', mapping: 'flatid', type: 'string'}, 
            {name: 'flatname', mapping: 'flatname', type: 'string'}
        ]) 
	});
	var flatstore2 = new Ext.data.Store({
	   proxy: new Ext.data.HttpProxy({url: 'flatlist1.action'}),   
        reader: new Ext.data.JsonReader({   
            totalProperty: 'total',   
            root: 'flatlist',   
            successProperty: 'success'  
      }, [   
            {name: 'flatid', mapping: 'flatid', type: 'string'}, 
            {name: 'flatname', mapping: 'flatname', type: 'string'}
        ]) 
	});
	
	
    /*下拉框栋*/
    var comboFlat1 = new Ext.form.ComboBox({
      fieldLabel:'栋名',  
      id:'comboflat1',
      store:flatstore1,
      emptyText:'请选择',
      mode:'local',
      allowBlank:false,
      triggerAction:'all',
      editable: false,
      valueField:'flatid',
      displayField:'flatname',
      //readOnly:true
      hiddenName:'fid'
    }); 
   
    
    regioncombo1.on('select',function(comboBox){
      var value = comboBox.getValue();
      Ext.getCmp('comboflat1').setValue(null);
      //var flatname = Ext.getCmp('comboflat1').getValue();
      
      //Ext.Msg.alert('区名',flatname);
      flatstore1.load({params:{id:value}});//加载栋
      
    });
    
   
	
	
    /*下拉框栋*/
    var comboFlat2 = new Ext.form.ComboBox({
      fieldLabel:'栋名', 
      id:'comboflat2',
      store:flatstore2,
      emptyText:'请选择',
      mode:'local',
      allowBlank:false,
      triggerAction:'all',
      editable: false,
      valueField:'flatid',
      displayField:'flatname',
      //readOnly:true
      hiddenName:'fid'
    }); 
    
    
    regioncombo2.on('select',function(comboBox){
      var value = comboBox.getValue();
      Ext.getCmp('comboflat2').setValue(null);
      flatstore2.load({params:{id:value}});//加载栋
      
    });
    
    
	var form1 = new Ext.form.FormPanel({
	   //width:300,
	  /*minSize:100,
	  maxSize:200,
	 // collapsible:true,
	  //autoHeight:true,
	  height:300,
	  //width:500,
	  labelWidth:60,
	  labelAlign:'right',
	  frame:true,*/
		// minSize:100,
	 // maxSize:200,
	  //collapsible:true,
	  //autoHeight:true,
	  //height:100,
	  //width:500,
		//autoHeight:true,
	  labelWidth:60,
	  labelAlign:'left',
	  frame:true,
	  //defaults:{width:200},
	  items:[{
	  	layout:'column',
	  	items:[{
	  	   columnWidth:.5,
	  	   layout:'form',
	  	   items:[field1]
	  	   },{
	  	   	columnWidth:.5,
	  	   layout:'form',
	  	   items:[field2]
	  	   }]
	  //items:[field1,comboRegion,comboFlat,comboSdept]
	 
	 },regioncombo1,comboFlat1,sdeptcombo1],
	  
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
		    		url:'addrooms.action',
		            method:"post",
		            // 如果有表单以外的其它参数，可以加在这里。我这里暂时为空，也可以将下面这句省略  
		            //params:{regionname:'regionname'},
		            // 第一个参数是传入该表单，第二个是Ext.form.Action对象用来取得服务器端传过来的json数据
			    	  success:function(form,action){
			    	  	Ext.Msg.alert('信息',action.result.message,function(){
			    	  	Ext.getCmp('roomgrid').getStore().reload();
			    	  	});
			    	  	
			    	  },
			    	  failure:function(form,action){
			    	  	if(action.failureType == Ext.form.Action.SERVER_INVALID){
			    	  		Ext.Msg.alert('错误','后台检验失败');
			    	  	}else{
			    	  		Ext.Msg.alert('错误','无法访问后台');
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
	
	var form2 = new Ext.form.FormPanel({
	 //split:true,
	 /* width:300,
	  minSize:100,
	  maxSize:200,
	 // collapsible:true,
	  autoHeight:true,
	  //height:100,
	  //width:500,
	  labelWidth:60,
	  labelAlign:'right',
	  frame:true,*/
		 /*minSize:100,
	  maxSize:200,*/
	  //collapsible:true,
	  //autoHeight:true,
	  //height:100,
	  //width:500,
		//autoHeight:true,
	  labelWidth:60,
	  labelAlign:'right',
	  frame:true,
	  defaults:{width:200},
	  items:[field11,regioncombo2,comboFlat2,sdeptcombo2],
	 
	  
	  buttons:[{
	    text:'提交',
	    type:"submit",
	    handler:function(){
	    	if(form2.form.isValid()){
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
	    		
		    	form2.getForm().submit({
		    		url:'addroom.action',
		            method:"post",
		            // 如果有表单以外的其它参数，可以加在这里。我这里暂时为空，也可以将下面这句省略  
		            //params:{regionname:'regionname'},
		            // 第一个参数是传入该表单，第二个是Ext.form.Action对象用来取得服务器端传过来的json数据
			    	  success:function(form,action){
			    	  	Ext.Msg.alert('信息',action.result.message,function(){
			    	  	Ext.getCmp('roomgrid').getStore().reload();
			    	  	});
			    	  },
			    	  failure:function(form,action){
			    	  	if(action.failureType == Ext.form.Action.SERVER_INVALID){
			    	  		Ext.Msg.alert('错误','后台检验失败');
			    	  	}else{
			    	  		Ext.Msg.alert('错误','无法访问后台');
			    	  	}
		    	  }
	    	});
	    	this.disabled = false;
	    	}	
	    }
	  },{
	    text:'重置',
	    handler:function(){
	    	form2.getForm().reset();
	    }
	  }]
	});
    
	var tabs = new Ext.TabPanel({
		region:'center'
		//bodyStyle : 'background:#CCC'
	  	//autoHeight:true,
	  	//title:'添加房间',
	  	/*collapsible:true,
	  	//layout:'fit',
	  	items:[form1,form2]*/
	  });
	  
	  
	
    var panel = new Ext.Panel({
    	region:'east',
    	layout:'fit',
      title:'添加房间(单个或多个)',
      collapsible:true,
      split:true,
      width:300,
       minSize:270,
	  maxSize:320,
      //region:'east',
      items:[tabs]
    });
    
	var tab = tabs.add({
	    title:'批量添加',
	    id:'1',
	    closable:false,
	    //layout:'fit',
	    items:[form1]
	  });
	  var tab2 = tabs.add({
	  	title:'单个添加',
	  	id:'2',
	    closable:false,
	    //layout:'fit',
	  items:[form2]
	  });
     //tabs.activate(tab);
    tabs.activate(tab);
     
     
     var roompanel = new Ext.Panel({
   	//renderTo: 'iframepanel',
       layout:'border',
       items:[grid,panel]
   });
	 var view = new Ext.Viewport({
    region : 'center',
    layout:'fit',
	  items:[roompanel]
	});
     
     /*var viewport = new Ext.Viewport({
	  layout:'border',
	  items:[{
	   region:'center',
	   //autoHeight:true,
	   height:575,
	    split:true,
	   contentEl:'roomlist'
	  },{
	   region:'east',
	    split:true,
	  width:300,
	  minSize:100,
	  maxSize:200,
	  //collapsible:true,
	  autoHeight:true,
	   contentEl:'addroomform'
	  //items:[panel]
	  }]
	  //renderTo:'regionlistandadd'
	  
	});*/
     
}); 

     //表格
       function renderroomid(value){
	  	var roomid = value;
	  	roomid = roomid.toString();
	  	roomid = roomid.substring(roomid.length-3,roomid.length);
	  	return "<span style='color:#FF3333;font-weight:bold;'>"+roomid+"</span>"; 

	  }
	  	
	  /**下拉框区*/
     var regioncombo = new Ext.form.ComboBox({
            id:'regioncomboid',
            fieldLabel:'区名',
            hiddenName: 'regionid',   
            valueField: 'regionid',   
            displayField: 'regionname',  
            editable: true,
            //editable: false, 
             emptyText:'区名',
            triggerAction: 'all',   
            width: 60,   
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
	  	
	    
     
	    /**下拉框院系*/
     var sdeptcombo = new Ext.form.ComboBox({
            id:'sdeptcomboid',
            hiddenName: 'sdeptid',   
            valueField: 'sdeptid',   
            displayField: 'sdeptname',   
            editable: true, 
             emptyText:'请选择院系名',
            triggerAction: 'all',   
            width: 100,   
            mode: 'remote',   
            minListWidth:250,   
            pageSize:10,   
            store:new Ext.data.JsonStore({   
                url: 'sdeptlist1.action',    
                root: 'sdeptlist',   
                totalProperty: 'total',    
                remoteSort: true,    
                 //params:{regionid:regionidcombo},
                fields:['sdeptid', 'sdeptname']   
            })
     });
     
     var sdeptcombo4 = new Ext.form.ComboBox({
            id:'sdeptcomboid4',
            //hiddenName: 'sdeptid',   
            valueField: 'sdeptname',   
            displayField: 'sdeptname',   
            editable: false, 
            // emptyText:'请选择院系名',
            triggerAction: 'all',   
            //width: 100,   
            mode: 'remote',   
            minListWidth:250,   
            pageSize:10,   
            store:new Ext.data.JsonStore({   
                url: 'sdeptlist1.action',    
                root: 'sdeptlist',   
                totalProperty: 'total',    
                remoteSort: true,    
                 //params:{regionid:regionidcombo},
                fields:['sdeptid', 'sdeptname']   
            })
     });
   
     
	 //查询组件
     var search = new Ext.Button({
       text:'查找',
       icon : 'ext/imgs/search.gif',
       handler:function(){searchroom();}
     });
	  //查询
      function searchroom(){
     	
     	var regionname2 = Ext.getCmp('regioncomboid').getValue();//获取regioncomboid下拉框里的regionname
     	var flatname2 = Ext.getCmp("flatcomboid").getValue();
     	var sdeptname2 = Ext.getCmp('sdeptcomboid').getRawValue();
    	var number1 = Ext.getCmp('numbercombo1').getRawValue();
    	var number2 = Ext.getCmp('numbercombo2').getRawValue();
    	var number3 = Ext.getCmp('numbercombo3').getRawValue();
    	var roomid2 = number1+number2+number3;
    	var roomid2 = roomid2.trim();
    	//var roomid2 = roomid2.toString();
     	
     	if(regionname2.length<=0 || regionname2 == ''){//regionid为空
     		if(flatname2.length<=0 || flatname2 == ''){//flatid为空
     			if(sdeptname2.length<=0 || sdeptname2 == ''){
     				if(roomid2.length<=0 || roomid2 == ''){
     					Ext.Msg.alert('提示','请选择至少一个你要查找的关键词');
     				}else{
     					Ext.getCmp('roomgrid').getStore().load();
     				}
     			}else{
     				Ext.getCmp('roomgrid').getStore().load();
     			}
     			
     		}else{
     			Ext.getCmp('roomgrid').getStore().load();
     		}
     	}else{
     		Ext.getCmp('roomgrid').getStore().load();
     	}
     	
     }


     //表单

      /*//修改roomid输出的格式
	  function renderroomid(value){
	  	var roomid = value;
	  	return "<span style='color:#FF3333;font-weight:bold;'>"+roomid+"</span>"; 

	  }*/
     field1 = new Ext.form.NumberField({
	  fieldLabel:'房号从',
	  name:'startid',
	  allowBlank:false,
	  emptyText:'空',
	  width:70,
	  //vtype:'numberfield',
	  allowNegative:false,//不能输入负号
	  allowDecimals:false,//不能输入小数点
	  maskRe:/\d/,
	  msgTarget:'qtip'
	});
	field2 = new Ext.form.NumberField({
	  fieldLabel:'至',
	  name:'endid',
	  width:70,
	  allowBlank:false,
	  emptyText:'空',
	  //vtype:'numberfield',
	  allowNegative:false,//不能输入负号
	  allowDecimals:false,//不能输入小数点
	  maskRe:/\d/,
	  msgTarget:'qtip'
	});
	  	
	 field11 = new Ext.form.NumberField({
	  fieldLabel:'房号',
	  name:'roomid',
	  allowBlank:false,
	  emptyText:'空',
	  //vtype:'numberfield',
	  allowNegative:false,//不能输入负号
	  allowDecimals:false,//不能输入小数点
	  maskRe:/\d/,
	  msgTarget:'side'
	}); 	
	  	
	var regioncombo1 = new Ext.form.ComboBox({
            id:'regioncomboid1',
            fieldLabel:'区名',
            hiddenName: 'rid',   
            valueField: 'regionid',   
            displayField: 'regionname',  
            editable: false,
            //editable: false, 
             emptyText:'请选择区名',
            allowBlank:false,   
           // blankText    :'请选择区名',   
            //msgTarget :'qtip',   
            triggerAction: 'all',   
            //width: 100,   
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
	
	 var regioncombo2 = new Ext.form.ComboBox({
            id:'regioncomboid2',
            fieldLabel:'区名',
            hiddenName: 'rid',   
            valueField: 'regionid',   
            displayField: 'regionname',  
            editable: false,
            //editable: false, 
             emptyText:'请选择区名',
            allowBlank:false,   
           // blankText    :'请选择区名',   
            //msgTarget :'qtip',   
            triggerAction: 'all',   
            //width: 100,   
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
	
	  var sdeptcombo1 = new Ext.form.ComboBox({
            id:'sdeptcomboid1',
            hiddenName: 'sdeptid',   
            valueField: 'sdeptid',   
            displayField: 'sdeptname',   
            editable: false, 
            fieldLabel:'院系名',
             emptyText:'请选择院系名',
            triggerAction: 'all',   
            allowBlank:false,  
            mode: 'remote',   
            minListWidth:250,   
            pageSize:10,   
            store:new Ext.data.JsonStore({   
                url: 'sdeptlist1.action',    
                root: 'sdeptlist',   
                totalProperty: 'total',    
                remoteSort: true,    
                 //params:{regionid:regionidcombo},
                fields:['sdeptid', 'sdeptname']   
            })
     });
     
     var sdeptcombo2 = new Ext.form.ComboBox({
            id:'sdeptcomboid2',
            hiddenName: 'sdeptid',   
            valueField: 'sdeptid',   
            displayField: 'sdeptname',   
            editable: false, 
             fieldLabel:'院系名',
             emptyText:'请选择院系名',
            triggerAction: 'all',   
           allowBlank:false,  
            mode: 'remote',   
            minListWidth:250,   
            pageSize:10,   
            store:new Ext.data.JsonStore({   
                url: 'sdeptlist1.action',    
                root: 'sdeptlist',   
                totalProperty: 'total',    
                remoteSort: true,    
                 //params:{regionid:regionidcombo},
                fields:['sdeptid', 'sdeptname']   
            })
     });
	  
	  
	  
	  
	  