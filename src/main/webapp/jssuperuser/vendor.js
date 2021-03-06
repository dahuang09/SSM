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
   var username2 = null;

    var sm = new Ext.grid.CheckboxSelectionModel({handleMouseDown:Ext.emptyFn()}); // CheckBox
    var cm = new Ext.grid.ColumnModel([
        new Ext.grid.RowNumberer(), //
        sm,
        {header: "供应商编码", dataIndex: 'vendorno',width:300,sortable:true,renderer:renderusername},
        {header: "供应商名称", dataIndex: 'vendorname',width:300,sortable:true,renderer:renderusername,editor:new Ext.grid.GridEditor(vendornameEditField)},
        {header: "供应商地址", dataIndex: 'address',width:300,sortable:true,renderer:renderusername,editor:new Ext.grid.GridEditor(addressEditField)},
        {header: "供应商电话", dataIndex: 'telno',width:300,sortable:true,renderer:renderusername,editor:new Ext.grid.GridEditor(telnoEditField)},
        {header: "供应商邮箱", dataIndex: 'email',width:300,sortable:true,renderer:renderusername,editor:new Ext.grid.GridEditor(emailEditField)},
        {header: "备注", dataIndex: 'remark',width:300,sortable:true,renderer:renderusername,editor:new Ext.grid.GridEditor(remarkEditField)},
        {header: "传真", dataIndex: 'fax',width:300,sortable:true,renderer:renderusername,editor:new Ext.grid.GridEditor(faxEditField)}

    ]);
    //var ds = new Ext.data.Store({
    var ds = new Ext.data.GroupingStore({
        proxy: new Ext.data.HttpProxy({url: 'vendor/listVendor'}),
        reader: new Ext.data.JsonReader({
            totalProperty: 'total',
            root: 'vendorList',
            successProperty: 'success'
      }, [
            {name: 'vendorno', mapping: 'vendorno', type: 'string'},
            {name: 'vendorname', mapping: 'vendorname', type: 'string'},
            {name: 'address', mapping: 'address', type: 'string'},
            {name: 'telno', mapping: 'telno', type: 'string'},
            {name: 'email', mapping: 'email', type: 'string'},
            {name: 'remark', mapping: 'remark', type: 'string'},
            {name: 'fax', mapping: 'fax', type: 'string'}
        ]) ,
        pruneModifiedRecords:true,
        groupField:'',
        sortInfo:{field:'vendorno',direction:"ASC"}
    });


    //var grid = new Ext.grid.GridPanel({
    var grid = new Ext.grid.EditorGridPanel({
        region : 'center',
        id:'vendorGrid',
        //el:'adminlist',
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
                    url:'vendor/update',
                 success:function(){
                     Ext.Msg.alert('提示','修改成功',function(){ds.reload();});
                 },failure:function(){
                   Ext.Msg.alert('错误','与后台联系的时候出现了问题');
                 },
                 params:{jsonParam:Ext.util.JSON.encode(jsonArray)}
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
                           var rows=Ext.getCmp("vendorGrid").getSelectionModel().getSelections();    //获取选中的行
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
                                             Ext.Msg.alert('成功','删除供应商成功',function(){
                                             var grid = Ext.getCmp('vendorGrid');
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
            hiddenName: 'vendorname',
            valueField: 'vendorname',
            displayField: 'vendorname',
            editable: true,
             emptyText:'请选择供应商名',

            triggerAction: 'all',
            width: 150,
            mode: 'remote',
            minListWidth:250,
            pageSize:5,
            store: new Ext.data.JsonStore({
                url: 'vendor/searchUser',
                root:'vendorlist',
                totalProperty: 'total',
                remoteSort: true,
                fields:['vendorname']
            })
        },{xtype:'button',text:'查询',  icon : 'ext/imgs/search.gif',handler:function(){searchadmin();}} ]
        })
    });

    ds.load({params: {start: 0, limit:27,username:username2}});

    ds.on('beforeload', function() {
        var username2 = Ext.getCmp('comboid').getRawValue();
         this.baseParams = {start:0,limit:27,username:username2};
    });
    //ds.load(/*{params: {start: 0, limit:27}}*/);

    //表单
    var form1 = new Ext.form.FormPanel({
      title:'添加供应商信息',
      region:'east',
      split:true,
      width:300,
      minSize:100,
      maxSize:200,
      collapsible:true,
      autoHeight:true,
      //height:100,
      //width:500,
      labelWidth:60,
      labelAlign:'right',
      frame:true,
      items:[vendorNameField,addressField,telnoField,emailField,remarkField,faxField],
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
                    url:'vendor/add',
                    method:'post',
                    dataType:'json',
                    // 如果有表单以外的其它参数，可以加在这里。我这里暂时为空，也可以将下面这句省略
                    params:"",
                    // 第一个参数是传入该表单，第二个是Ext.form.Action对象用来取得服务器端传过来的json数据
                      success:function(form,action){
                          Ext.Msg.alert('信息', action.result.message,function(){
                              Ext.getCmp('userGrid').getStore().reload();
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
       //renderTo: 'iframepanel',
       layout:'border',
       items:[grid,form1]
   });
     var view = new Ext.Viewport({
    region : 'center',
    layout:'fit',
      items:[adminpanel]
    });

});



     /**
      * 表格样式
      * @param {} value
      * @return {}
      */

     //修改username输出的格式
      function renderusername(value){
          var username = value;
          return "<span style='color:#FF3333;font-weight:bold;'>"+username+"</span>";

      }
      //查询
      function searchadmin(){
         var username = Ext.getCmp("comboid").getValue();
         var username2 = username.trim();
         if(username2.length<=0 || username2.length == ''){
             Ext.Msg.alert('提示','请选择一个你要查询的用户名');
         }else{
                 Ext.getCmp('userGrid').getStore().load();
                   //Ext.getCmp('admingrid').getStore().reload({params:{start : 0,limit : 10,username:username2}});
         }
     }

     /**
      * 表单样式
      */





     var vendorNameField = new Ext.form.TextField({
      fieldLabel:'供应商名称',
      name:'vendorname',
      allowBlank:false,
      emptyText:'空',
      msgTarget:'side'
    });

     var vendornameEditField = new Ext.form.TextField({
         fieldLabel:'供应商名称',
           name:'vendorname',
           allowBlank:false,
           emptyText:'空',
           vtype:'alphanum',
           vtypeText:'',
           msgTarget:'side'
     });

    var addressField = new Ext.form.TextField({
        fieldLabel:'地&nbsp;&nbsp;&nbsp;&nbsp;址',
          name:'address',
          allowBlank:false,
          emptyText:'空',
          msgTarget:'side'
    });
    var addressEditField = new Ext.form.TextField({
        fieldLabel:'地&nbsp;&nbsp;&nbsp;&nbsp;址',
          name:'address',
          allowBlank:false,
          emptyText:'空',
          vtype:'alphanum',
          vtypeText:'',
          msgTarget:'side'
    });



    var telnoField = new Ext.form.TextField({
        fieldLabel: '电话号码',
        name:'telno',
        allowBlank:false,
        emptyText:'空',
        msgTarget:'side'
    });

    var telnoEditField = new Ext.form.TextField({
        fieldLabel:'电话号码',
          name:'telno',
          allowBlank:false,
          emptyText:'空',
          vtype:'alphanum',
          vtypeText:'',
          msgTarget:'side'
    });

    var emailField = new Ext.form.TextField({
        fieldLabel: '邮箱',
        name:'email',
        allowBlank:false,
        emptyText:'空',
        msgTarget:'side'
    });

    var emailEditField = new Ext.form.TextField({
        fieldLabel:'邮箱',
          name:'email',
          allowBlank:false,
          emptyText:'空',
          vtype:'alphanum',
          vtypeText:'',
          msgTarget:'side'
    });
    var remarkField = new Ext.form.TextField({
        fieldLabel: '备注',
        name:'remark',
        allowBlank:false,
        emptyText:'空',
        msgTarget:'side'
    });

    var remarkEditField = new Ext.form.TextField({
        fieldLabel:'备注',
          name:'remark',
          allowBlank:false,
          emptyText:'空',
          vtype:'alphanum',
          vtypeText:'',
          msgTarget:'side'
    });

    var faxField = new Ext.form.TextField({
        fieldLabel: '传真',
        name:'fax',
        allowBlank:false,
        emptyText:'空',
        msgTarget:'side'
    });

    var faxEditField = new Ext.form.TextField({
        fieldLabel:'传真',
          name:'fax',
          allowBlank:false,
          emptyText:'空',
          vtype:'alphanum',
          vtypeText:'',
          msgTarget:'side'
    });
