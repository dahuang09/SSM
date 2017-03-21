Ext.onReady(function() {   
    Ext.QuickTips.init();  
    
    //提交按钮
					     var submit = new Ext.Button({
					        text:'查询',
					        applyTo:'submit',
					        handler:function(){
        		                var regionid1 = Ext.getCmp("regioncomboid1").getValue();
        		                var flatid1 = Ext.getCmp("flatcomboid1").getValue();
        		                var roomid1 = Ext.getCmp("roomid1").getRawValue();
        		                if(regionid1.length<=0 || regionid1 == ''){
   	                                  	Ext.Msg.alert('提示','请选择区名');
                                 }else if(flatid1.length<=0 || flatid1 == '' || flatid1 == null){
                                 	Ext.Msg.alert('提示','请选择栋名');
                                 }else if(roomid1.length != 3 || roomid1 == ''){
                                 	Ext.Msg.alert('提示','房号必须为3位数');
                                 }else{
                                 	checkroom(regionid1,flatid1,roomid1);
                                 }
        		               
        		                /*Ext.get('result').getUpdater().update({
        		                url:'../schoolmanagement/result.jsp?regionid='+regionid1+'&flatid='+flatid1+'&roomid='+roomid,
        		                script:true
        		                });*/
        	                  }
					     });
    
     var regionid1 = Ext.getCmp("regioncomboid1").getValue();
     var flatid1 = Ext.getCmp("flatcomboid1").getValue();
     var roomid1 = Ext.getCmp("roomid1").getRawValue();
   if(regionid1.length<=0 || regionid1 == '' || flatid1.length<=0 || flatid1 == '' || roomid1.length<=0 || roomid1 == ''){
   	
   }else{
   	//Ext.Msg.alert('查询',regionid1+flatid1+roomid1);
   	checkroom(regionid1,flatid1,roomid1);
   }
    
    
    
    
}); 




      
     
	  function checkroom(regionid1,flatid1,roomid1){
         var cm = new Ext.grid.ColumnModel([  
        {header: "房号", dataIndex: 'roomid',width:50,renderer:renderroomid},  
        {header: "系别", dataIndex: 'sdeptname',width:60,sortable:true},
        {header: "院评1", dataIndex: 'sdeptfirstgrade',width:50},   
        {header: "院评2", dataIndex: 'sdeptsecondgrade',width:50},
        {header: "院评3", dataIndex: 'sdeptthirdgrade',width:50},
        {header: "院评4", dataIndex: 'sdeptforthgrade',width:50},
        {header: "校评", dataIndex: 'schoolgrade',width:50},   
        {header: "校备注", dataIndex: 'schoolremarks',width:100},
        {header: "检查时间", id:'datetime',dataIndex: 'datetime',type:'date',width:100,renderer:Ext.util.Format.dateRenderer('Y年m月d日')}
        
    ]);  
    //var ds = new Ext.data.Store({
    var ds = new Ext.data.GroupingStore({
        proxy: new Ext.data.HttpProxy({url: 'checkresult.action'}),   
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
        ]) 
    });   
    
    
    //var grid = new Ext.grid.GridPanel({ 
    var grid = new Ext.grid.EditorGridPanel({
        el: 'result',  //渲染到jsp页面上的<div id="roomlist">
        //title:'表格', 
        id:'roomgrid',
        ds: ds,   //数据源
       
        cm: cm,   //表格上的列
        width: 800, 
        autoHeight:true,
        //height: 100,
        stripeRows:true,//数据行间隔的底色
        loadMask:true,//读取数据时的遮罩和提示功能
        viewConfig:{
        	forceFit:true//自动调节每列的宽度使其填满表格
        },
        autoExpandColumn:'datetime'
    });  
    
    ds.on('beforeload', function() {
    	 this.baseParams = {start: 0, limit:1,regionid:regionid1,flatid:flatid1,roomid:roomid1};
    });
    
    
    ds.load(/*{params: {start: 0, limit:10,regionid:regionid1,flatid:flatid1,roomid:roomid1}}*/); 
    grid.render();   
    }
	  
	   //修改roomid输出的格式
	  function renderroomid(value){
	  	var roomid = value;
	  	roomid = roomid.toString();
	  	roomid = roomid.substring(roomid.length-3,roomid.length);
	  	return "<span style='color:#FF3333;font-weight:bold;'>"+roomid+"</span>"; 

	  }
	  
	  