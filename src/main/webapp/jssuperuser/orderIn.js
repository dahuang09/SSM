Ext.onReady(function() {

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

    //表格
    Ext.QuickTips.init();

   var orderInNo2 = null;

    var sm = new Ext.grid.CheckboxSelectionModel({handleMouseDown:Ext.emptyFn()}); // CheckBox
    var cm = new Ext.grid.ColumnModel([
        new Ext.grid.RowNumberer(), //
        sm,
        {header: "入库单编号", dataIndex: 'orderinno',width:100,sortable:true,renderer:renderusername},
        {header: "商品类目", dataIndex: 'categoryname',width:100,sortable:true},
        {header: "商品名称", dataIndex: 'itemname',width:100,sortable:true},
        {header: "数量", dataIndex: 'amount',width:100,sortable:true},
        {header: "单价", dataIndex: 'price',width:100,sortable:true},
        {header: "总价", dataIndex: 'total',width:100,sortable:true},
        {header: "生产日期", dataIndex: 'productdate',width:100,sortable:true,renderer:Ext.util.Format.dateRenderer('Y-m-d')},
        {header: "保质期", dataIndex: 'keepperiod',width:100,sortable:true},
        {header: "过期时间", dataIndex: 'expireddate',width:100,sortable:true,renderer:Ext.util.Format.dateRenderer('Y-m-d')}
    ]);
    //var ds = new Ext.data.Store({
    var ds = new Ext.data.GroupingStore({
        proxy: new Ext.data.HttpProxy({url: 'orderIn/listOrderIn'}),
        reader: new Ext.data.JsonReader({
            totalProperty: 'total',
            root: 'orderInList',
            successProperty: 'success'
      }, [
            {name: 'orderinno', mapping: 'orderinno', type: 'string'},
            {name: 'categoryname', mapping: 'category.name', type: 'string'},
            {name: 'itemname', mapping: 'item.itemname', type: 'string'},
            {name: 'amount', mapping: 'amount', type: 'int'},
            {name: 'price', mapping: 'price', type: 'float'},
            {name: 'total', mapping: 'total', type: 'float'},
            {name: 'productdate', mapping: 'productdate', type: 'date',dateFormat:'time'},
            {name: 'keepperiod', mapping: 'keepperiod', type: 'float'},
            {name: 'expireddate', mapping: 'expireddate', type: 'date',dateFormat:'time'}
        ]) ,
        pruneModifiedRecords:true,
        groupField:'itemname',
        sortInfo:{field:'itemname',direction:"ASC"}
    });

    //var grid = new Ext.grid.GridPanel({
    var grid = new Ext.grid.EditorGridPanel({
        region : 'center',
        id:'orderInGrid',
        ds: ds,   //数据源
        sm: sm,   //每行数据前面的复选框
        cm: cm,   //表格上的列
        view:new Ext.grid.GroupingView(),//分组表格
        clicksToEdit:1,//单击激活编辑器
        stripeRows:true,//数据行间隔的底色
        loadMask : {msg : '数据加载中...'},
        //loadMask:true,//读取数据时的遮罩和提示功能
//        autoExpandColumn:'regionname',
        viewConfig:{
            forceFit:true//自动调节每列的宽度使其填满表格
        },

        //顶部工具栏
        tbar:new Ext.Toolbar(['-',{
            text:'添加',
            icon : 'ext/imgs/save.jpg',
            handler:function(){
                batchAddOderInWin.show();
            }
        },'-',{
                    text: '删除',
                    icon : 'ext/imgs/del.gif',
                    handler: function(btn, pressed)
                    {
                           var rows=Ext.getCmp("userGrid").getSelectionModel().getSelections();    //获取选中的行
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
                                                setTimeout(f(i), i * 70);
                                               }
                                        //var br = Ext.getCmp("roomgrid").getSelectionModel().getSelected().data;
                                        var jsonArray = [];
                                        var len = rows.length;
                                         for(var i = 0;i<len;i++){
                                             jsonArray.push(rows[i].data);
                                         }
                                        Ext.Ajax.request({
                                            url:'deleteadmin.action',
                                         success:function(){
                                             Ext.Msg.alert('成功','删除用户成功',function(){
                                             var grid = Ext.getCmp('userGrid');
                                            var ds = grid.getStore();
                                            ds.remove(rows);});
                                         },failure:function(){
                                           Ext.Msg.alert('错误','与后台联系的时候出现了问题');
                                         },
                                         params:{deletadminjson:Ext.util.JSON.encode(jsonArray)}
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
            // lastText:"尾页",
             refreshText:"刷新页面",
            displayInfo: true,
            displayMsg: '显示第 {0} 条到 {1} 条记录, 共 {2} 条',
           emptyMsg: '没有记录',
           items : ['-',{
            xtype: 'combo',
            id:'comboid',
            hiddenName: 'itemname',
            valueField: 'itemname',
            displayField: 'itemname',
            editable: true,
             emptyText:'请选择商品名称',
            //allowBlank : false,
            //blankText    :'请选择区名',
            //msgTarget :'qtip',
            triggerAction: 'all',
            width: 150,
            mode: 'remote',
            minListWidth:250,
            pageSize:5,
            store: new Ext.data.JsonStore({
                url: 'orderIn/searchOrderIn',
                root:'orderInList',
                totalProperty: 'total',
                remoteSort: true,
                fields:['orderinno']
            })
        },{xtype:'button',text:'查询',  icon : 'ext/imgs/search.gif',handler:function(){searchadmin();}} ]
        })
    });

    ds.load({params: {start: 0, limit:27,name:orderInNo2}});

    ds.on('beforeload', function() {
        var orderInNo2 = Ext.getCmp('comboid').getRawValue();
         this.baseParams = {start:0,limit:27,name:orderInNo2};
    });

   var adminpanel = new Ext.Panel({
       layout:'border',
       items:[grid]
   });
     var view = new Ext.Viewport({
    region : 'center',
    layout:'fit',
      items:[adminpanel]
    });

});

function renderusername(value){
    var catgoryno = value;
    return "<span style='color:#FF3333;font-weight:bold;'>"+catgoryno+"</span>";

}

       //查询
      function searchadmin(){
         var name = Ext.getCmp("comboid").getValue();
         var name2 = name.trim();
         if(name2.length<=0 || name2.length == ''){
             Ext.Msg.alert('提示','请选择一个你要查询的类目名');
         }else{
                 Ext.getCmp('orderInGrid').getStore().load();
         }
     }

     /**
      * 表单样式
      */
     var itemNameField = new Ext.form.TextField({
      fieldLabel:'商品名',
      name:'itemname',
      width: 200,
      allowBlank:false,
      emptyText:'空',
      msgTarget:'side'
    });

     var batchAddOderInWin = new Ext.Window({
         title : '添加入库单',
         width: 1000,
         bodyStyle:"padding:10px;",
         maximizable:false,
         resizable : false,
         autoHeight : true,
         modal : true,
         closable:true,
         closeAction : 'hide',
         buttonAlign:"center",
         layout:'fit',
         listeners : {
             'hide' : function(){
                 if (Ext.getCmp("addOrderInGrid")) {
                     alert("11");
                     Ext.getCmp("addOrderInGrid").getStore().removeAll(new Boolean(true));
                 }
             }
         },
         html: '<iframe style="width:100%; height:450px;" src="common/addOrderIn.jsp" frameborder="0" scrolling="false"></iframe>',
     });






