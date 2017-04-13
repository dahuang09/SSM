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
   var itemName2 = null;
    var sm = new Ext.grid.CheckboxSelectionModel({handleMouseDown:Ext.emptyFn()}); // CheckBox
    var cm = new Ext.grid.ColumnModel([
        new Ext.grid.RowNumberer(), //
        sm,
        {header: "供应商编号", dataIndex: 'vendorno',width:100,sortable:true,renderer:renderusername},
        {header: "供应商名称", dataIndex: 'vendorname',width:100,sortable:true,renderer:renderusername},
        {header: "商品编号", dataIndex: 'itemno',width:100,sortable:true},
        {header: "商品名称", dataIndex: 'itemname',width:100,sortable:true},
        {header: "所属类别名称", dataIndex: 'categoryname',width:100,sortable:true},
        {header: "入库数量", dataIndex: 'inAmount',width:100,sortable:true,renderer:renderusername},
        {header: "出库数量", dataIndex: 'outAmount',width:100,sortable:true},
        {header: "退货数量", dataIndex: 'returnAmount',width:100,sortable:true},
    ]);
    //var ds = new Ext.data.Store({
    var ds = new Ext.data.GroupingStore({
        proxy: new Ext.data.HttpProxy({url: 'search/listSearch'}),
        reader: new Ext.data.JsonReader({
            totalProperty: 'total',
            root: 'searchList',
            successProperty: 'success'
      }, [
            {name: 'vendorno', mapping: 'vendor.vendorno', type: 'string'},
            {name: 'vendorname', mapping: 'vendor.vendorname', type: 'string'},
            {name: 'itemno', mapping: 'item.itemno', type: 'string'},
            {name: 'itemname', mapping: 'item.itemname', type: 'string'},
            {name: 'categoryname', mapping: 'category.categoryname', type: 'string'},
            {name: 'inAmount', mapping: 'orderIn.amount', type: 'string'},
            {name: 'outAmount', mapping: 'orderOut.amount', type: 'string'},
            {name: 'returnAmount', mapping: 'return.amount', type: 'string'}
        ]),
        pruneModifiedRecords:true,
        groupField:'',
        sortInfo:{field:'vendorno',direction:"ASC"}
    });
    var vendorStore = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({url: 'vendor/searchVendor'}),
         reader: new Ext.data.JsonReader({
             totalProperty: 'total',
             root: 'vendorList',
             successProperty: 'success'
       }, [
             {name: 'vendorno', mapping: 'vendorno', type: 'string'},
             {name: 'vendorname', mapping: 'name', type: 'string'}
         ])
     });

    var vendorCombo = new Ext.form.ComboBox({
    	id:'vendorCombo',
        hiddenName: 'vendorno',
        valueField: 'vendorname',
        displayField: 'vendorname',
        editable: false,
         emptyText:'请选择供应商',
        triggerAction: 'all',
        width: 150,
        mode: 'remote',
        minListWidth:250,
        pageSize:5,
        store: vendorStore
    });




    //var grid = new Ext.grid.GridPanel({

    var grid = new Ext.grid.EditorGridPanel({
        region : 'center',
        id:'searchGrid',
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

        //底部分页工具栏
        bbar: new Ext.PagingToolbar({
            pageSize:27,
            store: ds,
            // lastText:"尾页",
             refreshText:"刷新页面",
            displayInfo: true,
            displayMsg: '显示第 {0} 条到 {1} 条记录, 共 {2} 条',
           emptyMsg: '没有记录',
           items : ['-',vendorCombo,{xtype:'button',text:'查询',  icon : 'ext/imgs/search.gif',handler:function(){search();}} ]
        })
    });

    ds.load({params: {start: 0, limit:27,name:itemName2}});


    ds.on('beforeload', function() {

        var vendorno = Ext.getCmp("vendorCombo").getRawValue();

         this.baseParams = {start:0,limit:27,
        		 vendorno:vendorno,
        		};
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
    return "<span style='color:#FF3333;font-weight:bold;'>"+value+"</span>";

}

   //查询
  function search(){

     varvendorno = Ext.getCmp("vendorCombo").getValue();


     vendorno = vendorno.trim();


     if(
    		 vendorno.length<=0 || vendorno.length == ''
        ){
         Ext.Msg.alert('提示','请选择一个你要查询的供应商');
     }else{
        Ext.getCmp('searchGrid').getStore().load();
     }
 }

