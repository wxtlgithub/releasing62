Ext.namespace('Js.Center.Popedom.DepartmentAdd');Ext.QuickTips.init();Js.Center.Popedom.DepartmentAdd.func=function(){var addInfoFormPanel=new Ext.form.FormPanel({frame:true,region:'center',labelWidth:80,items:[{layout:'column',items:[{xtype:"hidden",name:"flag",value:"insert"},{columnWidth:.5,layout:'form',defaultType:"textfield",defaults:{anchor:"90%",msgTarget:"side"},buttonAlign:"center",bodyStyle:"padding:0px 0 0px 15px",items:[{xtype:"hidden",name:"numparentdepart",id:'Js.Center.Popedom.DepartmentAdd.ParentId',fieldLabel:"上级部门ID"},{xtype:"textfield",name:"vc2parentdepartname",id:'Js.Center.Popedom.DepartmentAdd.ParentName',fieldLabel:"<font color=red>上级部门</font>",allowBlank:false,blankText:"上级部门不允许为空",regex:WXTL.Common.regex.Illegal,regexText:WXTL.Common.regexText.IllegalText,readOnly:true},{xtype:"textfield",name:"vc2dcode",fieldLabel:"<font color=red>部门编码</font>",allowBlank:false,blankText:"部门编码不允许为空",regex:WXTL.Common.regex.Illegal,regexText:WXTL.Common.regexText.IllegalText,maxLength:20},{xtype:"textfield",name:"numorder",fieldLabel:"<font color=red>部门顺序</font>",allowBlank:false,blankText:"部门顺序不允许为空",regex:/^\d{1,5}$/,regexText:'只能输入5位以内的正整数！'},{xtype:"textfield",name:"vc2linkman",fieldLabel:"<font color=red>联系人</font>",allowBlank:false,blankText:"联系人不允许为空",regex:WXTL.Common.regex.Illegal,regexText:WXTL.Common.regexText.IllegalText,maxLength:50}]},{columnWidth:.5,layout:'form',defaultType:"textfield",defaults:{anchor:"90%",msgTarget:"side"},buttonAlign:"center",bodyStyle:"padding:0px 0 0px 15px",items:[{xtype:"textfield",name:"vc2departname",fieldLabel:"<font color=red>部门名称</font>",allowBlank:false,blankText:"部门名称不允许为空",regex:WXTL.Common.regex.Illegal,regexText:WXTL.Common.regexText.IllegalText,maxLength:25},{xtype:"textfield",name:"vc2handset",fieldLabel:"<font color=red>手机号码</font>",allowBlank:false,blankText:"手机号码不允许为空",regex:WXTL.Common.regex.Mobile,regexText:"手机号码格式不正确"},{xtype:"textfield",name:"vc2tel",fieldLabel:"<font color=red>电话</font>",allowBlank:false,blankText:"电话不允许为空",regex:WXTL.Common.regex.Phone,regexText:"电话格式不正确"},{xtype:"textfield",name:"vc2postcode",fieldLabel:"<font color=red>邮编</font>",allowBlank:false,blankText:"邮编不允许为空",regex:WXTL.Common.regex.PostCode,regexText:"邮编格式不正确"}]}]},{layout:'form',defaultType:"textfield",defaults:{anchor:"95%",msgTarget:"side"},buttonAlign:"center",bodyStyle:"padding:0px 0 0px 15px",items:[{xtype:"textfield",name:"vc2address",fieldLabel:"通信地址",regex:WXTL.Common.regex.Illegal,regexText:WXTL.Common.regexText.IllegalText,maxLength:100},{height:100,xtype:"textarea",name:"vc2departdesc",fieldLabel:"备注",regex:WXTL.Common.regex.Illegal,regexText:WXTL.Common.regexText.IllegalText,maxLength:100}]}]});var root=new Ext.tree.AsyncTreeNode({id:"-1",text:"部门",loader:new Ext.tree.TreeLoader({url:Js.Center.Popedom.DepartmentsQueryURL,listeners:{"beforeload":function(treeloader,node){treeloader.baseParams={flag:'selectallbycurrentuser',parentid:node.id,columnlist:'numdepartid,vc2departname,numlevel,vc2levelpath',method:'POST'}}}})});var treePanel=new Ext.tree.TreePanel({border:false,applyTo:'',root:root,autoScroll:true,height:234,rootVisible:false,listeners:{"click":function(node,event){document.getElementById("Js.Center.Popedom.DepartmentAdd.ParentId").value=node.id;document.getElementById("Js.Center.Popedom.DepartmentAdd.ParentName").value=node.text}}});treePanel.expand();var westPanel=new Ext.Panel({collapsible:false,border:false,width:180,autoScroll:true,region:"west",title:'部门结构',items:[treePanel]});var mainPanel=new Ext.Panel({width:700,height:260,frame:false,layout:'border',border:true,items:[westPanel,addInfoFormPanel]});var mainForm=addInfoFormPanel.getForm();this.window=new WXTL.Widgets.CommonWindows.Window({width:700,title:"添加部门",mainForm:mainForm,updateURL:Js.Center.Popedom.DepartmentsUpdateURL,displayStore:Js.Center.Popedom.Department.Infostore,items:[mainPanel],needButtons:false,listeners:{"beforeshow":function(){root.reload();treePanel.expandAll()}},buttons:[new Ext.Button({text:'保存退出',minWidth:70,qtip:"保存退出",handler:function(){if(mainForm.isValid()){Js.Center.Popedom.DepartmentAdd.window.mainFormSubmitFunc()}}}),new Ext.Button({text:'重填',qtip:"重填",minWidth:70,handler:function(){addInfoFormPanel.getForm().reset()}}),new Ext.Button({text:'下一步',qtip:"下一步",minWidth:70,handler:function(){if(mainForm.isValid()){Js.Center.Popedom.DepartmentAdd.window.mainFormSubmitFunc('Js.Center.Popedom.DepartmentAdd.nextStepFunc(objJson)');}}}),new Ext.Button({text:'关闭',qtip:"关闭",minWidth:70,handler:function(){Js.Center.Popedom.DepartmentAdd.window.hide()}})]});Js.Center.Popedom.DepartmentAdd.nextStepFunc=function(objJson){Js.Center.Popedom.Department.DepartmentPermit.window.updateRecord=objJson;Js.Center.Popedom.Department.DepartmentPermit.window.show()}};Ext.namespace('Js.Center.Popedom.DepartmentDelete');Js.Center.Popedom.DepartmentDelete.func=function(row){var deleteSplit="";for(var i=0;i<row.length;i++){if(row.length==1){deleteSplit=row[i].data.numdepartid}else{if(i<(row.length-1)){deleteSplit=row[i].data.numdepartid+","+deleteSplit}if(i==(row.length-1)){deleteSplit=deleteSplit+row[i].data.numdepartid}}};var params={ids:deleteSplit,flag:"delete"};doAjax(Js.Center.Popedom.DepartmentsUpdateURL,params,Js.Center.Popedom.Department.Infostore)};Ext.namespace('Js.Center.Popedom.Department');Js.Center.Popedom.Department.info=function(node){if(Ext.get("Js.Center.Popedom.Department.MainPanel")==null){departAdd=function(){Js.Center.Popedom.DepartmentAdd.window.show()};departUpdate=function(rowIndex){var row=Js.Center.Popedom.Department.Infostore.getAt(rowIndex);Js.Center.Popedom.DepartmentUpdate.window.updateRecord=row;Js.Center.Popedom.DepartmentUpdate.window.show();Js.Center.Popedom.DepartmentUpdate.window.mainForm.loadRecord(row);};departDelete=function(rowIndex){var row=departmentsGrid.getSelectionModel().getSelections();if(row.length>1){Ext.Msg.alert("提示信息","您只能选择一个删除!")}else if(row.length==1){Ext.Msg.confirm("提示!","您确定要删除信息吗?",function(btn){if(btn=="yes"){Js.Center.Popedom.DepartmentDelete.func(row)}else{}})}};departGetSelecttionsDelete=function(){var row=departmentsGrid.getSelectionModel().getSelections();if(row.length==0){Ext.Msg.alert("提示信息","请您至少选择一个!")}else{Ext.Msg.confirm("提示!","您确定要删除信息吗?",function(btn){if(btn=="yes"){Js.Center.Popedom.DepartmentDelete.func(row)}else{}})}};departPermission=function(rowIndex){if(rowIndex!=null){var row=Js.Center.Popedom.Department.Infostore.getAt(rowIndex);Js.Center.Popedom.Department.DepartmentPermit.window.updateRecord=row}else{Js.Center.Popedom.Department.DepartmentPermit.window.updateRecord=null}Js.Center.Popedom.Department.DepartmentPermit.window.show();};var _pageSize=12;var fields=["vc2dcode","vc2linkman","vc2parentdepartname","vc2departname","numorder","numusercount","vc2creatorname","datcreatetime","vc2lastmodifyname","datlastmodifytime","vc2departdesc","numrowasdf","numdepartid","numparentdepart","numlevel","vc2levelpath","vc2extendcode","numdepartsrc","numcreator","numlastmodifyuser","datlastmodifytime","vc2lastmodifyname","numstate","numtype","vc2branchname","vc2address","vc2tel","vc2postcode","vc2handset","numroleid"];Js.Center.Popedom.Department.Infostore=new WXTL.Widgets.CommonData.GroupingStore({proxy:new Ext.data.HttpProxy({url:Js.Center.Popedom.DepartmentsQueryURL,method:"POST"}),reader:new Ext.data.JsonReader({fields:fields,root:"data",id:"numdepartid",totalProperty:"totalCount"}),sortInfo:{field:'datcreatetime',direction:'DESC'},baseParams:{vc2departname:'',vc2dcode:'',flag:'selectbykey'}});Js.Center.Popedom.Department.Infostore.load({params:{start:0,limit:_pageSize,vc2departname:'',vc2dcode:'',flag:'selectbykey'}});var sm=new Ext.grid.CheckboxSelectionModel({dataIndex:"numdepartid"});var cm=new Ext.grid.ColumnModel([sm,{header:"部门名称",tooltip:"部门名称",dataIndex:"vc2departname",sortable:true},{header:"部门顺序号",tooltip:"部门顺序号",dataIndex:"numorder",hidden:true,sortable:true},{header:"用户个数",tooltip:"用户个数",dataIndex:"numusercount",hidden:true,sortable:true},{header:"创建者",tooltip:"创建者",dataIndex:"vc2creatorname",sortable:true},{header:"创建日期",tooltip:"创建日期",dataIndex:"datcreatetime",sortable:true},{header:"修改人",tooltip:"修改人",dataIndex:"vc2lastmodifyname",sortable:true},{header:"修改日期",tooltip:"修改日期",dataIndex:"datlastmodifytime",sortable:true},{header:"描述",tooltip:"描述",dataIndex:"vc2departdesc",sortable:true},{header:"部门权限",tooltip:"部门权限",dataIndex:"numsvcid",renderer:function(value,meta,record,rowIndex,colIndex,store){return"<a href='#' onclick='departPermission(\""+rowIndex+"\")'>授权</a>";}},{header:"部门操作",tooltip:"部门操作",dataIndex:"numdepartid",renderer:function(value,meta,record,rowIndex,colIndex,store){return"<a href='#' onclick='departUpdate(\""+rowIndex+"\")'>修改</a>　<a href='#' onclick='departDelete(\""+rowIndex+"\")'>删除</a>"}}]);var arrInitLoadFunc=new Array();arrInitLoadFunc[0]="Js.Center.Popedom.Department.DepartmentPermit.func";var departmentsGrid=new WXTL.Widgets.CommonGrid.GridPanel({pageSize:_pageSize,anchor:'100% 100%',needRightMenu:false,store:Js.Center.Popedom.Department.Infostore,afterEditURL:Js.Center.Purview.DepartmentsUpdateURL,inertMethod:'Js.Center.Popedom.DepartmentAdd',updateMethod:'Js.Center.Popedom.DepartmentUpdate',deleteMethod:'Js.Center.Popedom.DepartmentDelete',otherInitLoadFunc:arrInitLoadFunc,needMenu:false,sm:sm,cm:cm,tbar:new Ext.Toolbar({items:[{iconCls:'addicon',text:"添加部门",handler:departAdd},"","-","",{text:"部门授权",iconCls:"editicon",handler:function(){departPermission();}},"","-","",{text:"删除",iconCls:"deleteicon",handler:departGetSelecttionsDelete}]})});var selectPanel=new WXTL.Widgets.CommonPanel.QueryFormPanel({id:"Js.Center.Popedom.Department.SelectPanel",height:100,queryMethod:"Js.Center.Popedom.Department.queryGrid",items:[{layout:'column',items:[{columnWidth:.5,layout:'form',defaultType:"textfield",defaults:{anchor:'90%',msgTarget:"side"},items:[{fieldLabel:'部门名称',name:'vc2departname',id:'Js.Center.Popedom.Department.DepartmentName',regex:WXTL.Common.regex.Illegal,regexText:WXTL.Common.regexText.IllegalText,msgTarget:"side",maxLength:50}]}]}]});Js.Center.Popedom.Department.queryGrid=function(){if(selectPanel.getForm().isValid()){var _vc2departname=Ext.get("Js.Center.Popedom.Department.DepartmentName").getValue();var _flag='selectbykey';Js.Center.Popedom.Department.Infostore.baseParams={vc2departname:_vc2departname,flag:_flag};Js.Center.Popedom.Department.Infostore.load({params:{start:0,limit:_pageSize,vc2departname:_vc2departname,flag:_flag}})}};Js.Center.Popedom.Department.MainPanel=new Ext.Panel({frame:true,id:"Js.Center.Popedom.Department.MainPanel",bodyBorder:false,border:false,autoScroll:true,layout:"anchor",defaults:{collapsible:true},items:[selectPanel,departmentsGrid]})};GridMain(node,Js.Center.Popedom.Department.MainPanel,"openroomiconinfo","Js.Center.Popedom.Department.Infostore")};Ext.namespace('Js.Center.Popedom.Department.DepartmentPrimission');Js.Center.Popedom.Department.DepartmentPrimission.func=function(row){var _ddrRoleid=row.get("numdroleid");var _id='numcolumnid';var _columnlist='numcolumnid,vc2columnname';var _url=Js.Center.Business.ColumnURL;var _valueField='numcolumnid';var _displayField='vc2columnname';var _fields=['numcolumnid','vc2columnname'];var flag='selectpermitbyroleid';var _noflag='selectnopermitbyroleid';var datatype=1;var fromStore=new Ext.data.Store({proxy:new Ext.data.HttpProxy({url:_url,method:"POST"}),reader:new Ext.data.JsonReader({fields:_fields,root:'data',id:_id}),baseParams:{flag:_noflag,roleid:_ddrRoleid,columnlist:_columnlist}});var toStore=new Ext.data.Store({proxy:new Ext.data.HttpProxy({url:_url,method:"POST"}),reader:new Ext.data.JsonReader({fields:_fields,root:'data',id:_id}),baseParams:{flag:flag,roleid:_ddrRoleid,columnlist:_columnlist}});if(Js.Center.Popedom.Department.DepartmentPrimission.DepartmentDataRoleWin==null){var permissionTablePanl=new Ext.form.FormPanel({frame:true,autoScroll:true,padding:'10 10 10 10',items:[{xtype:"hidden",name:"numdroleid",id:"ddrpermitroleid",fieldLabel:"编号"},{xtype:"textfield",name:"vc2drolename",fieldLabel:"角色名称"},{xtype:"combo",name:"numtypeid",id:"ddrpernumtype",fieldLabel:"数据类型",hiddenName:"ddrpermitnumtypeid",readOnly:true,mode:"local",displayField:"show",valueField:"value",triggerAction:"all",value:"1",store:new Ext.data.SimpleStore({fields:["show","value"],data:[["栏目","1"],["产品","2"]]}),listeners:{scope:this,Select:function(combo,record,index){datatype=index+1;if(index==0){_id='numcolumnid';_columnlist='numcolumnid,vc2columnname';_url=Js.Center.Business.ColumnURL;_valueField='numcolumnid';_displayField='vc2columnname';_fields=['numcolumnid','vc2columnname'];flag='selectpermitbyroleid';_noflag='selectnopermitbyroleid'}if(index==1){_id='numprodid';_columnlist='numprodid,vc2name';_url=Js.Center.Business.ProductURL;_valueField='numprodid';_displayField='vc2name';_fields=['numprodid','vc2name'];flag='selectpermitbyroleid';_noflag='selectnopermitbyroleid'}_ddrRoleid=Ext.get("ddrpermitroleid").getValue();fromStore=new Ext.data.Store({proxy:new Ext.data.HttpProxy({url:_url,method:"POST"}),reader:new Ext.data.JsonReader({fields:_fields,root:'data',id:_id}),baseParams:{flag:_noflag,roleid:_ddrRoleid,columnlist:_columnlist}});toStore=new Ext.data.Store({proxy:new Ext.data.HttpProxy({url:_url,method:"POST"}),reader:new Ext.data.JsonReader({fields:_fields,root:'data',id:_id}),baseParams:{flag:flag,roleid:_ddrRoleid,columnlist:_columnlist}});fromStore.load({callback:function(records,options,success){if(success){toStore.load({callback:function(records,options,success){if(success){Js.Center.Popedom.Department.DepartmentPrimission.DepartmentDataRoleWin.show();CreateTree()}else{Ext.Msg.alert("温馨提示","操作超时，请稍后再试");Js.Center.Popedom.Department.DepartmentPrimission.DepartmentDataRoleWin.close()}}})}else{Ext.Msg.alert("温馨提示","操作超时，请稍后再试");Js.Center.Popedom.Department.DepartmentPrimission.DepartmentDataRoleWin.close()}}})}}}]});var mainForm=permissionTablePanl.getForm();var permissionPanel=new Ext.Panel({autoScroll:true,frame:true,padding:'10 10 10 10',items:[{frame:true,html:'<div id="ddritemselector" class="demo-ct"></div>'}]});Js.Center.Popedom.Department.DepartmentPrimission.DepartmentDataRoleWin=new WXTL.Widgets.CommonWindows.Window({title:"部门数据角色授权",mainForm:mainForm,width:700,height:550,displayStore:Js.Center.Purview.DepartmentDataRole.Infostore,updateState:true,updateRecord:row,needButtons:false,items:[permissionTablePanl,permissionPanel],buttons:[{text:'保存',handler:function(){Ext.MessageBox.show({msg:'正在保存，请稍等...',progressText:'Saving...',width:300,wait:true,waitConfig:{interval:200},icon:'download',animEl:'saving'});setTimeout(function(){Ext.MessageBox.hide()},300000);updateDDRPermission(WXTL.Common.urlDecode(PermissionTree.getForm().getValues(true)).replace('itemselector=',''))}},{text:"取 消",minWidth:70,handler:function(){Js.Center.Popedom.Department.DepartmentPrimission.DepartmentDataRoleWin.close()}}],listeners:{"show":function(){permissionTablePanl.findById("ddrpernumtype").setValue("1");mainForm.loadRecord(row)}}})}else Js.Center.Popedom.Department.DepartmentPrimission.DepartmentDataRoleWin.updateRecord=row;fromStore.load({callback:function(records,options,success){if(success){toStore.load({callback:function(records,options,success){if(success){Js.Center.Popedom.Department.DepartmentPrimission.DepartmentDataRoleWin.show();CreateTree()}else{Ext.MessageBox.show({msg:'正在加载数据，请稍等...',progressText:'Loading...',width:300,wait:true,waitConfig:{interval:200},icon:'download',animEl:'saving'});setTimeout(function(){Ext.MessageBox.hide();Ext.Msg.alert("温馨提示","操作超时，请稍后再试")},2000)}}})}else{Ext.MessageBox.show({msg:'正在加载数据，请稍等...',progressText:'Loading...',width:300,wait:true,waitConfig:{interval:200},icon:'download',animEl:'saving'});setTimeout(function(){Ext.MessageBox.hide();Ext.Msg.alert("温馨提示","操作超时，请稍后再试")},2000)}}});function CreateTree(){Ext.get('ddritemselector').dom.innerHTML='';PermissionTree=new Ext.form.FormPanel({renderTo:'ddritemselector',frame:true,bodyStyle:'padding:10px,0px,0px,10px',autoScroll:true,items:[{anchor:',100%',xtype:"itemselector",name:"itemselector",fieldLabel:"数据权限",dataFields:_fields,toData:[""],msWidth:250,autoScroll:true,enableDD:false,msHeight:350,valueField:_valueField,displayField:_displayField,toLegend:"已选栏",fromLegend:"可选栏",fromStore:fromStore,toStore:toStore}]})};function updateDDRPermission(idlist){var params={flag:'updaterightByRoleid',datatypeid:Ext.get("ddrpermitnumtypeid").getValue(),dataids:idlist,roleid:Ext.get("ddrpermitroleid").getValue()};Js.Center.Popedom.Department.DepartmentPrimission.DepartmentDataRoleWin.mainFormSubmitFunc('',params,Js.Center.Purview.DepartmentDataRoleUpdateURL);}};Ext.namespace('Js.Center.Popedom.Department.DepartmentPermit');Js.Center.Popedom.Department.DepartmentPermit.func=function(departId,departName){if(Js.Center.Popedom.Department.DepartmentPermit.window==null){var departComboxTree=new WXTL.Widgets.CommonForm.ComboWithTree({name:'numdepartid',hiddenName:'numdepartid',fieldLabel:"部门名称",allowBlank:false,blankText:'请选择部门',valueField:'id',listHeight:'150',baseParams:{columnlist:"numdepartid,vc2departname",flag:'selectallchildbycurrentuser'},dataUrl:Js.Center.Popedom.DepartmentsQueryURL,listeners:{"select":function(a,b){southPanel.collapse(true);fromStore.load({params:{departid:b.id}});toStore.load({params:{departid:b.id}})}}});var departComboxTreePanl=new Ext.Panel({labelWidth:75,width:'95%',items:[{layout:'column',items:[{columnWidth:.6,layout:'form',defaults:{anchor:'90%',msgTarget:"side"},items:[departComboxTree]}]}]});var permissionDepartmentPanl=new Ext.form.FormPanel({frame:true,autoScroll:true,padding:'10 10 10 10',items:[departComboxTreePanl]});var fromStore=new Ext.data.Store({proxy:new Ext.data.HttpProxy({url:Js.Center.Popedom.UserFuncRoleURL,method:"POST"}),reader:new Ext.data.JsonReader({fields:["numroleid","vc2rolename"],root:'data',id:'numroleid'}),baseParams:{flag:"selectallbydepartid",columnlist:"numroleid,vc2rolename",typeid:0}});var toStore=new Ext.data.Store({proxy:new Ext.data.HttpProxy({url:Js.Center.Popedom.UserFuncRoleURL,method:"POST"}),reader:new Ext.data.JsonReader({fields:["numroleid","vc2rolename"],root:'data',id:'numroleid'}),baseParams:{flag:"selectallbydepartid",columnlist:"numroleid,vc2rolename",typeid:1}});var PermissionTree=new Ext.form.FormPanel({frame:true,bodyStyle:'padding:10px,0px,0px,10px',autoScroll:true,labelWidth:60,items:[{anchor:',100%',xtype:"itemselector",name:"itemselector",fieldLabel:"配置角色",dataFields:["numroleid","vc2rolename"],toData:[""],msWidth:250,autoScroll:true,enableDD:false,msHeight:200,valueField:'numroleid',displayField:'vc2rolename',toLegend:"已选栏",fromLegend:"可选栏",fromStore:fromStore,toStore:toStore,listeners:{"change":function(){southPanel.collapse(true)}}}]});var permissionRolePanel=new Ext.Panel({frame:true,height:240,items:[PermissionTree]});var ProductStore=new Ext.data.Store({proxy:new Ext.data.HttpProxy({url:Js.Center.Business.ProductURL,method:"POST"}),reader:new Ext.data.JsonReader({fields:["numprodid","vc2name"],root:'data',id:'numprodid'}),baseParams:{flag:"selectpermitbyroleids",columnlist:"numprodid,vc2name"}});var UserGroupStore=new Ext.data.Store({proxy:new Ext.data.HttpProxy({url:Js.Center.Business.UserGroupURL,method:"POST"}),reader:new Ext.data.JsonReader({fields:["numusergroupid","vc2usergroupname"],root:'data',id:'numusergroupid'}),baseParams:{flag:"selectpermitbyroleids",columnlist:"numusergroupid,vc2usergroupname"}});var treePanel=new Ext.tree.TreePanel({border:false,applyTo:'',root:new Ext.tree.AsyncTreeNode({id:"-1",text:"功能权限",loader:new Ext.tree.TreeLoader({url:Js.Center.Popedom.UserFuncRoleURL,listeners:{"beforeload":function(treeloader,node){var roleids=WXTL.Common.urlDecode(PermissionTree.getForm().getValues(true)).replace('itemselector=','');treeloader.baseParams={method:'POST',flag:'selectfuncpermitbyroleids',roleids:roleids}}}})}),rootVisible:true});var southPanel=new Ext.form.FormPanel({title:'部门功能汇集列表',width:'100%',id:"Js.Center.Popedom.Department.DepartmentPermit.southPanel",collapsible:true,collapsed:true,autoScroll:true,border:true,frame:true,items:[{layout:'column',items:[{columnWidth:.3,layout:'form',defaults:{anchor:"95%",msgTarget:"side"},buttonAlign:"center",items:[treePanel]},{columnWidth:.35,layout:'form',labelWidth:65,defaultType:"textfield",defaults:{anchor:"95%",msgTarget:"side"},buttonAlign:"center",items:[{xtype:"textarea",name:"productlist",id:'Js.Center.Popedom.Department.DepartmentPermit.ProductList',fieldLabel:"通道组列表",height:200,disabled:true}]},{columnWidth:.35,layout:'form',labelWidth:65,defaultType:"textfield",defaults:{anchor:"95%",msgTarget:"side"},buttonAlign:"center",items:[{xtype:"textarea",name:"usergrouplist",id:'Js.Center.Popedom.Department.DepartmentPermit.UserGroupList',fieldLabel:"客户组列表",height:200,disabled:true}]}]}],listeners:{"expand":function(a,b,c){var userUgoupNames="";var productNames="";var roleids=WXTL.Common.urlDecode(PermissionTree.getForm().getValues(true)).replace('itemselector=','');treePanel.root.reload();if(roleids!=""){var jsonProductList=eval(doSynRequest(Js.Center.Business.ProductURL+"?flag=selectpermitbyroleids&columnlist=numprodid,vc2name&roleids="+roleids));if(jsonProductList.data.length>0){for(var i=0;i<jsonProductList.data.length;i++){if(jsonProductList.data.length==1){productNames=jsonProductList.data[i].vc2name}else{if(i<(jsonProductList.data.length-1)){productNames+=jsonProductList.data[i].vc2name+","}if(i==(jsonProductList.data.length-1)){productNames+=jsonProductList.data[i].vc2name}}}}else{productNames="没有已授权的通道组！"}var jsonUserGroupList=eval(doSynRequest(Js.Center.Business.UserGroupURL+"?flag=selectpermitbyroleids&columnlist=numusergroupid,vc2usergroupname&roleids="+roleids));if(jsonUserGroupList.data.length>0){for(var i=0;i<jsonUserGroupList.data.length;i++){if(jsonUserGroupList.data.length==1){userUgoupNames=jsonUserGroupList.data[i].vc2usergroupname}else{if(i<(jsonUserGroupList.data.length-1)){userUgoupNames+=jsonUserGroupList.data[i].vc2usergroupname+","}if(i==(jsonUserGroupList.data.length-1)){userUgoupNames+=jsonUserGroupList.data[i].vc2usergroupname}}}}else{userUgoupNames="没有已授权的客户组！"}}else{productNames="没有已授权的通道组！";userUgoupNames="没有已授权的客户组！"}a.items.items[0].items.items[1].items.items[0].setValue(productNames);a.items.items[0].items.items[2].items.items[0].setValue(userUgoupNames)}}});var mainForm=permissionDepartmentPanl.getForm();this.window=new WXTL.Widgets.CommonWindows.Window({title:"配置部门权限",mainForm:mainForm,width:680,height:400,updateState:true,autoScroll:true,displayStore:Js.Center.Popedom.Department.Infostore,needButtons:false,items:[permissionDepartmentPanl,permissionRolePanel,southPanel],needLoadDataStore:true,loadDataStoreFunc:function(){departComboxTree.tree.root.reload();if(Js.Center.Popedom.Department.DepartmentPermit.window.updateRecord!=null){var node;if(Js.Center.Popedom.Department.DepartmentPermit.window.updateRecord.success==null){node={'id':Js.Center.Popedom.Department.DepartmentPermit.window.updateRecord.get("numdepartid"),'text':Js.Center.Popedom.Department.DepartmentPermit.window.updateRecord.get("vc2departname")}}else{node={'id':Js.Center.Popedom.Department.DepartmentPermit.window.updateRecord.numdepartid,'text':Js.Center.Popedom.Department.DepartmentPermit.window.updateRecord.vc2departname}}departComboxTree.setValue(node);departComboxTree.disable()}else{departComboxTree.enable()}fromStore.load({params:{departid:departComboxTree.getValue()}});toStore.load({params:{departid:departComboxTree.getValue()}})},buttons:[{text:'保存',handler:function(){if(mainForm.isValid()){Ext.MessageBox.show({msg:'正在保存，请稍等...',progressText:'Saving...',width:300,wait:true,waitConfig:{interval:200},icon:'download',animEl:'saving'});setTimeout(function(){Ext.MessageBox.hide()},3000);updateDDRPermission(WXTL.Common.urlDecode(PermissionTree.getForm().getValues(true)).replace('itemselector=',''))}}},{text:"取 消",minWidth:70,handler:function(){Js.Center.Popedom.Department.DepartmentPermit.window.hide()}}]});function updateDDRPermission(idlist){var params={flag:'updatedepartrolebyroleids',departid:departComboxTree.getValue(),roleids:idlist};Js.Center.Popedom.Department.DepartmentPermit.window.mainFormSubmitFunc('',params,Js.Center.Popedom.UserFuncRoleUpdateURL)}}};Ext.namespace('Js.Center.Popedom.DepartmentUpdate');Ext.QuickTips.init();Js.Center.Popedom.DepartmentUpdate.func=function(row){var updateInfoFormPanel=new Ext.form.FormPanel({frame:true,region:'center',labelWidth:80,items:[{layout:'column',items:[{xtype:"hidden",name:"flag",value:"updateall"},{xtype:"hidden",name:"numdepartid",id:"Js.Center.Popedom.DepartmentUpdate.numdepartid"},{columnWidth:.5,layout:'form',defaultType:"textfield",defaults:{anchor:"90%",msgTarget:"side"},buttonAlign:"center",bodyStyle:"padding:0px 0 0px 15px",items:[{xtype:"hidden",name:"numparentdepart",id:'Js.Center.Popedom.DepartmentUpdate.ParentId',fieldLabel:"上级部门ID"},{xtype:"textfield",name:"vc2parentdepartname",id:'Js.Center.Popedom.DepartmentUpdate.ParentName',fieldLabel:"<font color=red>上级部门</font>",readOnly:true},{xtype:"textfield",name:"vc2dcode",fieldLabel:"<font color=red>部门编码</font>",allowBlank:false,blankText:"部门编码不允许为空",regex:WXTL.Common.regex.Illegal,regexText:WXTL.Common.regexText.IllegalText,maxLength:20},{xtype:"textfield",name:"numorder",fieldLabel:"<font color=red>部门顺序</font>",allowBlank:false,blankText:"部门顺序不允许为空",regex:/^\d{1,5}$/,regexText:'只能输入5位以内的正整数！'},{xtype:"textfield",name:"vc2linkman",fieldLabel:"<font color=red>联系人</font>",allowBlank:false,blankText:"联系人不允许为空",regex:WXTL.Common.regex.Illegal,regexText:WXTL.Common.regexText.IllegalText,maxLength:50}]},{columnWidth:.5,layout:'form',defaultType:"textfield",defaults:{anchor:"90%",msgTarget:"side"},buttonAlign:"center",bodyStyle:"padding:0px 0 0px 15px",items:[{xtype:"textfield",name:"vc2departname",id:"Js.Center.Popedom.DepartmentUpdate.vc2departname",fieldLabel:"<font color=red>部门名称</font>",allowBlank:false,blankText:"部门名称不允许为空",regex:WXTL.Common.regex.Illegal,regexText:WXTL.Common.regexText.IllegalText,maxLength:25},{xtype:"hidden",name:"numcheckstate",fieldLabel:"<font color=red>审核机制</font>",displayField:"state",mode:"local",valueField:"value",readOnly:true,allowBlank:false,blankText:"审核机制不允许为空",value:'0',triggerAction:'all',anchor:'90%',msgTarget:"side",store:new Ext.data.SimpleStore({data:[["无审核","0"],["一审功能","1"]],fields:["state","value"]})},{xtype:"textfield",name:"vc2handset",fieldLabel:"<font color=red>手机号码</font>",allowBlank:false,blankText:"手机号码不允许为空",regex:WXTL.Common.regex.Mobile,regexText:"手机号码格式不正确"},{xtype:"textfield",name:"vc2tel",fieldLabel:"<font color=red>电话</font>",allowBlank:false,blankText:"电话不允许为空",regex:WXTL.Common.regex.Phone,regexText:"电话格式不正确"},{xtype:"textfield",name:"vc2postcode",fieldLabel:"<font color=red>邮编</font>",allowBlank:false,blankText:"邮编不允许为空",regex:WXTL.Common.regex.PostCode,regexText:"邮编格式不正确"}]}]},{layout:'form',defaultType:"textfield",defaults:{anchor:"95%",msgTarget:"side"},buttonAlign:"center",bodyStyle:"padding:0px 0 0px 15px",items:[{xtype:"textfield",name:"vc2address",fieldLabel:"通信地址",regex:WXTL.Common.regex.Illegal,regexText:WXTL.Common.regexText.IllegalText,maxLength:100},{height:100,xtype:"textarea",name:"vc2departdesc",fieldLabel:"备注",regex:WXTL.Common.regex.Illegal,regexText:WXTL.Common.regexText.IllegalText,maxLength:100}]}]});var root=new Ext.tree.AsyncTreeNode({id:"-1",text:"部门",expanded:true,loader:new Ext.tree.TreeLoader({url:Js.Center.Popedom.DepartmentsQueryURL,listeners:{"beforeload":function(treeloader,node){treeloader.baseParams={flag:'selectallbycurrentuser',parentid:node.id,columnlist:'numdepartid,vc2departname,numlevel,vc2levelpath',method:'POST'}},"load":function(loader,node,response){var childNodes=node.childNodes;if(Js.Center.Popedom.DepartmentUpdate.window.updateRecord)var nodeParentId="s"+Js.Center.Popedom.DepartmentUpdate.window.updateRecord.get("numparentdepart");for(i=0;i<childNodes.length;i++){if(childNodes[i].id==nodeParentId){childNodes[i].select();}}}}})});var treePanel=new Ext.tree.TreePanel({border:false,applyTo:'',root:root,collapsed:false,animate:true,rootVisible:false,autoScroll:true,height:284});var node=treePanel.root.findChild('id','s1');var westPanel=new Ext.Panel({frame:false,collapsible:false,border:false,width:180,autoScroll:true,region:"west",title:'部门结构',items:[treePanel]});var mainPanel=new Ext.Panel({width:700,height:300,frame:false,layout:'border',border:true,items:[westPanel,updateInfoFormPanel]});var mainForm=updateInfoFormPanel.getForm();this.window=new WXTL.Widgets.CommonWindows.Window({width:700,title:"修改部门",mainForm:mainForm,updateURL:Js.Center.Popedom.DepartmentsUpdateURL,displayStore:Js.Center.Popedom.Department.Infostore,updateState:true,updateRecord:row,items:[mainPanel],needButtons:false,listeners:{"beforeshow":function(){root.reload();treePanel.expandAll()},"show":function(){}},buttons:[new Ext.Button({text:'保存退出',minWidth:70,qtip:"保存退出",handler:function(){if(mainForm.isValid()){Ext.MessageBox.show({msg:'正在保存，请稍等...',progressText:'Saving...',width:300,wait:true,icon:'download',animEl:'saving'});setTimeout(function(){Ext.MessageBox.hide()},300000);Js.Center.Popedom.DepartmentUpdate.window.mainFormSubmitFunc()}}}),new Ext.Button({text:'重填',qtip:"重填",minWidth:70,handler:function(){updateInfoFormPanel.getForm().reset();updateInfoFormPanel.getForm().loadRecord(Js.Center.Popedom.DepartmentUpdate.window.updateRecord)}}),new Ext.Button({text:'下一步',qtip:"下一步",minWidth:70,handler:function(){if(mainForm.isValid()){mainForm.submit({url:Js.Center.Popedom.DepartmentsUpdateURL,method:"POST",success:function(form,action){var objJson=Ext.util.JSON.decode(action.response.responseText);var falg=objJson.success;if(falg==true){Js.Center.Popedom.DepartmentUpdate.window.hide();Js.Center.Popedom.Department.Infostore.reload({callback:function(){Js.Center.Popedom.Department.DepartmentPermit.window.updateRecord=Js.Center.Popedom.Department.Infostore.getById(Js.Center.Popedom.DepartmentUpdate.window.updateRecord.get("numdepartid"));Js.Center.Popedom.Department.DepartmentPermit.window.show()}})}else Ext.Msg.alert('温馨提示',objJson.info)},failure:function(form,action){var objJson=Ext.util.JSON.decode(action.response.responseText);Ext.Msg.alert('温馨提示',objJson.info)}})}}}),new Ext.Button({text:'关闭',qtip:"关闭",minWidth:70,handler:function(){Js.Center.Popedom.DepartmentUpdate.window.hide()}})]});};Ext.namespace('Js.Center.Popedom');Js.Center.Popedom.DepartmentsUpdateURL='URL/Temp_Purview/departments/departmentsupdate.ashx';Js.Center.Popedom.DepartmentsQueryURL='URL/Temp_Purview/departments/departmentsquery.ashx';