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
  Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
  
  var sdeptname2 = null;
  var sdeptgradedate2 = null;
  
    var sm = new Ext.grid.CheckboxSelectionModel({handleMouseDown:Ext.emptyFn()}); // CheckBox   
    var cm = new Ext.grid.ColumnModel([   
        new Ext.grid.RowNumberer(), //   
        sm,   
        {header: "学院", dataIndex: 'sdeptname',width:150,sortable:true,renderer:rendersdeptname},  
        {header: "学院自检", dataIndex: 'sdeptgrade1',width:150,sortable:true},
        {header: "宿管会评分", dataIndex: 'schoolgrade',width:150,sortable:true},
        {header: "级差", dataIndex: 'range',width:150,sortable:true},
        {header: "实际学院评分", dataIndex: 'sdeptgrade2',width:150,sortable:true},
        {header: "总评", dataIndex: 'sumary',width:150,sortable:true},
        {header: "日期", id:'sdeptdate',dataIndex: 'sdeptdate',width:150,sortable:true}/*,
        {header: "序号", dataIndex: 'recordid'}*/
    ]);  
    //var ds = new Ext.data.Store({
    var ds = new Ext.data.GroupingStore({
        proxy: new Ext.data.HttpProxy({url: 'oldsdeptgradelist2.action'}),   
        reader: new Ext.data.JsonReader({   
            totalProperty: 'total',   
            root: 'sdeptgradelist2',   
            successProperty: 'success'  
      }, [   
            {name: 'sdeptname', mapping: 'sdeptname', type: 'string'}, 
            {name: 'sdeptgrade1', mapping: 'sdeptgrade1', type: 'float'},
            {name: 'schoolgrade', mapping: 'schoolgrade', type: 'float'}, 
            {name: 'range', mapping: 'range', type: 'float'},
            {name: 'sdeptgrade2', mapping: 'sdeptgrade2', type: 'float'},
            {name: 'sumary', mapping: 'sumary', type: 'float'},
           {name: 'sdeptdate', mapping: 'sdeptdate', type: 'string'},
            {name: 'recordid', mapping: 'recordid', type: 'int'},
            {tip:'tip',mapping:'message',type:'string'}
        ]) ,
        pruneModifiedRecords:true,//每次进行remove或load操作时store会自动modified标记，避免出现下次提交时会把上次那些modified信息都带上
        //分组表格
        groupField:'sdeptdate',
        sortInfo:{field:'sumary',direction:"desc"}
    });   
    
    
    
    //var grid = new Ext.grid.GridPanel({ 
    var grid = new Ext.grid.EditorGridPanel({
        region:'center',
        id:'oldsdeptgradegrid',
        //title:'表格', 
        ds: ds,   //数据源
        sm: sm,   //每行数据前面的复选框
        cm: cm,   //表格上的列
        view:new Ext.grid.GroupingView(),//分组表格
        stripeRows:true,//数据行间隔的底色
        loadMask:true,//读取数据时的遮罩和提示功能
        autoExpandColumn:'sdeptdate',
        viewConfig:{
        	forceFit:true//自动调节每列的宽度使其填满表格
        },
         
        //底部分页工具栏 
        bbar: new Ext.PagingToolbar({   
            pageSize:25,   
            store: ds, 
            // lastText:"尾页",  
             refreshText:"刷新页面", 
            displayInfo: true,   
            displayMsg: '显示第 {0} 条到 {1} 条记录, 共 {2} 条',   
           emptyMsg: '没有数据' ,
           items:['-',sdeptcombo,'-',sdeptgradedatecombo,'-',search,'-']
        })   
    });  
    
    ds.on('beforeload', function() {
    	var sdeptname2 = Ext.getCmp('sdeptcomboid').getRawValue();
    	var sdeptgradedate2 =Ext.getCmp('sdeptgradedateid').getRawValue();
    	 this.baseParams = {start: 0, limit:25,sdeptname:sdeptname2,sdeptgradedate:sdeptgradedate2};
    });
    ds.load({params: {start: 0, limit:25,sdeptname:sdeptname2,sdeptgradedate:sdeptgradedate2}}); 
   
    var oldsdepgradepanel = new Ext.Panel({
   	//renderTo: 'iframepanel',
       layout:'border',
       items:[grid]
   });
	 var view = new Ext.Viewport({
    region : 'center',
    layout:'fit',
	  items:[oldsdepgradepanel]
	});
    
    
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
     
     var sdeptgradedatecombo = new Ext.form.ComboBox({
            id:'sdeptgradedateid',
            //hiddenName: 'sdeptdate',   
            valueField: 'sdeptdate',   
            displayField: 'sdeptdate',   
            editable: true, 
             emptyText:'请选择日期',
            triggerAction: 'all',   
            width: 100,   
            mode: 'remote',   
            minListWidth:250,   
            pageSize:10,   
            store:new Ext.data.JsonStore({   
                url: 'oldsdeptgradelist.action',    
                root: 'sdeptgradelist',   
                totalProperty: 'total',    
                remoteSort: true,    
                 //params:{regionid:regionidcombo},
                fields:['sdeptdate']   
            })
     });


      //修改roomid输出的格式
	  function rendersdeptname(value){
	  	var sdeptname = value;
	  	return "<span style='color:#FF3333;font-weight:bold;'>"+sdeptname+"</span>"; 

	  }
     
	  //查询组件
     var search = new Ext.Button({
       text:'查找',
       icon : 'ext/imgs/search.gif',
       handler:function(){searchsdeptgrade();}
     });
	  //查询
      function searchsdeptgrade(){
     	
     	var sdeptname2 = Ext.getCmp('sdeptcomboid').getRawValue();
    	var sdeptgradedate2 =Ext.getCmp('sdeptgradedateid').getRawValue();
     	
     	if((sdeptname2.length<=0 || sdeptname2 == '') && (sdeptgradedate2.length <=0 || sdeptgradedate2 == '')){
     		Ext.Msg.alert('提示','请至少选择一个关键字来查找');
     	}else{
     		Ext.getCmp('oldsdeptgradegrid').getStore().load();
     	}
     	
     }
	

	 
	  	
	  
	  
	  
	  
	  
	  
	  