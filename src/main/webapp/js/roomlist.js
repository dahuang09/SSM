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
    var flatid=Ext.get("flatid").dom.value;//获取flatid值
   
    var roomid11 = null;
    var roomid12 = null;
    
    
    var sm = new Ext.grid.CheckboxSelectionModel({handleMouseDown:Ext.emptyFn()}); // CheckBox   
    var cm = new Ext.grid.ColumnModel([   
        new Ext.grid.RowNumberer(), //   
        sm,   
        {header: "<span style='font-weight:bold;font-size:15px;'>&nbsp;&nbsp;&nbsp;&nbsp;房号</span>", dataIndex: 'roomid',width:100,sortable:true,renderer:renderroomid},  
        {header: "系别", dataIndex: 'sdeptname',width:200,sortable:true},
        {header: "院评1", dataIndex: 'sdeptfirstgrade',width:100,sortable:true,editor:new Ext.grid.GridEditor(new Ext.form.NumberField({allowBlank:false,allowNegative:false,maxValue:100,minValue:0}))},   
        {header: "院评2", dataIndex: 'sdeptsecondgrade',width:100,sortable:true,editor:new Ext.grid.GridEditor(new Ext.form.NumberField({allowBlank:false,allowNegative:false,maxValue:100,minValue:0}))},
        {header: "院评3", dataIndex: 'sdeptthirdgrade',width:100,sortable:true,editor:new Ext.grid.GridEditor(new Ext.form.NumberField({allowBlank:false,allowNegative:false,maxValue:100,minValue:0}))},
        {header: "院评4", dataIndex: 'sdeptforthgrade',width:100,sortable:true,editor:new Ext.grid.GridEditor(new Ext.form.NumberField({allowBlank:false,allowNegative:false,maxValue:100,minValue:0}))},
        {header: "校评", dataIndex: 'schoolgrade',width:100,sortable:true,editor:new Ext.grid.GridEditor(new Ext.form.NumberField({allowBlank:false,allowNegative:false,maxValue:100,minValue:0}))},   
        {header: "校备注", dataIndex: 'schoolremarks',width:200,sortable:true,editor:new Ext.grid.GridEditor(new Ext.form.TextField({regex:/^[\u4E00-\u9FA5]+$/,regexText:'只能输入汉字'}))},
        {header: "最后修改时间", id:'datetime',dataIndex: 'datetime',type:'date',width:100,sortable:true,editor:new Ext.grid.GridEditor(new Ext.form.DateField({format:'Y-m-d',minValue:'2012-2-2',disableDaysText:'当天日期'})),renderer:Ext.util.Format.dateRenderer('Y年m月d日')}
        
    ]);  
    //var ds = new Ext.data.Store({
    var ds = new Ext.data.GroupingStore({
        proxy: new Ext.data.HttpProxy({url: 'roomlist.action'}),   
        reader: new Ext.data.JsonReader({   
            totalProperty: 'total',   
            root: 'roomlist',   
            successProperty: 'success'  
      }, [   
            {name: 'roomid', mapping: 'roomid', type: 'string'}, 
            {name: 'sdeptname', mapping: 'sdeptname', type: 'string'},
            {name: 'schoolgrade', mapping: 'schoolgrade', type: 'float'},   
            {name: 'schoolremarks', mapping: 'schoolremarks', type: 'string'},
            {name: 'sdeptfirstgrade', mapping: 'sdeptfirstgrade', type: 'float'},   
            {name: 'sdeptsecondgrade', mapping: 'sdeptsecondgrade', type: 'float'},   
            {name: 'sdeptthirdgrade', mapping: 'sdeptthirdgrade', type: 'float'},   
            {name: 'sdeptforthgrade', mapping: 'sdeptforthgrade', type: 'float'},
            {name: 'datetime', mapping: 'datetime', type: 'date',dateFormat:'Y-m-dTH:i:s'}
        ]) ,
        pruneModifiedRecords:true,//每次进行remove或load操作时store会自动modified标记，避免出现下次提交时会把上次那些modified信息都带上
        //分组表格
        groupField:'sdeptname',
        sortInfo:{field:'roomid',direction:"ASC"}
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
        viewConfig:{
        	forceFit:true//自动调节每列的宽度使其填满表格
        },
        autoExpandColumn:'datetime',
        //顶部工具栏
        tbar:new Ext.Toolbar(['-',{
            text:'保存',
             icon : 'ext/imgs/save.jpg',
            handler:function(){
            	Ext.Msg.confirm('操作提示', '您确定要保存刚才修改的内容', function(btn) {
									if ('yes' == btn) {
										var modified = ds.modified;  
            	 var m = modified.slice(0);//m是数组；这两句是复制ds.modified,保证ds.modified中的原始数据不受影响。
            	 var jsonArray = [];
            	 Ext.each(m,function(item){ //Ext.each(array,fn(item))作用是遍历array，并对每项分别调用fn函数，item为当前遍历的数组元素（当前元素索引）
            		jsonArray.push(item.data);
            	});
            	if(jsonArray.length!=0){
            		Ext.Ajax.request({
            		url:'editroom.action',
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
										});
            	/*var modified = ds.modified;  
            	 var m = modified.slice(0);//m是数组；这两句是复制ds.modified,保证ds.modified中的原始数据不受影响。
            	 var jsonArray = [];
            	 Ext.each(m,function(item){ //Ext.each(array,fn(item))作用是遍历array，并对每项分别调用fn函数，item为当前遍历的数组元素（当前元素索引）
            		jsonArray.push(item.data);
            	});
            	if(jsonArray.length!=0){
            		Ext.Ajax.request({
            		url:'editroom.action',
            	 success:function(){
            	 	Ext.Msg.alert('成功','成功提交',function(){ds.reload();});
            	 },failure:function(){
            	   Ext.Msg.alert('错误','与后台联系的时候出现了问题');
            	 },
            	 params:{roomjson:Ext.util.JSON.encode(jsonArray)}
            	});
            	}else{
            		Ext.Msg.alert('提示','你没有修改过任何信息');
            	}*/
            	
         
            }
        },'-',{
        	text:'全部置零',
        	icon : 'ext/imgs/cog.png',
        	handler:function(){
        		Ext.Msg.confirm('操作提示', '您确定要该区的所有房间分数都重置为零?', function(btn) {
									if ('yes' == btn) {
										Ext.Ajax.request({
					        			url:'gradezero.action',
					        			success:function(){
					        				Ext.Msg.alert('成功','该栋所有房间的分数已置零',function(){ds.reload();});
					        			},failure:function(){
					                 	   Ext.Msg.alert('错误','与后台联系的时候出现了问题');
					               	 },
					        			params:{flatid:flatid}
					        		});
								}
        		});
        		/*Ext.Ajax.request({
        			url:'gradezero.action',
        			success:function(){
        				Ext.Msg.alert('成功','该栋所有房间的分数已置零',function(){ds.reload();});
        			},failure:function(){
                 	   Ext.Msg.alert('错误','与后台联系的时候出现了问题');
               	 },
        			params:{flatid:flatid}
        		});*/
        	}
        },'-']),
        
        //底部分页工具栏 
        bbar: new Ext.PagingToolbar({   
            pageSize:20,   
            store: ds, 
            // lastText:"尾页",  
             refreshText:"刷新页面", 
            displayInfo: true,   
            displayMsg: '显示第 {0} 条到 {1} 条记录, 共 {2} 条',   
           emptyMsg: '没有记录' ,
           items:['-',{text:'请输入你要查找的房号:'},numbercombo1,numbercombo2,numbercombo3,{text:'至'},numbercombo4,numbercombo5,numbercombo6,search,'-'] 
        })   
    });  
    
   ds.load({params: {start: 0, limit:20,flatid:flatid,roomid1:roomid11,roomid2:roomid12}});
    
    ds.on('beforeload', function() {
    	var number1 = Ext.getCmp('numbercombo1').getRawValue();
    	var number2 = Ext.getCmp('numbercombo2').getRawValue();
    	var number3 = Ext.getCmp('numbercombo3').getRawValue();
    	var roomid11 = number1+number2+number3;
    	var number4 = Ext.getCmp('numbercombo4').getRawValue();
    	var number5 = Ext.getCmp('numbercombo5').getRawValue();
    	var number6 = Ext.getCmp('numbercombo6').getRawValue();
    	var roomid12 = number4+number5+number6;
    	 this.baseParams = {start: 0, limit:20,flatid:flatid,roomid1:roomid11,roomid2:roomid12};
    });
    
    //ds.load(/*{params: {start: 0, limit:10,flatid:flatid}}*/); 
    
    var roomlistpanel = new Ext.Panel({
   	//renderTo: 'iframepanel',
       layout:'border',
       items:[grid]
   });
	 var view = new Ext.Viewport({
    region : 'center',
    layout:'fit',
	  items:[roomlistpanel]
	});
    
    
}); 




       //修改roomid输出的格式
	  function renderroomid(value){
	  	var roomid = value;
	  	roomid = roomid.toString();
	  	roomid = roomid.substring(roomid.length-3,roomid.length);
	  	return "<span style='color:#FF3333;font-weight:bold;'>"+roomid+"</span>"; 

	  }
     
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
	  	
	      var numbercombo4 = new Ext.form.ComboBox({
		      	id:'numbercombo4',
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
		      var numbercombo5 = new Ext.form.ComboBox({
		      	id:'numbercombo5',
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
		      var numbercombo6 = new Ext.form.ComboBox({
		      	id:'numbercombo6',
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
	  	
		    //查询组件
		      var search = new Ext.Button({
		        text:'查找',
		        icon : 'ext/imgs/search.gif',
		        handler:function(){searchroom();}
		      });
		      //查询
		      function searchroom(){
		     	
		    	var number1 = Ext.getCmp('numbercombo1').getRawValue().trim();
		    	var number2 = Ext.getCmp('numbercombo2').getRawValue().trim();
		    	var number3 = Ext.getCmp('numbercombo3').getRawValue().trim();
		    	var roomid = number1+number2+number3;
		    	var roomid1 = roomid.trim();


		    	var number4 = Ext.getCmp('numbercombo4').getRawValue().trim();
		    	var number5 = Ext.getCmp('numbercombo5').getRawValue().trim();
		    	var number6 = Ext.getCmp('numbercombo6').getRawValue().trim();
		    	var roomid = number4+number5+number6;
		    	var roomid2 = roomid.trim();
		    	
		    	if( (roomid1.length<=0 || roomid1 == '') && (roomid2.lenght<=0 || roomid2 == '') ){
		    		Ext.Msg.alert('提示','请选择你要查找的房号');
		    	}else if(roomid1.length<=0 || roomid1 == ''){
		    		if( number4.length<= 0 || number4 =='' || number5 == '' || number5.length<= 0 || number6 == '' || number6.length<= 0){
		    			Ext.Msg.alert('提示','请输入完整房号');
		    		}else{
		    			Ext.getCmp('roomgrid').getStore().load();
		    		}
		    	}else if(roomid2.length<=0 || roomid2 == ''){
		    		if(number1 =='' || number2 == '' || number3 == ''){
		    			Ext.Msg.alert('提示','请输入完整房号');
		    		}else{
		    			Ext.getCmp('roomgrid').getStore().load();
		    		}
		    	}else{
		    		Ext.getCmp('roomgrid').getStore().load();
		    	}
		     	
		     	
		     	
		     }
	  
	  
	  
	  
	  