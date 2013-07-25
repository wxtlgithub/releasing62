Ext.namespace('Js.Center.Business.SvcBlacklistAdd');Ext.QuickTips.init();Js.Center.Business.SvcBlacklistAdd.func=function(){Js.Center.Common.BusinessGatewayStore.reload();if(Js.Center.Business.SvcBlacklistAdd.window==null){var addByFilePanel=new Ext.form.FormPanel({title:"文件方式",width:600,border:false,fileUpload:true,frame:true,labelWidth:80,defaults:{msgTarget:"side"},items:[{xtype:"hidden",name:"blacktype",value:6},{xtype:"lovcombo",name:"numgwid",fieldLabel:"<font color=red>网关名称</font>",emptyText:'-=请选择=-',hiddenName:"numgwid",readOnly:true,mode:"local",isNeedDefaultChoose:false,store:Js.Center.Common.BusinessGatewayStore,triggerAction:'all',selectOnFocus:true,displayField:'vc2gatewayname',valueField:'numgwid',allowBlank:false,width:500,expandSelect:function(){var c=[];c=this.getRawValue().split(this.separator);var snapshot=this.store.snapshot||this.store.data;var displayField=this.displayField;var isTrue=false;if(this.getRawValue().indexOf(this.separator)>-1){snapshot.each(function(r){isTrue=false;for(var i=0;i<c.length;i++){if(r.get(displayField)==c[i].replace(/(^\s*)|(\s*$)/g,"")){isTrue=true;break}}r.set(this.checkField,isTrue)},this)}else if(this.getRawValue()!=""){snapshot.each(function(r){isTrue=false;if(r.get(displayField)==c){isTrue=true}r.set(this.checkField,isTrue)},this)}else{snapshot.each(function(r){r.set(this.checkField,false);if(r.get(this.valueField)==''){this.store.removeAt(this.store.indexOf(r))}},this)}this.store.data=snapshot},blankText:"网关名称必选"},{xtype:'fileuploadfield',name:'mobilefile',fieldLabel:WXTL.Common.help.MOBILEFILE,allowBlank:false,blankText:"请选择上传文件",width:500,validator:function(){var filePath=mainForm.items.items[2].getValue();if(filePath!=''){mainForm.items.items[3].el.dom.value=getFileMessage(filePath);if(checkFile(filePath)!=''){this.invalidText=checkFile(filePath);return false}else{return true}}else return false}},{xtype:'textarea',name:'filemessage',fieldLabel:'文件信息',readOnly:true,width:500,height:80},{xtype:'hidden',name:'flag',value:'insertbyfile'},{xtype:'textarea',name:'remark',fieldLabel:'<font color=red>原因备注</font>',width:500,height:80,allowBlank:false,blankText:"备注不能为空",maxLength:200,maxLengthText:"请输入小于200字"}]});var addByListPanel=new Ext.form.FormPanel({title:"列表方式",width:600,border:false,frame:true,labelWidth:80,defaults:{msgTarget:"side"},items:[{xtype:"hidden",name:"blacktype",value:6},{xtype:"lovcombo",name:"numgwid",id:"Js.center.business.lovcombo.bwlist",fieldLabel:"<font color=red>网关名称</font>",hiddenName:"numgwid",readOnly:true,mode:"local",store:Js.Center.Common.BusinessGatewayStore,triggerAction:'all',selectOnFocus:true,width:300,emptyText:'-=请选择=-',displayField:'vc2gatewayname',valueField:'numgwid',allowBlank:false,expandSelect:function(){var c=[];c=this.getRawValue().split(this.separator);var snapshot=this.store.snapshot||this.store.data;var displayField=this.displayField;var isTrue=false;if(this.getRawValue().indexOf(this.separator)>-1){snapshot.each(function(r){isTrue=false;for(var i=0;i<c.length;i++){if(r.get(displayField)==c[i].replace(/(^\s*)|(\s*$)/g,"")){isTrue=true;break}}r.set(this.checkField,isTrue)},this)}else if(this.getRawValue()!=""){snapshot.each(function(r){isTrue=false;if(r.get(displayField)==c){isTrue=true}r.set(this.checkField,isTrue)},this)}else{snapshot.each(function(r){r.set(this.checkField,false);if(r.get(this.valueField)==''){this.store.removeAt(this.store.indexOf(r))}},this)}this.store.data=snapshot;},blankText:"网关名称必选"},{xtype:'textarea',name:'mobilelist',fieldLabel:WXTL.Common.help.MOBILELIST,width:300,height:100,allowBlank:false,blankText:"请输入手机号码列表",validator:function(value){return checkMobileList(value,1000)}},{xtype:'textarea',name:'remarklist',fieldLabel:'<font color=red>原因备注</font>',width:300,height:100,allowBlank:false,blankText:"备注不能为空",maxLength:200,maxLengthText:"请输入小于200字"},{xtype:'hidden',name:'flag',value:'insertbylist'}]});var mainForm=addByFilePanel.getForm();var tabPanel=new Ext.TabPanel({height:300,border:false,width:650,activeTab:0,animScroll:true,enableTabScroll:true,items:[addByFilePanel,addByListPanel],listeners:{"tabchange":function(TabPanel,Panel){if(Js.Center.Business.SvcBlacklistAdd.window){mainForm=Panel.getForm();Js.Center.Business.SvcBlacklistAdd.window.mainForm=mainForm}}}});this.window=new WXTL.Widgets.CommonWindows.Window({title:"添加通道黑名单",mainForm:mainForm,updateURL:Js.Center.Business.SvcBlackUpdateURL,displayStore:Js.Center.Business.SvcBlacklistAdd.Infostore,items:[tabPanel],listeners:{"show":function(){Js.Center.Business.SvcBlacklistAdd.window.items.items[0].setActiveTab(0);Js.Center.Business.SvcBlacklistAdd.window.items.items[0].items.items[0].getForm().reset();Js.Center.Business.SvcBlacklistAdd.window.items.items[0].items.items[1].getForm().reset()}}})}};Ext.namespace('Js.Center.Business.SvcBlacklistAdd');Js.Center.Business.SvcBlacklistAdd.info=function(node){if(Ext.get("Js.Center.Business.SvcBlacklistAdd.MainPanel")==null){var _pageSize=12;Js.Center.Business.SvcBlacklistAdd.Infostore=new WXTL.Widgets.CommonData.GroupingStore({proxy:new Ext.data.HttpProxy({url:Js.Center.Business.SvcBlackURL,method:"POST"}),reader:new Ext.data.JsonReader({fields:["numlogid","vc2gatewayname","vc2svcname","numdataid","numstate","vc2departname","numlogid","vc2columnname","numtotalnum","numsuccessnum","numfailed","vc2username","datcreattime","numlisttype","vc2remark","numgwcount","numsvcid"],root:"data",id:"numlogid",totalProperty:"totalCount"}),sortInfo:{field:'datcreattime',direction:'DESC'},baseParams:{flag:'selectlog',datcreattimestart:Ext.util.Format.date(WXTL.Common.dateTime.addDay(WXTL.Common.dateTime.getNow(),-7),'Y-m-d'),datcreattimeend:Ext.util.Format.date(WXTL.Common.dateTime.getNow(),'Y-m-d'),numgwid:'',vc2username:'',numtypeid:'6,7'}});Js.Center.Business.SvcBlacklistAdd.Infostore.load({params:{start:0,limit:_pageSize}});var sm=new Ext.grid.CheckboxSelectionModel({dataIndex:"numlogid"});var cm=new Ext.grid.ColumnModel([{header:"网关名称",tooltip:"网关名称",dataIndex:"vc2gatewayname",renderer:function(value,meta,record,rowIndex,colIndex,store){var name=record.data.vc2gatewayname;if(name!=""&&name!=null){return name}else{var numlisttype=record.data.numlisttype;if(numlisttype==6){return"多网关批量添加"}if(numlisttype==7){return"多网关批量退出"}}},sortable:true},{header:"操作部门",tooltip:"操作部门",dataIndex:"vc2departname",sortable:true},{header:"总数",tooltip:"总数",dataIndex:"numtotalnum",sortable:true,renderer:function(value,meta,record,rowIndex,colIndex,store){var numsvcid=record.data.numsvcid;if(value>0&&numsvcid!=-1){return"<a href='#' onclick='exportData(\""+Js.Center.Business.SvcBlackURL+"\",\"id="+record.data.numlogid+"&flag=selectdesc&successtype=-1\")'>"+value+"</a>"}else{return value}}},{header:"成功数",tooltip:"成功数",dataIndex:"numsuccessnum",sortable:true,renderer:function(value,meta,record,rowIndex,colIndex,store){var numsvcid=record.data.numsvcid;if(value>0&&numsvcid!=-1){return"<a href='#' onclick='exportData(\""+Js.Center.Business.SvcBlackURL+"\",\"id="+record.data.numlogid+"&flag=selectdesc&successtype=1\")'>"+value+"</a>"}else{return value}}},{header:"失败数",tooltip:"失败数",dataIndex:"numfailed",sortable:true,renderer:function(value,meta,record,rowIndex,colIndex,store){var numsvcid=record.data.numsvcid;if(value>0&&numsvcid!=-1){return"<a href='#' onclick='exportData(\""+Js.Center.Business.SvcBlackURL+"\",\"id="+record.data.numlogid+"&flag=selectdesc&successtype=0\")'>"+value+"</a>"}else{return value}}},{header:"处理状态",tooltip:"处理状态",dataIndex:"numstate",sortable:true},{header:"操作类型",tooltip:"操作类型",dataIndex:"numlisttype",sortable:true,renderer:function(value){if(value==6){return"添加通道黑名单"}if(value==7){return"退出通道黑名单"}}},{header:"操作人",tooltip:"操作人",dataIndex:"vc2username",sortable:true},{header:"操作备注",tooltip:"操作备注",dataIndex:"vc2remark",renderer:function(value){return"<font qtip='"+value+"'>"+value+"</font>"},sortable:true},{header:"操作时间",tooltip:"操作时间",dataIndex:"datcreattime",sortable:true},{header:"查看详细",tooltip:"查看详细",renderer:function(value,meta,record,rowIndex,colIndex,store){var numsvcid=record.data.numsvcid;if(numsvcid==-1){return"<a href='#' onclick='Js.Center.Business.SvcBlacklistGwNumDetail.func(\""+record.data.numlogid+"\")'>详细</a>"}else{return"详细"}},sortable:true}]);var AddBlackListArrInitLoadFunc=new Array();AddBlackListArrInitLoadFunc[0]="Js.Center.Business.SvcBlacklistAdd.func";AddBlackListArrInitLoadFunc[1]="Js.Center.Business.SvcBlacklistDelete.func";var userGroupGrid=new WXTL.Widgets.CommonGrid.GridPanel({id:"SvcBlacklistAddGridPanel",anchor:'100% 100%',pageSize:_pageSize,store:Js.Center.Business.SvcBlacklistAdd.Infostore,otherInitLoadFunc:AddBlackListArrInitLoadFunc,needMenu:false,needRightMenu:false,sm:sm,cm:cm,tbar:new Ext.Toolbar({items:[{iconCls:'addicon',text:"添加",handler:function(){Js.Center.Business.SvcBlacklistAdd.window.show()}},{iconCls:'deleteicon',text:"退出",handler:function(){Js.Center.Business.SvcBlacklistDelete.window.show()}}]})});Js.Center.Common.UserGroupStore.reload();var selectPanel=new WXTL.Widgets.CommonPanel.QueryFormPanel({id:"SvcBlacklistAddSelectPanel",queryMethod:"Js.Center.Business.SvcBlacklistAdd.queryGrid",bodyStyle:"padding:10px 0 10px 15px",items:[{layout:'column',items:[{columnWidth:.5,layout:'form',defaultType:"textfield",defaults:{anchor:"90%",msgTarget:"side"},buttonAlign:"center",items:[{xtype:"datefield",fieldLabel:"开始时间",format:'Y-m-d',labelWidth:100,readOnly:true,emptyText:Ext.util.Format.date(WXTL.Common.dateTime.addDay(WXTL.Common.dateTime.getNow(),-7),'Y-m-d'),fieldLabel:"开始时间",name:"datcreattimestart",id:"SvcBlacklistAdddatcreattimestart",validateOnBlur:false,validator:function(){var strat_time=Ext.get("SvcBlacklistAdddatcreattimestart").dom.value;var end_time=Ext.get("SvcBlacklistAdddatcreattimeend").dom.value;if(strat_time<=end_time){return true}else{return false}},invalidText:'结束时间不能小于开始时间！'},{xtype:"combo",name:"numtype",fieldLabel:"操作类型",hiddenName:"SvcBlacklistAddinfovc2type",blankText:"-=请选择=-",readOnly:true,mode:"local",displayField:"vc2name",valueField:"value",triggerAction:"all",emptyText:'-=请选择=-',value:"6,7",store:new Ext.data.SimpleStore({fields:["vc2name","value"],data:[["-=请选择=-","6,7"],["添加通道黑名单","6"],["退出通道黑名单","7"]]})}]},{columnWidth:.5,layout:'form',defaultType:"textfield",defaults:{anchor:"90%",msgTarget:"side"},buttonAlign:"center",items:[{xtype:"datefield",fieldLabel:"结束时间",labelWidth:100,format:'Y-m-d',readOnly:true,emptyText:Ext.util.Format.date(WXTL.Common.dateTime.getNow(),'Y-m-d'),name:"datcreattimeend",id:"SvcBlacklistAdddatcreattimeend",validateOnBlur:false,validator:function(){var strat_time=Ext.get("SvcBlacklistAdddatcreattimestart").dom.value;var end_time=Ext.get("SvcBlacklistAdddatcreattimeend").dom.value;if(strat_time<=end_time){return true}else{return false}},invalidText:'结束时间不能小于开始时间！'},{xtype:"xComboBox",name:"svcnumgwid",fieldLabel:"网关名称",hiddenName:"svcnumgwid",mode:"local",store:Js.Center.Common.BusinessGatewayStore,triggerAction:'all',selectOnFocus:true,emptyText:'-=请选择=-',displayField:'vc2gatewayname',valueField:'numgwid',allowBlank:true,blankText:"网关名称必选"}]}]}]});Js.Center.Business.SvcBlacklistAdd.queryGrid=function(){if(selectPanel.getForm().isValid()){var datCreatTimeStart=Ext.get("SvcBlacklistAdddatcreattimestart").getValue();var datCreatTimeend=Ext.get("SvcBlacklistAdddatcreattimeend").getValue();var _numgwid=Ext.get("svcnumgwid").getValue();var numTypeId=Ext.get("SvcBlacklistAddinfovc2type").getValue();var flag='selectlog';Js.Center.Business.SvcBlacklistAdd.Infostore.baseParams={flag:flag,numtypeid:numTypeId,datcreattimestart:datCreatTimeStart,datcreattimeend:datCreatTimeend,numgwid:_numgwid};Js.Center.Business.SvcBlacklistAdd.Infostore.load({params:{start:0,limit:_pageSize}})}};Js.Center.Business.SvcBlacklistAdd.MainPanel=new Ext.Panel({id:"Js.Center.Business.SvcBlacklistAdd.MainPanel",frame:true,bodyBorder:false,border:false,autoScroll:true,layout:"anchor",defaults:{collapsible:true},items:[selectPanel,userGroupGrid]})};GridMain(node,Js.Center.Business.SvcBlacklistAdd.MainPanel,"openroomiconinfo","Js.Center.Business.SvcBlacklistAdd.Infostore")};Ext.namespace('Js.Center.Business.SvcBlacklistDelete');Ext.QuickTips.init();Js.Center.Business.SvcBlacklistDelete.func=function(){if(Js.Center.Business.SvcBlacklistDelete.window==null){var addByFilePanel=new Ext.form.FormPanel({title:"文件方式",width:600,border:false,fileUpload:true,frame:true,labelWidth:80,defaults:{msgTarget:"side"},items:[{xtype:"hidden",name:"blacktype",value:7},{xtype:"lovcombo",name:"numgwid",fieldLabel:"<font color=red>网关名称</font>",hiddenName:"numgwid",readOnly:true,mode:"local",store:Js.Center.Common.BusinessGatewayStore,triggerAction:'all',selectOnFocus:true,emptyText:'-=请选择=-',displayField:'vc2gatewayname',valueField:'numgwid',allowBlank:false,expandSelect:function(){var c=[];c=this.getRawValue().split(this.separator);var snapshot=this.store.snapshot||this.store.data;var displayField=this.displayField;var isTrue=false;if(this.getRawValue().indexOf(this.separator)>-1){snapshot.each(function(r){isTrue=false;for(var i=0;i<c.length;i++){if(r.get(displayField)==c[i].replace(/(^\s*)|(\s*$)/g,"")){isTrue=true;break}}r.set(this.checkField,isTrue)},this)}else if(this.getRawValue()!=""){snapshot.each(function(r){isTrue=false;if(r.get(displayField)==c){isTrue=true}r.set(this.checkField,isTrue)},this)}else{snapshot.each(function(r){r.set(this.checkField,false);if(r.get(this.valueField)==''){this.store.removeAt(this.store.indexOf(r))}},this)}this.store.data=snapshot},width:500,blankText:"网关名称必选"},{xtype:'fileuploadfield',name:'mobilefile',fieldLabel:WXTL.Common.help.MOBILEFILE,allowBlank:false,blankText:"请选择上传文件",width:500,validator:function(){var filePath=mainForm.items.items[2].getValue();if(filePath!=''){mainForm.items.items[3].el.dom.value=getFileMessage(filePath);if(checkFile(filePath)!=''){this.invalidText=checkFile(filePath);return false}else{return true}}else return false}},{xtype:'textarea',name:'filemessage',fieldLabel:'文件信息',readOnly:true,width:500,height:80},{xtype:'textarea',name:'remark',fieldLabel:'<font color=red>原因备注</font>',width:500,height:100,allowBlank:false,blankText:"备注不能为空",maxLength:200,maxLengthText:"请输入小于200字"},{xtype:'hidden',name:'flag',value:'deletebyfile'}]});var addByListPanel=new Ext.form.FormPanel({title:"列表方式",width:600,border:false,frame:true,labelWidth:80,defaults:{msgTarget:"side"},items:[{xtype:"hidden",name:"blacktype",value:7},{xtype:"lovcombo",name:"numgwid",fieldLabel:"网关名称",hiddenName:"numgwid",readOnly:true,mode:"local",store:Js.Center.Common.BusinessGatewayStore,triggerAction:'all',selectOnFocus:true,emptyText:'-=请选择=-',displayField:'vc2gatewayname',valueField:'numgwid',width:300,expandSelect:function(){var c=[];c=this.getRawValue().split(this.separator);var snapshot=this.store.snapshot||this.store.data;var displayField=this.displayField;var isTrue=false;if(this.getRawValue().indexOf(this.separator)>-1){snapshot.each(function(r){isTrue=false;for(var i=0;i<c.length;i++){if(r.get(displayField)==c[i].replace(/(^\s*)|(\s*$)/g,"")){isTrue=true;break}}r.set(this.checkField,isTrue)},this)}else if(this.getRawValue()!=""){snapshot.each(function(r){isTrue=false;if(r.get(displayField)==c){isTrue=true}r.set(this.checkField,isTrue)},this)}else{snapshot.each(function(r){r.set(this.checkField,false);if(r.get(this.valueField)==''){this.store.removeAt(this.store.indexOf(r))}},this)}this.store.data=snapshot},allowBlank:false,blankText:"网关名称必选"},{xtype:'textarea',name:'mobilelist',fieldLabel:WXTL.Common.help.MOBILELIST,width:300,height:100,allowBlank:false,blankText:"请输入手机号码列表",validator:function(value){return checkMobileList(value,1000)}},{xtype:'textarea',name:'remarklist',fieldLabel:'<font color=red>原因备注</font>',width:300,height:100,allowBlank:false,blankText:"备注不能为空",maxLength:200,maxLengthText:"请输入小于200字"},{xtype:'hidden',name:'flag',value:'deletebylist'}]});var mainForm=addByFilePanel.getForm();var tabPanel=new Ext.TabPanel({height:300,border:false,width:650,activeTab:0,animScroll:true,enableTabScroll:true,items:[addByFilePanel,addByListPanel],listeners:{"tabchange":function(TabPanel,Panel){if(Js.Center.Business.SvcBlacklistDelete.window){mainForm=Panel.getForm();Js.Center.Business.SvcBlacklistDelete.window.mainForm=mainForm}}}});this.window=new WXTL.Widgets.CommonWindows.Window({title:"退出通道黑名单",iconCls:'deleteicon',mainForm:mainForm,updateURL:Js.Center.Business.SvcBlackUpdateURL,displayStore:Js.Center.Business.SvcBlacklistAdd.Infostore,items:[tabPanel],listeners:{"show":function(){Js.Center.Business.SvcBlacklistDelete.window.items.items[0].setActiveTab(0);Js.Center.Business.SvcBlacklistDelete.window.items.items[0].items.items[0].getForm().reset();Js.Center.Business.SvcBlacklistDelete.window.items.items[0].items.items[1].getForm().reset()}}})}};Ext.namespace('Js.Center.Business.SvcBlacklistDelete');Js.Center.Business.SvcBlacklistDelete.info=function(node){if(Ext.get("Js.Center.Business.SvcBlacklistDelete.MainPanel")==null){Js.Center.Common.ServiceCodeStore.reload();var _pageSize=12;Js.Center.Business.SvcBlacklistDelete.Infostore=new WXTL.Widgets.CommonData.GroupingStore({proxy:new Ext.data.HttpProxy({url:Js.Center.Business.SvcBlackURL,method:"POST"}),reader:new Ext.data.JsonReader({fields:["numsvcid","vc2backuppath","vc2mode","numdepartid","numlogid","numuserid","datcreattime","datmodifytime","numtotalnum","numsuccessnum","vc2filename","numlisttype","numsrc","vc2username","vc2departname","numstate","vc2svcname"],root:"data",id:"numlogid",totalProperty:"totalCount"}),baseParams:{flag:'selectlog',datcreattimestart:Ext.util.Format.date(WXTL.Common.dateTime.addDay(WXTL.Common.dateTime.getNow(),-7),'Y-m-d'),datcreattimeend:Ext.util.Format.date(WXTL.Common.dateTime.getNow(),'Y-m-d'),numsvcid:'',vc2username:'',numtypeid:3}});Js.Center.Business.SvcBlacklistDelete.Infostore.load({params:{start:0,limit:_pageSize}});var sm=new Ext.grid.CheckboxSelectionModel({dataIndex:"numlogid"});var cm=new Ext.grid.ColumnModel([{header:"业务名称",tooltip:"业务名称",dataIndex:"vc2svcname",sortable:true},{header:"部门名称",tooltip:"部门名称",dataIndex:"vc2departname",sortable:true},{header:"总数",tooltip:"总数",dataIndex:"numtotalnum",sortable:true},{header:"成功数",tooltip:"成功数",dataIndex:"numsuccessnum",sortable:true},{header:"处理状态",tooltip:"处理状态",dataIndex:"numstate",sortable:true},{header:"操作人",tooltip:"操作人",dataIndex:"vc2username",sortable:true},{header:"操作时间",tooltip:"操作时间",dataIndex:"datcreattime",sortable:true},{header:"操作",tooltip:"操作",dataIndex:"numsvcid",width:50,renderer:function(value,meta,record,rowIndex,colIndex,store){return"<a href='#' onclick='doLoad(\""+Js.Center.Business.SvcBlackURL+"\",\""+record.data.numlogid+"\")'>详情下载</a>"}}]);var userGroupGrid=new WXTL.Widgets.CommonGrid.GridPanel({id:"SvcBlacklistDeleteGridPanel",anchor:'100% 100%',pageSize:_pageSize,store:Js.Center.Business.SvcBlacklistDelete.Infostore,needMenu:false,needRightMenu:false,sm:sm,cm:cm,tbar:new Ext.Toolbar({items:[{iconCls:'deleteicon',text:"退出黑名单",handler:function(){Js.Center.Business.SvcBlacklistDelete.func()}}]})});Js.Center.Common.UserGroupStore.reload();var selectPanel=new WXTL.Widgets.CommonPanel.QueryFormPanel({id:"SvcBlacklistDeleteSelectPanel",queryMethod:"Js.Center.Business.SvcBlacklistDelete.queryGrid",items:[{layout:'column',items:[{columnWidth:.5,layout:'form',defaultType:"textfield",defaults:{anchor:"90%",msgTarget:"side"},buttonAlign:"center",bodyStyle:"padding:10px 0 10px 15px",items:[{xtype:"datefield",fieldLabel:"开始时间",format:'Y-m-d',labelWidth:100,bodyStyle:'padding:5px 5px 0',readOnly:true,emptyText:Ext.util.Format.date(WXTL.Common.dateTime.addDay(WXTL.Common.dateTime.getNow(),-7),'Y-m-d'),fieldLabel:"开始时间",name:"datcreattimestart",id:"SvcBlacklistDeletedatcreattimestart",validateOnBlur:false,validator:function(){var strat_time=Ext.get("SvcBlacklistDeletedatcreattimestart").dom.value;var end_time=Ext.get("SvcBlacklistDeletedatcreattimeend").dom.value;if(strat_time<=end_time){return true}else{return false}},invalidText:'结束时间不能小于开始时间！'},{xtype:"xComboBox",name:"numsvcid",fieldLabel:"选择业务",hiddenName:"SvcBlacklistDeletenumsvcid",readOnly:true,mode:"local",displayField:"vc2svcname",valueField:"numsvcid",triggerAction:"all",store:Js.Center.Common.ServiceCodeStore}]},{columnWidth:.5,layout:'form',defaultType:"textfield",defaults:{anchor:"90%",msgTarget:"side"},buttonAlign:"center",bodyStyle:"padding:10px 0 10px 15px",items:[{xtype:"datefield",fieldLabel:"结束时间",labelWidth:100,format:'Y-m-d',bodyStyle:'padding:5px 5px 0',readOnly:true,emptyText:Ext.util.Format.date(WXTL.Common.dateTime.getNow(),'Y-m-d'),name:"datcreattimeend",id:"SvcBlacklistDeletedatcreattimeend",validateOnBlur:false,validator:function(){var strat_time=Ext.get("SvcBlacklistDeletedatcreattimestart").dom.value;var end_time=Ext.get("SvcBlacklistDeletedatcreattimeend").dom.value;if(strat_time<=end_time){return true}else{return false}},invalidText:'结束时间不能小于开始时间！'}]}]}]});Js.Center.Business.SvcBlacklistDelete.queryGrid=function(){if(selectPanel.getForm().isValid()){var datCreatTimeStart=Ext.get("SvcBlacklistDeletedatcreattimestart").getValue();var datCreatTimeend=Ext.get("SvcBlacklistDeletedatcreattimeend").getValue();var _numsvcid=Ext.get("SvcBlacklistDeletenumsvcid").getValue();var flag='selectlog';Js.Center.Business.SvcBlacklistDelete.Infostore.baseParams={flag:flag,numtypeid:3,datcreattimestart:datCreatTimeStart,datcreattimeend:datCreatTimeend,numsvcid:_numsvcid};Js.Center.Business.SvcBlacklistDelete.Infostore.load({params:{start:0,limit:_pageSize}})}};Js.Center.Business.SvcBlacklistDelete.MainPanel=new Ext.Panel({id:"Js.Center.Business.SvcBlacklistDelete.MainPanel",frame:true,bodyBorder:false,border:false,autoScroll:true,layout:"anchor",defaults:{collapsible:true},items:[selectPanel,userGroupGrid]})};GridMain(node,Js.Center.Business.SvcBlacklistDelete.MainPanel,"openroomiconinfo","Js.Center.Business.SvcBlacklistDelete.Infostore")};Ext.namespace("Js.Center.Business.SvcBlacklistGwNumDetail");Js.Center.Business.SvcBlacklistGwNumDetail.func=function(value){var pageSizeSum=12;Js.Center.Business.SvcBlacklistGwNumDetail.GwSuccnumGridStore=new WXTL.Widgets.CommonData.GroupingStore({proxy:new Ext.data.HttpProxy({url:Js.Center.Business.SvcBlackListGwsURL,method:"POST"}),reader:new Ext.data.JsonReader({fields:["numgwid","numtotalnum","numsuccessnum","vc2gatewayname","numfaliednum","numlogid"],root:"data",id:"numgwid",totalProperty:"totalCount"}),sortInfo:{field:'numgwid',direction:'DESC'},baseParams:{flag:'querygwsuccnumbylogid',numlogid:value}});Js.Center.Business.SvcBlacklistGwNumDetail.GwSuccnumGridStore.load({params:{start:0,limit:pageSizeSum}});var sm=new Ext.grid.CheckboxSelectionModel({dataIndex:"numgwid"});var cm=new Ext.grid.ColumnModel([{header:"网关编号",tooltip:"网关编号",dataIndex:"numgwid",sortable:true},{header:"网关名称",tooltip:"网关名称",dataIndex:"vc2gatewayname",sortable:true},{header:"总数",tooltip:"总数",dataIndex:"numtotalnum",renderer:function(value,meta,record,rowIndex,colIndex,store){if(value>0){return"<a href='#' onclick='exportData(\""+Js.Center.Business.SvcBlackListGwsURL+"\",\"id="+record.data.numlogid+"&numgwid="+record.data.numgwid+"&flag=selectgwdesc&successtype=-1\")'>"+value+"</a>"}else{return value}},sortable:true},{header:"成功数",tooltip:"成功数",dataIndex:"numsuccessnum",renderer:function(value,meta,record,rowIndex,colIndex,store){if(value>0){return"<a href='#' onclick='exportData(\""+Js.Center.Business.SvcBlackListGwsURL+"\",\"id="+record.data.numlogid+"&numgwid="+record.data.numgwid+"&flag=selectgwdesc&successtype=1\")'>"+value+"</a>"}else{return value}},sortable:true},{header:"失败数",tooltip:"失败数",dataIndex:"numfaliednum",renderer:function(value,meta,record,rowIndex,colIndex,store){if(value>0){return"<a href='#' onclick='exportData(\""+Js.Center.Business.SvcBlackListGwsURL+"\",\"id="+record.data.numlogid+"&numgwid="+record.data.numgwid+"&flag=selectgwdesc&successtype=0\")'>"+value+"</a>"}else{return value}},sortable:true}]);var svcGwSuccGrid=new WXTL.Widgets.CommonGrid.GridPanel({title:'通道黑名单处理列表',anchor:'100% 100%',pageSize:pageSizeSum,store:Js.Center.Business.SvcBlacklistGwNumDetail.GwSuccnumGridStore,needMenu:false,needRightMenu:false,sm:sm,cm:cm});var mainPanel=new Ext.form.FormPanel({});var mainForm=mainPanel.getForm();Js.Center.Business.SvcBlacklistGwNumDetailWindow=new WXTL.Widgets.CommonWindows.Window({title:"通道黑名单处理详情",width:664,height:400,layout:'form',mainForm:mainForm,autoScroll:false,needButtons:false,items:[svcGwSuccGrid],buttons:[new Ext.Button({text:'关闭',qtip:"关闭",minWidth:70,handler:function(){Js.Center.Business.SvcBlacklistGwNumDetailWindow.close()}})]});Js.Center.Business.SvcBlacklistGwNumDetailWindow.show()};Ext.namespace('Js.Center.Business');Js.Center.Business.SvcBlackURL='URL/BlackWhilteList/SvcBlackQuery.ashx';Js.Center.Business.SvcBlackUpdateURL='URL/BlackWhilteList/SvcBlackUpdate.ashx';Js.Center.Business.SvcBlackListGwsURL='URL/BlackWhilteList/SvcBlackGwSuccnum.ashx';