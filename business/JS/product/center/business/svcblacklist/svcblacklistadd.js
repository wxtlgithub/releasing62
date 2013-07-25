/*
*添加系统黑名单
*/
Ext.namespace('Js.Center.Business.SvcBlacklistAdd');
Ext.QuickTips.init();

Js.Center.Business.SvcBlacklistAdd.func = function(){
	Js.Center.Common.BusinessGatewayStore.reload();
	if (Js.Center.Business.SvcBlacklistAdd.window == null) {
		//============================================================================ 定义文件formpanel
		var addByFilePanel = new Ext.form.FormPanel({
			title: "文件方式",
			width: 600,
			border: false,
			fileUpload: true,
			frame: true,
			labelWidth: 80,
			defaults: {
				msgTarget: "side"
			},
			items: [{ xtype: "hidden",
				name: "blacktype",
				value: 6
            },{
             	xtype: "lovcombo",
                name: "numgwid",
                fieldLabel: "<font color=red>网关名称</font>",
                emptyText: '-=请选择=-',
                hiddenName: "numgwid",
                readOnly: true,
                mode: "local",
                isNeedDefaultChoose: false,
                store:Js.Center.Common.BusinessGatewayStore,
                triggerAction: 'all',
                selectOnFocus: true,
                //forceSelection: true, // 要求输入值必须在列表中存在
                displayField: 'vc2gatewayname',
                valueField: 'numgwid',
                allowBlank: false,
                width: 500,
                expandSelect: function(){
            		var c = [];
            		c = this.getRawValue().split(this.separator);
            		// store may be filtered so get all records
            		var snapshot = this.store.snapshot || this.store.data;	
            		var displayField = this.displayField;
            		//去掉请选择项
//    				if(r.get(this.valueField) == ''){
//    					this.store.removeAt(this.store.indexOf(r));
//    				}
            		var isTrue = false;		
            		if(this.getRawValue().indexOf(this.separator) > -1){
            			snapshot.each(function(r) {
            				isTrue = false;	
            				for(var i= 0; i<c.length; i++){
            					if(r.get(displayField) == c[i].replace(/(^\s*)|(\s*$)/g, "")) {
            						isTrue = true;	
            						break;	
            					}
            				}
            				r.set(this.checkField, isTrue);
            			}, this);
            		}
            		else if(this.getRawValue() != ""){
            			snapshot.each(function(r) {
            				isTrue = false;	
            				if(r.get(displayField) == c) {
            					isTrue = true;			
            				}
            				r.set(this.checkField, isTrue);
            			}, this);
            		}
            		else{
            			snapshot.each(function(r) {
            				r.set(this.checkField, false);
            				//去掉请选择项
            				if(r.get(this.valueField) == ''){
            					this.store.removeAt(this.store.indexOf(r));
            				}
            			}, this);
            		}	
            		this.store.data = snapshot;	
            	} ,
                blankText: "网关名称必选"
            },{
				xtype: 'fileuploadfield',
				name: 'mobilefile',
				fieldLabel: WXTL.Common.help.MOBILEFILE,
				allowBlank: false,
				blankText: "请选择上传文件",
				width: 500,
				//inputType: 'file',
				validator: function(){
					var filePath = mainForm.items.items[2].getValue();
					if (filePath != '') {
						mainForm.items.items[3].el.dom.value = getFileMessage(filePath);
						if (checkFile(filePath) != '') {
							this.invalidText = checkFile(filePath);
							return false;
						}
						else {
							return true;
						}
					}
					else 
						return false;
				}
			}, {
				xtype: 'textarea',
				name: 'filemessage',
				//id: 'blacklistaddfilemessage',
				fieldLabel: '文件信息',
				readOnly: true,
				width: 500,
				height: 80
			},
			{
				xtype: 'hidden',
				name: 'flag',
				value: 'insertbyfile'
			}, 
			{
				xtype: 'textarea',
				name: 'remark',
				fieldLabel: '<font color=red>原因备注</font>',
				width: 500,
				height:80,
				allowBlank: false,
                blankText: "备注不能为空",
                maxLength   : 200,
                maxLengthText  : "请输入小于200字"
			}]
		});
		//============================================================================ 定义列表formpanel	
		var addByListPanel = new Ext.form.FormPanel({
			title: "列表方式",
			width: 600,
			border: false,
			frame: true,
			labelWidth: 80,
			defaults: {
				msgTarget: "side"
			},
			items: [{xtype: "hidden",
				name: "blacktype",
				value: 6
			},{
             	xtype: "lovcombo",
                name: "numgwid",
                id : "Js.center.business.lovcombo.bwlist",
                fieldLabel: "<font color=red>网关名称</font>",
                hiddenName: "numgwid",
                readOnly: true,
                mode: "local",
                store: Js.Center.Common.BusinessGatewayStore,
                triggerAction: 'all',
//                selectAll:true,
                selectOnFocus: true,
                width: 300,
                emptyText: '-=请选择=-',
                //forceSelection: true, // 要求输入值必须在列表中存在
                displayField: 'vc2gatewayname',
                valueField: 'numgwid',
                allowBlank: false,
                expandSelect: function(){
            		var c = [];
            		c = this.getRawValue().split(this.separator);
            		// store may be filtered so get all records
            		var snapshot = this.store.snapshot || this.store.data;	
            		var displayField = this.displayField;
            		
            		var isTrue = false;		
            		if(this.getRawValue().indexOf(this.separator) > -1){
            			snapshot.each(function(r) {
            				isTrue = false;	
            				for(var i= 0; i<c.length; i++){
            					if(r.get(displayField) == c[i].replace(/(^\s*)|(\s*$)/g, "")) {
            						isTrue = true;	
            						break;	
            					}
            				}
            				r.set(this.checkField, isTrue);
            			}, this);
            		}
            		else if(this.getRawValue() != ""){
            			snapshot.each(function(r) {
            				isTrue = false;	
            				if(r.get(displayField) == c) {
            					isTrue = true;			
            				}
            				r.set(this.checkField, isTrue);
            			}, this);
            		}
            		else{
            			snapshot.each(function(r) {
            				r.set(this.checkField, false);
            				if(r.get(this.valueField) == ''){
            					this.store.removeAt(this.store.indexOf(r));
            				}
            			}, this);
            		}	
            		this.store.data = snapshot;	
//            		this.selectAll;
//            		this.selectAll;
            	} ,
                blankText: "网关名称必选"
            },{
				xtype: 'textarea',
				name: 'mobilelist',
				fieldLabel: WXTL.Common.help.MOBILELIST,
				width: 300,
				height: 100,
				allowBlank: false,
				blankText: "请输入手机号码列表",
				validator: function(value){
					return checkMobileList(value, 1000);
				}
			}, 
			{
				xtype: 'textarea',
				name: 'remarklist',
				fieldLabel: '<font color=red>原因备注</font>',
				width: 300,
				height:100,
				allowBlank: false,
                blankText: "备注不能为空",
                maxLength   : 200,
                maxLengthText  : "请输入小于200字"
			},
			{
				xtype: 'hidden',
				name: 'flag',
				value: 'insertbylist'
			}]
		});
		var mainForm = addByFilePanel.getForm();
		//============================================================================ 定义tabpanel
		var tabPanel = new Ext.TabPanel({
			height: 300,
			border: false,
			width: 650,
			activeTab: 0, //默认激活第一个tab页
			animScroll: true, //使用动画滚动效果
			enableTabScroll: true, //tab标签超宽时自动出现滚动按钮
			items: [addByFilePanel, addByListPanel],
			listeners: {
				"tabchange": function(TabPanel, Panel){
					if (Js.Center.Business.SvcBlacklistAdd.window) {
						mainForm = Panel.getForm();
						Js.Center.Business.SvcBlacklistAdd.window.mainForm = mainForm;
					}
				}
			}
		});
		//============================================================================ 定义窗体
		this.window = new WXTL.Widgets.CommonWindows.Window({
			title: "添加通道黑名单",
			mainForm: mainForm,
			updateURL: Js.Center.Business.SvcBlackUpdateURL,
			displayStore: Js.Center.Business.SvcBlacklistAdd.Infostore,
			items: [tabPanel],
			listeners:{
			    "show":function (){
			       Js.Center.Business.SvcBlacklistAdd.window.items.items[0].setActiveTab(0);
			       Js.Center.Business.SvcBlacklistAdd.window.items.items[0].items.items[0].getForm().reset();
			       Js.Center.Business.SvcBlacklistAdd.window.items.items[0].items.items[1].getForm().reset();
			    }
			}
		});
	};
};