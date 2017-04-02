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
    var batchAddItemWin = new Ext.Window({
        title : '添加商品',
        width: 1000,
        bodyStyle:"padding:10px;",
        maximizable:false,
        //plain:true,
        resizable : false,
        autoHeight : true,
        modal : true,
        closable:true,
        closeAction : 'hide',
        buttonAlign:"center",
        layout:'fit',
        listeners : {
            'hide' : function(){
                //this.findById('bookName').ownerCt.form.reset();
//                editpasswordForm.getForm().reset();
            }
        },
        html: '<iframe style="width:100%; height:450px;" src="common/addItem.jsp" frameborder="0" scrolling="false"></iframe>',
    });


   var itemName2 = null;

    var sm = new Ext.grid.CheckboxSelectionModel({handleMouseDown:Ext.emptyFn()}); // CheckBox
    var cm = new Ext.grid.ColumnModel([
        new Ext.grid.RowNumberer(), //
        sm,
        {header: "商品编号", dataIndex: 'itemno',width:100,sortable:true,renderer:renderusername},
        {header: "商品名称", dataIndex: 'itemname',width:100,sortable:true,renderer:renderusername},
        {header: "安全库存量", dataIndex: 'safetystock',width:100,sortable:true},
        {header: "当前库存量", dataIndex: 'actualstock',width:100,sortable:true},
        {header: "单价", dataIndex: 'price',width:100,sortable:true},
        {header: "商品类目", dataIndex: 'categoryname',width:100,sortable:true}
    ]);
    //var ds = new Ext.data.Store({
    var ds = new Ext.data.GroupingStore({
        proxy: new Ext.data.HttpProxy({url: 'item/listItem'}),
        reader: new Ext.data.JsonReader({
            totalProperty: 'total',
            root: 'itemList',
            successProperty: 'success'
      }, [
            {name: 'itemno', mapping: 'itemno', type: 'string'},
            {name: 'itemname', mapping: 'itemname', type: 'string'},
            {name: 'safetystock', mapping: 'safetystock', type: 'string'},
            {name: 'actualstock', mapping: 'actualstock', type: 'string'},
            {name: 'price', mapping: 'price', type: 'float'},
            {name: 'categoryname', mapping: 'category.name', type: 'string'}
        ]) ,
        pruneModifiedRecords:true,
        groupField:'categoryname',
        sortInfo:{field:'itemno',direction:"ASC"}
    });

    //var grid = new Ext.grid.GridPanel({
    var grid = new Ext.grid.EditorGridPanel({
        region : 'center',
        id:'itemGrid',
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
                batchAddItemWin.show();
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
                url: 'item/searchItem',
                root:'itemList',
                totalProperty: 'total',
                remoteSort: true,
                fields:['itemname']
            })
        },{xtype:'button',text:'查询',  icon : 'ext/imgs/search.gif',handler:function(){searchadmin();}} ]
        })
    });

    ds.load({params: {start: 0, limit:27,name:itemName2}});

    ds.on('beforeload', function() {
        var itemName2 = Ext.getCmp('comboid').getRawValue();
         this.baseParams = {start:0,limit:27,name:itemName2};
    });

    //表单
    var form1 = new Ext.form.FormPanel({
      title:'添加商品',
      region:'east',
      split:true,
      width:300,
      minSize:100,
      maxSize:200,
      collapsible:true,
      autoHeight:true,
      labelWidth:60,
      labelAlign:'right',
      frame:true,
      items:[itemNameField,saftyStockField,actualStockField,priceField,categoryCombo],

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
                    url:'item/add',
                    method:'post',
                    dataType:'json',
                    // 如果有表单以外的其它参数，可以加在这里。我这里暂时为空，也可以将下面这句省略
                    params:"",
                    // 第一个参数是传入该表单，第二个是Ext.form.Action对象用来取得服务器端传过来的json数据
                      success:function(form,action){
                          Ext.Msg.alert('信息', action.result.message,function(){
                              Ext.getCmp('itemGrid').getStore().reload();
                          });
                      },
                      failure:function(form,action){
                          if(action.failureType == Ext.form.Action.SERVER_INVALID){
                              Ext.Msg.alert('错误','后台检验失败');
                          }else{
                              Ext.Msg.alert('错误','无法访问后台' + action.failureType);
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




   var adminpanel = new Ext.Panel({
       layout:'border',
       items:[grid,form1]
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
                 Ext.getCmp('itemGrid').getStore().load();
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

     /**
      * 表单样式
      */
     var saftyStockField = new Ext.form.TextField({
      fieldLabel:'安全库存',
      name:'safetystock',
      width: 200,
      msgTarget:'side'
    });

     var actualStockField = new Ext.form.TextField({
         fieldLabel:'实际库存',
         name:'actualstock',
         width: 200,
         msgTarget:'side'
       });

     var priceField = new Ext.form.TextField({
         fieldLabel:'单价',
         name:'price',
         width: 200,
         msgTarget:'side'
       });

     var categoryCombo = new Ext.form.ComboBox({
         id:'categoryComboid',
         fieldLabel:'商品类目',
         hiddenName: 'categoryId',
         valueField: 'id',
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
             fields:['id', 'name']
         })
         });








