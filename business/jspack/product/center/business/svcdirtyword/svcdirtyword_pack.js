﻿Ext.namespace('Js.Center.System.SvcDirtyWordAdd');Ext.QuickTips.init();Js.Center.System.SvcDirtyWordAdd.func=function(){var queryString='';Js.Center.Business.GatewayStore=new Ext.data.Store({proxy:new Ext.data.HttpProxy({url:Js.Center.Business.GatewayURL,method:"POST"}),reader:new Ext.data.JsonReader({fields:['numgwid','vc2gatewayname'],root:'data',id:'numgwid'}),baseParams:{flag:'querygatewaybynumstatus',numstatus:1,columnlist:'numgwid,vc2gatewayname'},listeners:{load:function(){var data=this.data;var lovcomboxFile=Ext.getCmp("Js.Center.Business.SvcDirtyWord.gwcombo");lovcomboxFile.store.data=data}}});Js.Center.Business.GatewayStore.reload();var addSvcDirtyWordInfofp=new Ext.form.FormPanel({id:"addSvcDirtyWordInfofp",frame:true,labelWidth:80,items:[{layout:'column',items:[{xtype:"hidden",name:"flag",value:"insert"},{columnWidth:.5,layout:'form',defaultType:"textfield",defaults:{anchor:"90%",msgTarget:"side"},buttonAlign:"center",bodyStyle:"padding:10px 0 10px 15px",items:[{xtype:"textfield",name:"vc2dirtyword",fieldLabel:"<font color=red>内容</font>",allowBlank:false,blankText:"内容不允许为空",regex:WXTL.Common.regex.Illegal,regexText:WXTL.Common.regexText.IllegalText,maxLength:25,maxLengthText:'长度不能超过25！'},{xtype:"lovcombo",name:"numgwid",id:"Js.Center.Business.SvcDirtyWord.gwcombo",fieldLabel:"<font color=red>网关名称</font>",hiddenName:"numgwid",mode:"local",store:Js.Center.Business.GatewayStore,triggerAction:'all',expandSelect:function(){var c=[];c=this.getRawValue().split(this.separator);var snapshot=this.store.snapshot||this.store.data;var displayField=this.displayField;var isTrue=false;if(this.getRawValue().indexOf(this.separator)>-1){snapshot.each(function(r){isTrue=false;for(var i=0;i<c.length;i++){if(r.get(displayField)==c[i].replace(/(^\s*)|(\s*$)/g,"")){isTrue=true;break}}r.set(this.checkField,isTrue)},this)}else if(this.getRawValue()!=""){snapshot.each(function(r){isTrue=false;if(r.get(displayField)==c){isTrue=true}r.set(this.checkField,isTrue)},this)}else{snapshot.each(function(r){r.set(this.checkField,false)},this)}this.store.data=snapshot},onBeforeQuery:function(qe){qe.query=qe.query.replace(new RegExp(this.getCheckedDisplay()+'[ '+this.separator+']*'),'')},onSelect:function(record,index){if(this.fireEvent('beforeselect',this,record,index)!==false){record.set(this.checkField,!record.get(this.checkField));if(this.store.isFiltered()){this.doQuery(this.allQuery)}getQueryString(this);this.setValue(this.getCheckedValue());this.fireEvent('select',this,record,index);}},setValue:function(v){if(v){v=''+v;if(this.valueField){this.store.clearFilter();this.store.each(function(r){var checked=!(!v.match('(^|'+this.separator+')'+RegExp.escape(r.get(this.valueField))+'('+this.separator+'|$)'));r.set(this.checkField,checked)},this);this.value=this.getCheckedValue();if(queryString!=null&&queryString!=''){this.setRawValue(this.getCheckedDisplay()+","+queryString)}else{this.setRawValue(this.getCheckedDisplay())}if(this.hiddenField){this.hiddenField.value=this.value}}else{this.value=v;this.setRawValue(v);if(this.hiddenField){this.hiddenField.value=v}}if(this.el){this.el.removeClass(this.emptyClass)}}else{this.clearValue()}if(queryString!=null&&queryString!=''){this.doQuery(queryString)}},selectOnFocus:true,emptyText:'-=请选择=-',displayField:'vc2gatewayname',valueField:'numgwid',allowBlank:false,blankText:"网关名称必选"}]},{columnWidth:.5,layout:'form',defaultType:"textfield",defaults:{anchor:"90%",msgTarget:"side"},buttonAlign:"center",bodyStyle:"padding:10px 0 10px 15px",items:[{xtype:"combo",name:"numdirtytype",fieldLabel:"<font color=red>分类</font>",hiddenName:"numdirtytype",allowBlank:false,blankText:"分类不允许为空",readOnly:true,mode:"local",emptyText:"请选择",displayField:"vc2name",valueField:"numdirtytype",triggerAction:"all",store:Js.Center.System.SvcDirtyWord.DirtywordTypeStore},new Ext.form.DateField({fieldLabel:'有效时间',name:'dateffectend',readOnly:true,showToday:true,clearDate:true,format:'Y-m-d',validateOnBlur:false,minValue:WXTL.Common.dateTime.getNow(),minText:"有效时间小于今天"})]}]}]});function getQueryString(lovcombo){var snapshot=lovcombo.store.snapshot||lovcombo.store.data;if(lovcombo.getRawValue().indexOf(lovcombo.separator)>-1){var c=[];c=lovcombo.getRawValue().split(lovcombo.separator);var j=c.length;snapshot.each(function(r){isTrue=false;for(var i=0;i<c.length;i++){if(r.get(lovcombo.displayField)==c[i].replace(/(^\s*)|(\s*$)/g,"")){isTrue=true;j--;break}}},this);if(j>0){queryString=c[c.length-1]}}else if(lovcombo.getRawValue()!=""){var c=lovcombo.getRawValue();isTrue=false;snapshot.each(function(r){if(r.get(lovcombo.displayField)==c){isTrue=true}},this);if(isTrue){queryString=''}else{queryString=c}}else{queryString=''}}Js.Center.Common.BusinessGatewayStore.reload();var mainForm=addSvcDirtyWordInfofp.getForm();this.window=new WXTL.Widgets.CommonWindows.Window({title:"添加敏感词",mainForm:mainForm,updateURL:Js.Center.System.SvcDirtyWordUpdateURL,displayStore:Js.Center.System.SvcDirtyWord.Infostore,items:[addSvcDirtyWordInfofp],listeners:{"show":function(){queryString='';Js.Center.Business.GatewayStore.reload()}}})};Ext.namespace('Js.Center.System.SvcDirtyWordDelete');Js.Center.System.SvcDirtyWordDelete.func=function(row){var deleteSplit="";for(var i=0;i<row.length;i++){if(row.length==1){deleteSplit=row[i].data.numdirtywordid}else{if(i<(row.length-1)){deleteSplit=row[i].data.numdirtywordid+","+deleteSplit}if(i==(row.length-1)){deleteSplit=deleteSplit+row[i].data.numdirtywordid}}};var params={ids:deleteSplit,flag:"delete"};doAjax(Js.Center.System.SvcDirtyWordUpdateURL,params,Js.Center.System.SvcDirtyWord.Infostore)};Ext.namespace('Js.Center.System.SvcDirtyWordImport');Ext.QuickTips.init();Js.Center.System.SvcDirtyWordImport.func=function(){if(Js.Center.System.SvcDirtyWordImport.window==null){var ImportDirtyWordInfofp=new Ext.form.FormPanel({fileUpload:true,frame:true,labelWidth:80,layout:'form',defaults:{anchor:"90%",msgTarget:"side"},items:[{xtype:"hidden",name:"flag",value:"import"},{xtype:"xComboBox",name:"numgwid",fieldLabel:"<font color=red>网关名称</font>",hiddenName:"numgwid",mode:"local",store:Js.Center.Common.BusinessGatewayStore,triggerAction:'all',selectOnFocus:true,emptyText:'-=请选择=-',displayField:'vc2gatewayname',valueField:'numgwid',allowBlank:false,blankText:"网关名称必选"},{xtype:"combo",width:300,fieldLabel:"<font color=red>分类</font>",hiddenName:"numdirtytype",allowBlank:false,blankText:"分类不允许为空",readOnly:true,mode:"local",emptyText:"请选择",displayField:"vc2name",valueField:"numdirtytype",triggerAction:"all",store:Js.Center.System.SvcDirtyWord.DirtywordTypeStore},new Ext.form.DateField({fieldLabel:'有效时间',name:'dateffectend',readOnly:true,showToday:true,clearDate:true,format:'Y-m-d',validateOnBlur:false,minValue:WXTL.Common.dateTime.getNow(),minText:"有效时间小于今天"}),{xtype:'fileuploadfield',name:'filepath',fieldLabel:getHelpMsg("文件",true,'1、文件格式为txt<br>2、文件大小须小于2M<br>3、行数必须不超过1000行<br>4、内容格式:关键字（换行）。<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;例如：脏字<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;法轮功<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;藏独<br />'),allowBlank:false,blankText:"请选择上传文件",validator:function(){var filePath=this.getValue();if(filePath!=''){ImportDirtyWordInfofp.getForm().items.items[5].el.dom.value=getFileMessage(filePath);if(checkFile(filePath)!=''){this.invalidText=checkFile(filePath);return false}else{return true}}else return false}},{xtype:'textarea',name:'filemessage',fieldLabel:'文件信息',readOnly:true,width:500,height:180}]});Js.Center.Common.BusinessGatewayStore.reload();var mainForm=ImportDirtyWordInfofp.getForm();this.window=new WXTL.Widgets.CommonWindows.Window({title:"导入非法词",mainForm:mainForm,updateURL:Js.Center.System.DirtyWordUpdateURL,displayStore:Js.Center.System.SvcDirtyWord.Infostore,items:[ImportDirtyWordInfofp],needButtons:false,buttons:[new Ext.Button({text:'确定',minWidth:70,qtip:"确定",handler:function(){if(mainForm.isValid()){Ext.MessageBox.show({msg:'正在保存，请稍等...',progressText:'Saving...',width:300,wait:true,icon:'download',animEl:'saving'});setTimeout(function(){Ext.MessageBox.hide()},300000);mainForm.submit({url:Js.Center.System.SvcDirtyWordUpdateURL,method:"POST",success:function(form,action){var objJson=Ext.util.JSON.decode(action.response.responseText);var falg=objJson.success;if(falg==true){Ext.Msg.alert("温馨提示","操作成功了!");Js.Center.System.SvcDirtyWord.Infostore.reload();Js.Center.System.SvcDirtyWordImport.window.hide()}else{Ext.Msg.alert('温馨提示',objJson.info);Js.Center.System.SvcDirtyWord.Infostore.reload();Js.Center.System.SvcDirtyWordImport.window.hide()}},failure:function(form,action){var objJson=Ext.util.JSON.decode(action.response.responseText);Ext.Msg.alert('温馨提示',objJson.info);Js.Center.System.SvcDirtyWord.Infostore.reload();Js.Center.System.SvcDirtyWordImport.window.hide()}})}}}),new Ext.Button({text:'重置',minWidth:70,qtip:"重置数据",handler:function(){mainForm.reset()}}),new Ext.Button({text:'取消',minWidth:70,handler:function(){Js.Center.System.SvcDirtyWordImport.window.hide()}})]});}};Ext.namespace('Js.Center.System.SvcDirtyWord');Js.Center.System.SvcDirtyWord.SvcDirtyWordInfo=function(node){if(Ext.get("Js.Center.System.SvcDirtyWord.SvcDirtyWordPanel")==null){Js.Center.System.SvcDirtyWord.DirtywordTypeStore=new Ext.data.Store({proxy:new Ext.data.HttpProxy({url:Js.Center.System.DirtyWordTypeQueryURL,method:"POST"}),reader:new Ext.data.JsonReader({fields:['numdirtytype','vc2name'],root:"data",id:"numdirtytype"}),baseParams:{flag:'selectall',columnlist:'numdirtytype, vc2name'}});Js.Center.System.SvcDirtyWord.DirtywordTypeStore.load();dirtyWordImport=function(){Js.Center.System.SvcDirtyWordImport.window.show()};var _pageSize=12;var fields=["numdirtywordid","numgwid","vc2gatewayname","vc2dirtyword","numdirtytype","datcreatetime","numcreaterid","vc2username","vc2name","dateffectend"];Js.Center.System.SvcDirtyWord.Infostore=new WXTL.Widgets.CommonData.GroupingStore({proxy:new Ext.data.HttpProxy({url:Js.Center.System.SvcDirtyWordURL,method:"POST"}),reader:new Ext.data.JsonReader({fields:fields,root:"data",id:"numdirtywordid",totalProperty:"totalCount"}),baseParams:{dirtywordname:'',dtnumgwid:'',datstart:'',datend:'',flag:'selectbykey'}});Js.Center.System.SvcDirtyWord.Infostore.load({params:{start:0,limit:_pageSize,dirtywordname:'',dtnumgwid:'',datstart:'',datend:'',flag:'selectbykey'}});var sm=new Ext.grid.CheckboxSelectionModel({dataIndex:"numdirtywordid"});var cm=new Ext.grid.ColumnModel([sm,{header:"敏感词内容",tooltip:"敏感词内容",dataIndex:"vc2dirtyword",sortable:true},{header:"网关ID",tooltip:"网关ID",dataIndex:"numgwid",sortable:true},{header:"网关名称",tooltip:"网关名称",dataIndex:"vc2gatewayname",sortable:true},{header:"类型",tooltip:"类型",dataIndex:"vc2name",sortable:true},{header:"添加日期",tooltip:"添加日期",dataIndex:"datcreatetime",sortable:true},{header:"添加人",tooltip:"添加人",dataIndex:"vc2username",sortable:true},{header:"有效日期",tooltip:"有效日期",dataIndex:"dateffectend",sortable:true}]);var DirtyWordImportarrInitLoadFunc=new Array();DirtyWordImportarrInitLoadFunc[0]="Js.Center.System.SvcDirtyWordImport.func";var svcdirtyWordGrid=new WXTL.Widgets.CommonGrid.GridPanel({id:"svcdirtyWordGridPanel",anchor:'100% 100%',pageSize:_pageSize,needMenu:false,store:Js.Center.System.SvcDirtyWord.Infostore,afterEditURL:Js.Center.System.SvcDirtyWordUpdateURL,inertMethod:'Js.Center.System.SvcDirtyWordAdd',updateMethod:'Js.Center.System.SvcDirtyWordUpdate',deleteMethod:'Js.Center.System.SvcDirtyWordDelete.func',otherInitLoadFunc:DirtyWordImportarrInitLoadFunc,sm:sm,cm:cm,tbar:new Ext.Toolbar({items:[{iconCls:'addicon',text:"添加",handler:function(){svcdirtyWordGrid.doInsert()}},"","-","",{text:"导入",iconCls:"importicon",handler:dirtyWordImport},"","-","",{text:"修改",iconCls:"editicon",handler:function(){svcdirtyWordGrid.doEdit()}},"","-","",{text:"删除",iconCls:"deleteicon",handler:function(){svcdirtyWordGrid.doDelete()}}]})});var svcselectPanel=new WXTL.Widgets.CommonPanel.QueryFormPanel({id:"svcdirtywordSelectPanel",height:130,queryMethod:"Js.Center.System.SvcDirtyWord.queryGrid",items:[{layout:'column',items:[{columnWidth:.5,layout:'form',defaultType:"textfield",defaults:{anchor:"90%",msgTarget:"side"},buttonAlign:"center",items:[new Ext.form.DateField({fieldLabel:'开始时间',name:'datstart',id:'Js.Center.System.SvcDirtyWord.DatStart',readOnly:true,format:'Y-m-d',validateOnBlur:false,showToday:true,clearDate:true,validator:function(){var strat_time=Ext.get("Js.Center.System.SvcDirtyWord.DatStart").dom.value;var end_time=Ext.get("Js.Center.System.SvcDirtyWord.DatEnd").dom.value;if(strat_time<=end_time){return true}else{return false}},invalidText:'结束时间不能小于开始时间！'}),new Ext.form.TextField({fieldLabel:'敏感词名称',name:'vc2dirtyword',id:'Js.Center.System.SvcDirtyWord.dwinfovc2dirtyword',regex:WXTL.Common.regex.Illegal,regexText:WXTL.Common.regexText.IllegalText,maxLength:25})]},{columnWidth:.5,layout:'form',defaultType:"textfield",defaults:{anchor:"90%",msgTarget:"side"},items:[new Ext.form.DateField({fieldLabel:'结束时间',name:'datend',id:'Js.Center.System.SvcDirtyWord.DatEnd',readOnly:true,format:'Y-m-d',validateOnBlur:true,showToday:true,clearDate:true,validator:function(){var strat_time=Ext.get("Js.Center.System.SvcDirtyWord.DatStart").dom.value;var end_time=Ext.get("Js.Center.System.SvcDirtyWord.DatEnd").dom.value;if(strat_time<=end_time){return true}else{return false}},invalidText:'结束时间不能小于开始时间！'}),{xtype:"xComboBox",name:"dtnumgwid",fieldLabel:"网关名称",hiddenName:"dtnumgwid",mode:"local",store:Js.Center.Common.BusinessGatewayStore,triggerAction:'all',selectOnFocus:true,emptyText:'-=请选择=-',displayField:'vc2gatewayname',valueField:'numgwid',allowBlank:true,blankText:"网关名称必选"}]}]}]});Js.Center.System.SvcDirtyWord.queryGrid=function(){if(svcselectPanel.getForm().isValid()){var _dirtywordname=Ext.get("Js.Center.System.SvcDirtyWord.dwinfovc2dirtyword").getValue();var _dtnumgwid=Ext.get("dtnumgwid").getValue();var flag='selectbykey';Js.Center.System.SvcDirtyWord.Infostore.baseParams={dirtywordname:_dirtywordname,dtnumgwid:_dtnumgwid,flag:flag,datstart:Ext.get("Js.Center.System.SvcDirtyWord.DatStart").dom.value,datend:Ext.get("Js.Center.System.SvcDirtyWord.DatEnd").dom.value};Js.Center.System.SvcDirtyWord.Infostore.load({params:{start:0,limit:_pageSize}})}};Js.Center.System.SvcDirtyWord.SvcDirtyWordPanel=new Ext.Panel({frame:true,id:"Js.Center.System.SvcDirtyWord.SvcDirtyWordPanel",bodyBorder:false,border:false,autoScroll:true,layout:"anchor",defaults:{collapsible:true},items:[svcselectPanel,svcdirtyWordGrid]})};GridMain(node,Js.Center.System.SvcDirtyWord.SvcDirtyWordPanel,"openroomiconinfo","Js.Center.System.SvcDirtyWord.Infostore")};Ext.namespace('Js.Center.System.SvcDirtyWordUpdate');Js.Center.System.SvcDirtyWordUpdate.func=function(row){var updateDirtywordmfp=new Ext.form.FormPanel({frame:true,labelWidth:80,items:[{layout:'column',items:[{xtype:"hidden",name:"flag",value:"updateall"},{xtype:"hidden",name:"numdirtywordid",fieldLabel:"关键字编号"},{columnWidth:.5,layout:'form',defaultType:"textfield",defaults:{anchor:"90%",msgTarget:"side"},buttonAlign:"center",bodyStyle:"padding:10px 0 10px 15px",items:[{xtype:"textfield",name:"vc2dirtyword",fieldLabel:"<font color=red>内容</font>",allowBlank:false,blankText:"内容不允许为空",regex:WXTL.Common.regex.Illegal,regexText:WXTL.Common.regexText.IllegalText,maxLength:25,maxLengthText:'长度不能超过25！'},{xtype:"xComboBox",name:"numgwid",fieldLabel:"<font color=red>网关名称</font>",hiddenName:"numgwid",mode:"local",store:Js.Center.Common.BusinessGatewayStore,triggerAction:'all',selectOnFocus:true,emptyText:'-=请选择=-',displayField:'vc2gatewayname',valueField:'numgwid',allowBlank:false,blankText:"网关名称必选"}]},{columnWidth:.5,layout:'form',defaultType:"textfield",defaults:{anchor:"90%",msgTarget:"side"},buttonAlign:"center",bodyStyle:"padding:10px 0 10px 15px",items:[{xtype:"combo",name:"numdirtytype",fieldLabel:"<font color=red>分类</font>",hiddenName:"numdirtytype",allowBlank:false,blankText:"分类不允许为空",readOnly:true,mode:"local",displayField:"vc2name",valueField:"numdirtytype",triggerAction:"all",value:"1",store:Js.Center.System.SvcDirtyWord.DirtywordTypeStore},new Ext.form.DateField({fieldLabel:'有效时间',name:'dateffectend',readOnly:true,showToday:true,clearDate:true,format:'Y-m-d',validateOnBlur:false,minValue:WXTL.Common.dateTime.getNow(),minText:"有效时间小于今天"})]}]}]});Js.Center.Common.BusinessGatewayStore.reload();var mainForm=updateDirtywordmfp.getForm();this.window=new WXTL.Widgets.CommonWindows.Window({title:"修改敏感词",mainForm:mainForm,updateURL:Js.Center.System.SvcDirtyWordUpdateURL,displayStore:Js.Center.System.SvcDirtyWord.Infostore,updateState:true,updateRecord:row,items:[updateDirtywordmfp]})};Ext.namespace('Js.Center.System');Js.Center.System.SvcDirtyWordURL='URL/system/svcDirtyWord/svcdirtywordquery.ashx';Js.Center.System.SvcDirtyWordUpdateURL='URL/system/svcDirtyWord/dirtyWordUpdate.ashx';Js.Center.Business.GatewayURL='URL/system/gateway/gatewayqueryyxt.ashx';