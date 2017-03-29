Ext.onReady(function(){
    Ext.BKANK_IMAGE_URL = 'ext/resources/images/default/s.gif';
    //使用表单提示
     Ext.QuickTips.init();
     Ext.form.Field.prototype.msgTarget = "side";
    var viewport=new Ext.Viewport({
        layout:'border',
        renderTo:Ext.getBody(),
        frame:'true',
        items:[
               {
                region:'north',
                height:0,
                layout : 'fit',
                split : false,
                collapsible:false,
                 html:'<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="common/top.jsp"></iframe>'
               },
               {region:'center',
               layout : 'fit',
                   border : false,
                //height:800,
                items:[
                       contentPanel=new Ext.TabPanel({
                                                     id:'centerP',
                                                     enableTabScroll:true,//能够滚动收缩
                                                     activeTab:0,//激活第一个标签
                                                     items:[{
                                                            id:'homePage',
                                                            iconCls:'tabs',
                                                            layout:'fit',
                                                            title:'首页',
                                                            autoScroll:true,
                                                            html:'首页'
                                                     }]
                       })
                ]},
               tree,
               {region:'south',/*collapsible:true,*/height:0,html:'<center><font color="red" size="4">order by:joyce zhou</font></center>'}
              ]
    });
});

//皮肤
var themes =
    [
        ['blue', '默认'],
        ['gray', '灰色'],
        ['olive', '橄榄绿'],
        ['darkgray', '暗灰色'],
        ['green', '绿色'],
        ['black', '黑色'],
        ['purple', '紫色'],
        ['chocolate', '咖啡色'],
        ['calista', '混色']
    ];
    var cbThemes = new Ext.form.ComboBox
    ({
        id: 'cbThemes',
        store: themes,
        width: 100,
        typeAhead: true,
        editable:false,
        triggerAction: 'all',
        emptyText:'界面主题',
        selectOnFocus:true
    });
    cbThemes.on
    ({
        "select":function()
                {
                   var css =   cbThemes.getValue();
                   //设置cookies
                   var date=new Date();
                   date.setTime(date.getTime()+30*24*3066*1000);
                   document.getElementsByTagName("link")[1].href="ext/resources/css/xtheme-" + css + ".css";
                   document.cookie="css="+css+";expires="+date.toGMTString();


                   //var sub = document.getElementById('Sub');
                  var subs = document.getElementsByName('Sub');
                  var len = subs.length;
                  for(var i=0;i<len;i++){

                      if (subs[i] && subs[i].contentWindow.Ext) {//验证窗体是否包含Ext

                    subs[i].contentWindow.ChangeTheme('ext/resources/css/xtheme-' + css + '.css');//这是重点注意contentWindow的用法
                }
                  }
                }
    });
    var cookieArr = window.document.cookie.split(";");
                    var css = null;
                    for(var i=0;i<cookieArr.length;i++) {
                    var arr = cookieArr[i].split("=");
                    if(arr[0]=="css") {
                          css = arr[1];
                         }
                    };

                    //alert(css);
                    window.document.getElementsByTagName("link")[1].href="ext/resources/css/xtheme-"+css+ ".css";


   //表单校验
 //校验
       Ext.apply(Ext.form.VTypes, {
           checkoldpassword:function(val,field){
                if(field.confirmTo){
                    var pwd=Ext.get(field.confirmTo);
                    if(val.trim()== pwd.getValue().trim()){
                        return true;
                    }
                    else{
                        return false;
                    }
                    return false;
                  }
           },

     //密码检验
      password:function(val,field){
                if(field.confirmTo){
                    var pwd=Ext.get(field.confirmTo);
                    if(val.trim()== pwd.getValue().trim()){
                        return true;
                    }
                    else{
                        return false;
                    }
                    return false;
                  }
           }
 });


    var reader = new Ext.data.JsonReader({//totalProperty: 'total',
                                        root: 'superuserlist',
                                        successProperty: 'success'},[
                                    {name:'username',type:'string'},
                                    {name:'password',type:'string'}
                                 ]);

                                var editpasswordForm = new Ext.FormPanel({
                                    url : 'editpassword.action',
                                    id:'editpasswordform',
                                    labelAlign : 'left',
                                    labelWidth : 55,
                                    bodyStyle : 'padding:5px',
                                    border : false,
                                    baseCls : 'x-plain',
                                    defaults : {anchor:'90%'},
                                    reader:reader,
                                    items : [
                                       {xtype : 'textfield',fieldLabel : '用户名',name : 'username',disabled:true},
                                      {xtype : 'hidden',fieldLabel : '密码',id:'password',name : 'password'},
                                       {xtype:'textfield', inputType: 'password',fieldLabel:'旧的密码',allowBlank : false,vtype:'checkoldpassword',vtypeText:"旧密码不一致！",confirmTo:'password'},
                                       {
                                          xtype:'textfield',
                                          fieldLabel:'新密码',
                                          name:'newpassword1',
                                          id:'p_NewPassword',
                                          width:150,
                                          minLength:1,
                                          minLengthText:'密码长度最少1位！',
                                          maxLength:20,
                                          maxLengthText:'密码长度最多20位！',
                                          inputType:'password',
                                          vtype:'alphanum',
                                          vtypeText:'只能输入英文字母和数字',
                                          allowBlank:false
                                         },{
                                          xtype:'textfield',
                                          fieldLabel:'确认密码',
                                          name:'operatorConPass',
                                          id:'p_ConfirmPassword',
                                          width:150,
                                          inputType:'password',
                                          vtype:'password',
                                                vtypeText:"两次密码不一致！",
                                                confirmTo:'p_NewPassword',
                                                allowBlank:false
                                         }



                                      ],
                                    buttonAlign : 'right',
                                    minButtonWidth : 70,
                                    buttons : [{
                                        text:'提交',
                                        handler : function(){
                                            if(editpasswordForm.getForm().isValid()){
                                                Ext.Msg.confirm('操作提示','确认修改?',function(btn){
                                                    if('yes' == btn){
                                                        editpasswordForm.getForm().submit({
                                                            success: function(form){
                                                                Ext.Msg.show({
                                                                    title : '成功提示',
                                                                    msg : '修改密码成功',
                                                                    buttons : Ext.Msg.OK,
                                                                    fn:function(){
                                                                        //window_edit.hide();
                                                                        window_edit.hide();
                                                                    }
                                                                });
                                                            },
                                                            failure : function(form,action){
                                                                Ext.Msg.show({
                                                                    title : '错误提示',
                                                                    msg : '修改失败!',
                                                                    buttons : Ext.Msg.OK
                                                                });
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                        }
                                    },{
                                        text : '取消',
                                        handler:function(){
                                            window_edit.hide();
                                        }
                                    }]
                                });

        var window_edit = new Ext.Window({
                                    title : '修改密码',
                                    width : 300,
                                    //height:300,
                                    bodyStyle:"padding:10px;",
                                    maximizable:false,
                                    //plain:true,
                                    resizable : false,
                                    autoHeight : true,
                                    modal : true,
                                    //closable:true,
                                    closeAction : 'hide',
                                    buttonAlign:"center",
                                    layout:'form',
                                    listeners : {
                                        'hide' : function(){
                                            //this.findById('bookName').ownerCt.form.reset();
                                            editpasswordForm.getForm().reset();
                                        }
                                    },
                                    items : [editpasswordForm]
                                });


//左边树形菜单
var tree = new Ext.tree.TreePanel({
        //el:'supertree',
    loader:new Ext.tree.TreeLoader({dataUrl:'js/superusertree.txt'}),
    title:'菜单',
    iconCls:'settings',
    region:'west',
    width:200,
    minSize:100,
    maxSize:250,
    autoScroll:true,
    collapsible:true,
    split:true,
    bbar : [{
                    text : '开始',
                    icon : 'ext/imgs/plugin.gif',
                    //iconCls : 'icon-plugin',
                    menu : new Ext.menu.Menu({
                        items : [{
                            text : '修改密码',
                            icon : 'ext/imgs/edit.png',
                            handler : function() {

                                window_edit.show();
                                  editpasswordForm.getForm().load({url:'superuserlist.action'});
                            }
                        },{
                            text : '关于本系统',
                            icon : 'ext/imgs/info.gif',
                            //iconCls : 'icon-info',
                            handler : function() {
                                new Ext.Window({
                                    closeAction : 'close',
                                    resizable : false,
                                    bodyStyle : 'padding: 7',
                                    modal : true,
                                    title : '关于本系统',
                                    html : '本系统采用目前较为流行的技术实现,<br>前台使用了ExtJs技术,所以实现了跨浏览器<br>' +
                                            '本程序在IE6,IE7,IE8,IE9,chrome,FireFox均测试通过!<br><br>主要技术: Struts2 + hibernate3 + ExtJs3.3.1<br><br>'
                                            + '数&nbsp;&nbsp;据&nbsp;&nbsp;库: MySQL',
                                    width : 300,
                                    height : 200
                                }).show();
                            }
                        }, {
                            text : '退出系统',
                            icon : 'ext/imgs/delete.gif',
                            //iconCls : 'icon-delete',
                            handler : function() {
                                Ext.Msg.confirm('操作提示', '您确定要退出本系统?', function(btn) {
                                    if ('yes' == btn) {
                                        Ext.Ajax.request({
                                            url : 'Logout.action',
                                            success : function() {
                                                location = '/schoolmanagement/index.jsp';
                                            },
                                            failure : function() {
                                                Ext.Msg.show({
                                                    title : '错误提示',
                                                    msg : '退出系统失败!',
                                                    icon : Ext.Msg.ERROR,
                                                    buttons : Ext.Msg.OK
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        }]
                    })
                },'-',cbThemes]

    });





    var root = new Ext.tree.AsyncTreeNode({
        text:'周老板仓库管理菜单'//,
        //id : '0',
        //children :
    });
    tree.setRootNode(root);
    //tree.render();
    //tree.expandAll();// 默认展开全部
    root.expand(true,true);//第一个参数：是否递归展开所有字节点，false只展开第一级节点，第二个参数：是否要动画效果
    tree.on("click", function(node) {
        var nodeId = node.id;
        var n = contentPanel.getComponent(node.id);

        if (nodeId == 1) {
            if (!n) {
                n = contentPanel.add( {
                            'id' : node.id,
                            iconCls:'tabs',
                                'title' : node.text,
                            closable : true,
                            html : '<iframe id="Sub1" name="Sub" scrolling="auto" frameborder="0" width="100%" height="100%" src="common/user.jsp"></iframe>'


                        });
            }
        }

        if (nodeId == 2) {
            if (!n) {
                n = contentPanel.add({
                    //region:'center',
                    'id' : node.id,
                    iconCls:'tabs',
                                'title' : node.text,
                            closable : true,
                            html : '<iframe id="Sub2" name="Sub" scrolling="auto" frameborder="0" width="100%" height="100%" src="common/category.jsp"></iframe>'
                            });
            }
        }
            if (nodeId == 3) {
                if (!n) {
                    n = contentPanel.add( {
                                'id' : node.id,
                                iconCls:'tabs',
                                    'title' : node.text,
                                closable : true,
                                html : '<iframe name="Sub" scrolling="auto" frameborder="0" width="100%" height="100%" src="common/item.jsp"></iframe>'
                                //html : '<iframe scrolling="no" frameborder="0" width="100%" height="575" src="superuser/regionlist.jsp"></iframe>'
                            });
                }
            }
            if (nodeId == 32) {
                if (!n) {
                    n = contentPanel.add( {
                                'id' : node.id,
                                iconCls:'tabs',
                                    'title' : node.text,
                                closable : true,
                                html : '<iframe name="Sub" scrolling="auto" frameborder="0" width="100%" height="100%" src="superuser/flatlistandadd.jsp"></iframe>'
                            });
                }
            }

            if (nodeId == 33) {
                if (!n) {
                    n = contentPanel.add( {
                                'id' : node.id,
                                iconCls:'tabs',
                                    'title' : node.text,
                                closable : true,
                                html : '<iframe name="Sub" scrolling="auto" frameborder="0" width="100%" height="100%" src="superuser/roomlistandadd.jsp"></iframe>'
                            });
                }
            }

            if (nodeId == 41) {
                if (!n) {
                    n = contentPanel.add( {
                                'id' : node.id,
                                iconCls:'tabs',
                                    'title' : node.text,
                                closable : true,
                                html : '<iframe name="Sub" scrolling="auto" frameborder="0" width="100%" height="100%" src="superuser/sdeptgradelist.jsp"></iframe>'
                            });
                }
            }

            if (nodeId == 42) {
                if (!n) {
                    n = contentPanel.add( {
                                'id' : node.id,
                                iconCls:'tabs',
                                    'title' : node.text,
                                closable : true,
                                html : '<iframe name="Sub" scrolling="auto" frameborder="0" width="100%" height="100%" src="superuser/oldsdeptgradelist.jsp"></iframe>'
                            });
                }
            }

            if (nodeId == 51) {
                if (!n) {
                    n = contentPanel.add( {
                                'id' : node.id,
                                iconCls:'tabs',
                                    'title' : node.text,
                                closable : true,
                                html : '<iframe name="Sub" scrolling="auto" frameborder="0" width="100%" height="100%" src="superuser/unroomlist.jsp"></iframe>'
                            });
                }
            }
            if (nodeId == 52) {
                if (!n) {
                    n = contentPanel.add( {
                                'id' : node.id,
                                iconCls:'tabs',
                                    'title' : node.text,
                                closable : true,
                                html : '<iframe name="Sub" scrolling="auto" frameborder="0" width="100%" height="100%" src="superuser/oldunroomlist.jsp"></iframe>'
                            });
                }
            }


            contentPanel.setActiveTab(n);
    });



 /*//表单校验
 //校验
       Ext.apply(Ext.form.VTypes, {
           checkoldpassword:function(val, field) {     //返回true，则验证通过，否则验证失败
          if (field.checkoldpassword) {               //如果表单有使用repetition配置，repetition配置是一个JSON对象，该对象提供了一个名为targetCmpId的字段，该字段指定了需要进行比较的另一个组件ID。
              var cmp = Ext.getCmp(field.checkoldpassword.targetCmpId);   //通过targetCmpId的字段查找组件
             if (Ext.isEmpty(cmp)) {      //如果组件（表单）不存在，提示错误
                  Ext.MessageBox.show({
                      title: '错误',
                      msg: '发生异常错误，指定的组件未找到',
                      icon: Ext.Msg.ERROR,
                     buttons: Ext.Msg.OK
                 });
                return false;
            }

             if (val == cmp.getValue()) {  //取得目标组件（表单）的值，与宿主表单的值进行比较。
                return true;
             } else {
                 return false;
             }
          }

    },
     checkoldpasswordText: '旧的密码不一致',

     //密码检验
      repetition: function(val, field) {     //返回true，则验证通过，否则验证失败
          //if (field.repetition) {               //如果表单有使用repetition配置，repetition配置是一个JSON对象，该对象提供了一个名为targetCmpId的字段，该字段指定了需要进行比较的另一个组件ID。
              //var cmp = Ext.getCmp(field.repetition.targetCmpId);   //通过targetCmpId的字段查找组件

             if (Ext.isEmpty(cmp)) {      //如果组件（表单）不存在，提示错误
                  Ext.MessageBox.show({
                      title: '错误',
                      msg: '发生异常错误，指定的组件未找到',
                      icon: Ext.Msg.ERROR,
                     buttons: Ext.Msg.OK
                 });
                return false;
            }
              var cmp = Ext.getCmp('newpassword1');
             if (val == cmp.getValue()) {  //取得目标组件（表单）的值，与宿主表单的值进行比较。
                return true;
             } else {
                 return false;
            // }
         }
    },
     repetitionText: '密码不一致'
 });*/


