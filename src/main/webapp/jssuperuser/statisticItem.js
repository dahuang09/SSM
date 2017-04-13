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
    var sm = new Ext.grid.CheckboxSelectionModel({handleMouseDown:Ext.emptyFn()}); // CheckBox
    var cm = new Ext.grid.ColumnModel([
        new Ext.grid.RowNumberer(), //
        sm,
        {header: "商品编号", dataIndex: 'itemno',width:100,sortable:true,renderer:renderusername},
        {header: "商品名称", dataIndex: 'itemname',width:100,sortable:true,renderer:renderusername},
        {header: "入库数量", dataIndex: 'inAmount',width:100,sortable:true,renderer:renderusername},
        {header: "出库数量", dataIndex: 'outAmount',width:100,sortable:true},
        {header: "退货数量", dataIndex: 'returnAmount',width:100,sortable:true},
        {header: "当前库存量", dataIndex: 'actualstock',width:100,sortable:true},
        {header: "安全库存量", dataIndex: 'safetystock',width:100,sortable:true}
    ]);
    var ds = new Ext.data.GroupingStore({
        proxy: new Ext.data.HttpProxy({url: 'search/listSearch'}),
        reader: new Ext.data.JsonReader({
            totalProperty: 'total',
            root: 'searchList',
            successProperty: 'success'
      }, [
            {name: 'itemno', mapping: 'item.itemno', type: 'string'},
            {name: 'itemname', mapping: 'item.itemname', type: 'string'},
            {name: 'inAmount', mapping: 'orderIn.amount', type: 'string'},
            {name: 'outAmount', mapping: 'orderOut.amount', type: 'string'},
            {name: 'returnAmount', mapping: 'return.amount', type: 'float'},
            {name: 'actualstock', mapping: 'item.actualstock', type: 'string'},
            {name: 'safetystock', mapping: 'item.safetystock', type: 'string'}
        ]) ,
        pruneModifiedRecords:true,
        groupField:'',
        sortInfo:{field:'itemno',direction:"ASC"}
    });

    var itemStore = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({url: 'item/searchItem'}),
         reader: new Ext.data.JsonReader({
             totalProperty: 'total',
             root: 'itemList',
             successProperty: 'success'
       }, [
             {name: 'itemno', mapping: 'itemno', type: 'string'},
             {name: 'itemname', mapping: 'itemname', type: 'string'}
         ])
     });

    var itemCombo = new Ext.form.ComboBox({
    	id:'itemCombo',
        hiddenName: 'itemno',
        valueField: 'itemname',
        displayField: 'itemname',
        editable: false,
         emptyText:'请选择商品',
        triggerAction: 'all',
        width: 150,
        mode: 'remote',
        minListWidth:250,
        pageSize:5,
        store: itemStore
    });

    var fromInDate = new Ext.form.DateField({
    	id:'fromInDate',
    	emptyText:'入库起始时间',
        allowBlank: false,
        format:'Y-m-d'
    });
    var toInDate = new Ext.form.DateField({
    	id:'toInDate',
    	emptyText:'入库截止时间',
        allowBlank: false,
        format:'Y-m-d'
    });

    var fromOutDate = new Ext.form.DateField({
    	id:'fromOutDate',
    	emptyText:'出库起始时间',
        allowBlank: false,
        format:'Y-m-d'
    });
    var toOutDate = new Ext.form.DateField({
    	id:'toOutDate',
    	emptyText:'出库截止时间',
        allowBlank: false,
        format:'Y-m-d'
    });



    var grid = new Ext.grid.EditorGridPanel({
        region : 'center',
        id:'statisticItemGrid',
        ds: ds,   //数据源
        sm: sm,   //每行数据前面的复选框
        cm: cm,   //表格上的列
        view:new Ext.grid.GroupingView(),//分组表格
        clicksToEdit:1,//单击激活编辑器
        stripeRows:true,//数据行间隔的底色
        loadMask : {msg : '数据加载中...'},
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
           items : ['-',itemCombo,'-','入库时间：','从',fromInDate,'到',toInDate,'-','出库时间：','从',fromOutDate,'到',toOutDate,{xtype:'button',text:'查询',  icon : 'ext/imgs/search.gif',handler:function(){search();}} ]
        })
    });

    ds.load({params: {start: 0, limit:27,name:''}});

    ds.on('beforeload', function() {
        var itemno = Ext.getCmp("itemCombo").getRawValue();
         this.baseParams = {start:0,limit:27,itemno:itemno,};
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
     var itemno = Ext.getCmp("itemCombo").getValue();
     itemno = itemno.trim();
     if(
    	  itemno.length<=0 || itemno.length == ''
        ){
         Ext.Msg.alert('提示','请选择一个你要查询的商品');
     }else{
        Ext.getCmp('searchGrid').getStore().load();
     }
 }

