Ext.f=function(){ 
           return{

              init:function(){
            	  var regioncombo = new Ext.form.ComboBox({
				            id:'regioncomboid1',
				            //fieldLabel:'区名',
				            applyTo:'regionname',
				            hiddenName: 'regionid',   
				            valueField: 'regionid',   
				            displayField: 'regionname',  
				            editable: false,
				            //editable: false, 
				             emptyText:'请选择区名',
				            //allowBlank:false,   
				           // blankText    :'请选择区名',   
				            //msgTarget :'qtip',   
				            triggerAction: 'all',   
				            width: 100,   
				            mode: 'remote',   
				            minListWidth:250,   
				            pageSize:5,   
				            store: new Ext.data.JsonStore({
				                url: 'checkregion.action',    
				                root:'regionlist',    
				                totalProperty: 'total',    
				                remoteSort: true,  
				                fields:['regionid', 'regionname']   
				            })
				     });
               
				     regioncombo.on('select',function(comboBox){
				      Ext.getCmp('flatcomboid1').setValue(null);
				      flatStore.load();//加载栋
				    });
				    
				     var readerflat = new Ext.data.JsonReader({
					        root: 'flatlist', id: 'flatlist', totalProperty: 'total',
					        fields:['flatid', 'flatname']
					                });
					
					    
					    //栋数据源
					     var flatStore = new Ext.data.Store({
					        proxy: new Ext.data.HttpProxy({
					           url: 'checkflat.action'
					        }),
					        reader: readerflat,
					        remoteSort: true
					        //baseParams: { start:0,limit: 10} 
					    });
					
					    flatStore.on("beforeload", function() {
					    	var regionid1 = Ext.getCmp("regioncomboid1").getValue();
					    	
					        flatStore.baseParams = { start:0,limit: 10,regionid: regionid1 };
					    });
					
					    var flatcombo = new Ext.form.ComboBox({
					            id:'flatcomboid1',
					            applyTo:'flatname',
					            //fieldLabel:'区名',
					            hiddenName: 'flatid',   
					            valueField: 'flatid',   
					            displayField: 'flatname',  
					            editable: false,
					            //editable: false, 
					             emptyText:'请选择栋名',
					            //allowBlank : false,   
					           // blankText    :'请选择区名',   
					            //msgTarget :'qtip',   
					            triggerAction: 'all',   
					            width: 100,   
					            mode: 'remote',   
					            minListWidth:250,   
					            pageSize:10,   
					            store: flatStore
					     });
					     
					     var field1 = new Ext.form.NumberField({
								  name:'roomid',
								  id:'roomid1',
								  applyTo:'room',
								  emptyText:'空',
								  width:100,
								  //vtype:'numberfield',
								  allowNegative:false,//不能输入负号
								  allowDecimals:false,//不能输入小数点
								  maskRe:/\d/
								});
					     
					     /*//提交按钮
					     var submit = new Ext.Button({
					        text:'查询',
					        applyTo:'submit',
					        handler:function(){
        		                var regionid1 = Ext.getCmp("regioncomboid1").getValue();
        		                var flatid1 = Ext.getCmp("flatcomboid1").getValue();
        		                var roomid = Ext.getCmp("roomid1").getRawValue();
        		               
        		                Ext.get('result').getUpdater().update({
        		                url:'../schoolmanagement/result.jsp?regionid='+regionid1+'&flatid='+flatid1+'&roomid='+roomid,
        		                script:true
        		                });
        	                  }
					     });*/
              }

           };

       }();
     

       Ext.onReady(Ext.f.init,Ext.f);
 