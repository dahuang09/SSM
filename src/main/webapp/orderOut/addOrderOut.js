Ext.onReady(function() {
    var categoryCombo = new Ext.form.ComboBox({
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

          var cum = new Ext.grid.ColumnModel([{
              header: '商品类型',
              dataIndex: 'categoryno',
              editor: new Ext.grid.GridEditor(
                      categoryCombo
                 )
          },{
              header:'商品编号',
              dataIndex: 'itemno',
              editor: new Ext.grid.GridEditor(
                      new Ext.form.ComboBox({
                          id:'itemCombo',
                          hiddenName: 'itemno',
                          valueField: 'itemno',
                          displayField: 'itemname',
                          editable: false,
                           emptyText:'请选择类目',
                          triggerAction: 'all',
                          width: 150,
                          mode: 'local',
                          minListWidth:250,
                          pageSize:5,
                          store: itemStore
                 })),
              }, {
                  header: '出库数目',
                  dataIndex: 'amount',
                  editor: new Ext.grid.GridEditor(
                      new Ext.form.NumberField({
                          allowBlank: false
                      }))
              }]);

        var cumdata = [
            ['', '', '', '','']
        ];

        var store = new Ext.data.Store({
            proxy: new Ext.data.MemoryProxy(cumdata),
            reader: new Ext.data.ArrayReader({}, [
                {name: 'categoryno'},
                {name: 'itemno'},
                {name: 'amount'}
            ])
        });

        var p = new Ext.data.Record({
            categoryno:'',
            itemno: '',
            amount: ''
        });

        store.load();

        var cumgrid = new Ext.grid.EditorGridPanel({
            renderTo: 'addOrderOutGrid',
            store: store,
            height: 600,
            stripeRows: true,
            viewConfig: {
                forceFit: true,
                scrollOffset: 30,
                sortAscText: '升序',
                sortDescText: '降序'
            },
            colModel: cum,
            tbar: new Ext.Toolbar(['-', {
                text: '添加一行',
                handler: function() {
                     cumgrid.stopEditing();
                     store.insert(0, p);
                     cumgrid.startEditing(0, 0);  //激活该行的编辑状态
                }
            }, '-', {
                text: '删除一行',
                handler: function() {
                    Ext.Msg.confirm('信息', '确定要删除', function(btn) {
                        if(btn == 'yes') {
                            var sm = cumgrid.getSelectionModel(); //得到表格的选择模型
                            var cell = sm.getSelectedCell(); //通过选择模型得到选择的单元格
                            var record = store.getAt(cell[0]);  //得到store对应的Record
                            store.remove(record);
                        }
                    });
                }
            }, '-',{
                text:'保存',
                icon : 'ext/imgs/save.jpg',
                handler:function(){
                    var modified = store.modified;
                     var m = modified.slice(0);//m是数组；这两句是复制ds.modified,保证ds.modified中的原始数据不受影响。
                     var jsonArray = [];
                     Ext.each(m,function(item){ //Ext.each(array,fn(item))作用是遍历array，并对每项分别调用fn函数，item为当前遍历的数组元素（当前元素索引）
                        jsonArray.push(item.data);
                    });
                    if(jsonArray.length!=0){
                        Ext.Ajax.request({
                        url:'orderOut/addOrderOuts',
                     success:function(){
                         Ext.Msg.alert('信息','入库单已成功创建',function(){});
                     },failure:function(){
                       Ext.Msg.alert('错误','与后台联系的时候出现了问题');
                     },
                     params:{jsonParam:Ext.util.JSON.encode(jsonArray)}
                    });
                    }else{
                        Ext.Msg.alert('提示','你没有修改过任何信息');
                    }
                }
            }])
        });
});
