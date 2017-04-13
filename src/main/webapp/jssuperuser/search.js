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
        {header: "商品编号", dataIndex: 'itemno',width:100,sortable:true,renderer:renderusername},
        {header: "商品名称", dataIndex: 'itemname',width:100,sortable:true,renderer:renderusername},
        {header: "单价", dataIndex: 'price',width:100,sortable:true},
        {header: "安全库存量", dataIndex: 'safetystock',width:100,sortable:true},
        {header: "当前库存量", dataIndex: 'actualstock',width:100,sortable:true},
        {header: "总金额", dataIndex: 'total',width:100,sortable:true},
        {header: "预计过期时间", dataIndex: 'item.expiredate',width:100,sortable:true}
    ]);
    //var ds = new Ext.data.Store({
    var ds = new Ext.data.GroupingStore({
        proxy: new Ext.data.HttpProxy({url: 'search/listSearch'}),
        reader: new Ext.data.JsonReader({
            totalProperty: 'total',
            root: 'searchList',
            successProperty: 'success'
      }, [
            {name: 'itemno', mapping: 'item.itemno', type: 'string'},
            {name: 'itemname', mapping: 'item.itemname', type: 'string'},
            {name: 'price', mapping: 'item.price', type: 'string'},
            {name: 'safetystock', mapping: 'item.safetystock', type: 'float'},
            {name: 'actualstock', mapping: 'item.actualstock', type: 'string'},
            {name: 'total', mapping: 'total', type: 'string'},
            {name: 'expiredate', mapping: 'item.expiredate', type: 'string'}


        ]) ,
        pruneModifiedRecords:true,
        groupField:'',
        sortInfo:{field:'itemno',direction:"ASC"}
    });

    var categoryCombo = new Ext.form.ComboBox({
    	id:'categoryCombo',
        hiddenName: 'categoryno',
        valueField: 'categoryno',
        displayField: 'name',
        editable: false,
         emptyText:'请选择类目',
        triggerAction: 'all',
        width: 150,
        mode: 'remote',
        minListWidth:250,
        pageSize:5,
        store: new Ext.data.JsonStore({
            url: 'category/searchCategory',
            root:'categoryList',
            totalProperty: 'total',
            remoteSort: true,
            fields:['name', 'categoryno']
        })
    });

    categoryCombo.on('select',function(comboBox){
        var value = comboBox.getValue();
        Ext.getCmp('itemCombo').setValue(null);
        itemStore.load({params:{name:value}});//加载商品信息
    });

    //加载商品信息
    var itemStore = new Ext.data.Store({
       proxy: new Ext.data.HttpProxy({url: 'item/searchAvailableItem'}),
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
        mode: 'local',
        minListWidth:250,
        pageSize:5,
        store: itemStore
    });

    var vendorCombo = new Ext.form.ComboBox({
    	id:'vendorCombo',
        hiddenName: 'vendorno',
        valueField: 'vendorno',
        displayField: 'vendorname',
        editable: false,
         emptyText:'请选择供应商',
        triggerAction: 'all',
        width: 150,
        mode: 'remote',
        minListWidth:250,
        pageSize:5,
        store: new Ext.data.JsonStore({
            url: 'vendor/searchVendor',
            root:'vendorList',
            totalProperty: 'total',
            remoteSort: true,
            fields:['vendorno', 'vednorname']
        })
    });

    var warehouseCombo = new Ext.form.ComboBox({
    	id:'warehouseCombo',
        hiddenName: 'warehouseno',
        valueField: 'warehouseno',
        displayField: 'name',
        editable: false,
         emptyText:'请选择仓库',
        triggerAction: 'all',
        width: 150,
        mode: 'remote',
        minListWidth:250,
        pageSize:5,
        store: new Ext.data.JsonStore({
            url: 'warehouse/searchWarehouse',
            root:'warehouseList',
            totalProperty: 'total',
            remoteSort: true,
            fields:['warehouseno', 'name']
        })
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
           items : ['-',categoryCombo,'-',itemCombo,'-',
                    vendorCombo,'-',warehouseCombo,{xtype:'button',text:'查询',  icon : 'ext/imgs/search.gif',handler:function(){search();}} ]
        })
    });

    ds.load({params: {start: 0, limit:27,name:itemName2}});

    ds.on('beforeload', function() {
    	var categoryno = Ext.getCmp("categoryCombo").getRawValue();
        var itemno = Ext.getCmp("itemCombo").getRawValue();
        var vendorno = Ext.getCmp("vendorCombo").getRawValue();
        var warehouseno = Ext.getCmp("warehouseCombo").getRawValue();
         this.baseParams = {start:0,limit:27,
        		 categoryno:categoryno,
        		 itemno:itemno,
        		 vendorno:vendorno,
        		 warehouseno:warehouseno};
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
     var categoryno = Ext.getCmp("categoryCombo").getValue();
     var itemno = Ext.getCmp("itemCombo").getValue();
     var vendorno = Ext.getCmp("vendorCombo").getValue();
     var warehouseno = Ext.getCmp("warehouseCombo").getValue();
     categoryno = categoryno.trim();
     itemno = itemno.trim();
     vendorno = vendorno.trim();
     warehouseno = warehouseno.trim();

     if(categoryno.length<=0 || categoryno.length == ''
    	 || itemno.length<=0 || itemno.length == ''
     	 || vendorno.length<=0 || vendorno.length == ''
     	 || warehouseno.length<=0 || warehouseno.length == ''){
         Ext.Msg.alert('提示','请选择一个你要查询');
     }else{
        Ext.getCmp('searchGrid').getStore().load();
     }
 }

