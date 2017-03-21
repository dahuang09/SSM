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
   
    //var sm = new Ext.grid.CheckboxSelectionModel({handleMouseDown:Ext.emptyFn()}); // CheckBox   
    var cm = new Ext.grid.ColumnModel([   
        new Ext.grid.RowNumberer(), //   
        //sm,   
        {header: "房号", dataIndex: 'roomid',width:150,sortable:true,renderer:renderroomid},
        {header: "院系", dataIndex: 'sdeptname',width:150,sortable:true,renderer:rendersdeptname},  
        {header: "栋名", dataIndex: 'flatname',width:150,sortable:true},
        {header: "分数", dataIndex: 'grade',width:150,sortable:true},
        {header: "原因", dataIndex: 'reason',width:150,sortable:true},
        {header: "检查时间", id:'checkdate',dataIndex: 'checkdate',width:150,sortable:true,renderer:Ext.util.Format.dateRenderer('Y年m月d日')}
    ]);  
    //var ds = new Ext.data.Store({
    var ds = new Ext.data.GroupingStore({
        proxy: new Ext.data.HttpProxy({url: 'unroomlist.action'}),   
        reader: new Ext.data.JsonReader({   
            totalProperty: 'total',   
            root: 'unroomlist',   
            successProperty: 'success'  
      }, [   
            {name: 'sdeptname', mapping: 'sdeptname', type: 'string'}, 
            {name: 'flatname', mapping: 'flatname', type: 'string'},
            {name: 'roomid', mapping: 'roomid', type: 'string'}, 
            {name: 'grade', mapping: 'grade', type: 'float'},
            {name: 'reason', mapping: 'reason', type: 'string'},
            {name:'checkdate',mapping:'checkdate',type:'date',dateFormat:'Y-m-dTH:i:s'}
        ]) ,
        pruneModifiedRecords:true,//每次进行remove或load操作时store会自动modified标记，避免出现下次提交时会把上次那些modified信息都带上
        //分组表格
        groupField:'sdeptname',
        sortInfo:{field:'grade',direction:"desc"}
    });   
    
    //表格导出Excel
	  	 var linkButton = new Ext.Button({
    text: '导出到Excel',
    icon : 'ext/imgs/excel.gif',
    handler: function() {
        var vExportContent=grid.getExcelXml();
	if (Ext.isIE6 || Ext.isIE7 || Ext.isIE8 || Ext.isSafari || Ext.isSafari2 || Ext.isSafari3){
		var sheetName = 'xiaosuguang';
		var gridtoexcel = 'gridtoexcel';
		//Ext.Msg.alert('jlkjkl',Ext.getCmp('gridtoexcel')+'jkljkljkl');
		extGridToExcel(gridtoexcel,sheetName);
	}else {
        	
            document.location = 'data:application/vnd.ms-excel;base64,'+Base64.encode(vExportContent);
        }}
});
    
    //var grid = new Ext.grid.GridPanel({ 
    var grid = new Ext.grid.EditorGridPanel({
    	region:'center',
    	id:'gridtoexcel',
        ds: ds,   //数据源
        //sm: sm,   //每行数据前面的复选框
        cm: cm,   //表格上的列
        view:new Ext.grid.GroupingView(),//分组表格
        clicksToEdit:1,//单击激活编辑器
        stripeRows:true,//数据行间隔的底色
        loadMask:true,//读取数据时的遮罩和提示功能
        autoExpandColumn:'checkdate',
        viewConfig:{
        	forceFit:true//自动调节每列的宽度使其填满表格
        },
        
        tbar: new Ext.Toolbar({
            buttons: [linkButton,'-']
        }),
        
        //底部分页工具栏 
        bbar: new Ext.PagingToolbar({   
            pageSize:25,   
            store: ds, 
            // lastText:"尾页",  
             refreshText:"刷新页面", 
            displayInfo: true,   
            displayMsg: '显示第 {0} 条到 {1} 条记录, 共 {2} 条',   
           emptyMsg: '没有记录'  
        })   
    });  
    ds.load({params: {start: 0, limit:25}}); 
    
     var unroomlistpanel = new Ext.Panel({
   	//renderTo: 'iframepanel',
       layout:'border',
       items:[grid]
   });
	 var view = new Ext.Viewport({
    region : 'center',
    layout:'fit',
	  items:[unroomlistpanel]
	});
    
}); 


//修改roomid输出的格式
	  function renderroomid(value){
	  	var roomid = value;
	  	roomid = roomid.toString();
	  	roomid = roomid.substring(roomid.length-3,roomid.length);
	  	return "<span style='color:#FF3333;font-weight:bold;'>"+roomid+"</span>"; 

	  }


      //修改sdeptname输出的格式
	  function rendersdeptname(value){
	  	var sdeptname = value;
	  	return "<span style='color:#FF3333;font-weight:bold;'>"+sdeptname+"</span>"; 

	  }
     
	  	function extGridToExcel(gridId,sheetName){   
      try{   
            if(Ext.getCmp(gridId)){   
                /********************************************* grid 生成 Excel ***************************************/  
                var oXL = new ActiveXObject("Excel.Application");    
                var oWB = oXL.Workbooks.Add();    
                var oSheet = oWB.ActiveSheet;    
                               
                var grid = Ext.getCmp(gridId);   
                var store = grid.getStore();   
                var recordCount = store.getCount();   
                var view = grid.getView();   
                var cm = grid.getColumnModel();   
                var colCount = cm.getColumnCount();   
                var temp_obj = [];   
                for(var i = 0; i < colCount;i++){   
                    if(cm.isHidden(i)){   
                           
                    }else{   
                        temp_obj.push(i);   
                    }   
                }   
                for(var i = 1; i <= temp_obj.length;i++){   
                    oSheet.Cells(1,i).value = cm.getColumnHeader(temp_obj[i - 1]);   
                }   
                   
                for(var i = 1 ; i <= recordCount; i++){   
                    for(var j = 1; j<= temp_obj.length; j++){   
                        oSheet.Cells(i+1,j).value = view.getCell(i-1,temp_obj[j-1]).innerText;    
                    }   
                }   
                if(sheetName){   
                    oSheet.Name = sheetName;   
                }   
                   
                oXL.UserControl = true;   
                oXL.Visible = true;   
            }else{   
                Ext.Msg.alert('Error','明细数据grid没有创建成功！');   
                return;   
            }          
        }catch(e){   
            if(Ext){   
                Ext.Msg.show({   
                    title:'提示',   
                    msg:'请设置IE的菜单\'工具\'->Internet选项->安全->自定义级别->\'对未标记为可安全执行脚本ActiveX控件初始化并执行脚本\'->选择[启用]&nbsp;&nbsp;就可以生成Excel',   
                    buttons:Ext.Msg.OK,   
                    icon:Ext.Msg.INFO   
                });   
            }else{   
                alert('不支持ExtJs框架');   
                return;   
            }   
        }   
    }   
	  	
	  	
	  
	  
	  
	  
	  
	  
	  