﻿Ext.namespace('Js.Center.System.SvcDirtyWordAdd');
Ext.QuickTips.init();
//增加通道敏感词
Js.Center.System.SvcDirtyWordAdd.func = function(){
	var queryString = '';
	
    // ======================================================================== 定义FormPanel
    var addSvcDirtyWordInfofp = new Ext.form.FormPanel({
        id: "addSvcDirtyWordInfofp",
        //width: 600,
        frame: true,
        labelWidth: 80,
        items: [{
            layout: 'column',
            items: [{
                xtype: "hidden",
                name: "flag",
                value: "insert"
            }, {
                columnWidth: .5,
                layout: 'form',
                defaultType: "textfield",
                //锚点布局-
                defaults: {
                    anchor: "90%",
                    msgTarget: "side"
                },
                buttonAlign: "center",
                bodyStyle: "padding:10px 0 10px 15px",
                items: [{
                    xtype: "textfield",
                    name: "vc2dirtyword",
                    fieldLabel: "<font color=red>内容</font>",
                    allowBlank: false,
                    blankText: "内容不允许为空",
                    regex: WXTL.Common.regex.Illegal,
                    regexText: WXTL.Common.regexText.IllegalText,
                    maxLength: 25,
					maxLengthText:'长度不能超过25！'
                },{
                        xtype: "lovcombo",
                        name: "numgwid",
                        fieldLabel: "<font color=red>网关名称</font>",
                        hiddenName: "numgwid",
                        mode: "local",
                        store: Js.Center.Common.BusinessGatewayStore,
                        triggerAction: 'all'
                        	,expandSelect: function(){
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
                        			}, this);
                        		}	
//                        		this.store.data = snapshot;	
                        	}
                        	,onSelect:function(record, index) {
                                if(this.fireEvent('beforeselect', this, record, index) !== false){
                                	// toggle checked field
                        			record.set(this.checkField, !record.get(this.checkField));
                        			if(this.store.isFiltered()) {	
                        				this.doQuery(this.allQuery);
                        			}
                        			getQueryString(this);
                        			this.setValue(this.getCheckedValue());
                                    this.fireEvent('select', this, record, index);
                                    this.expandSelect();
                                }
                        	}
                        ,setValue:function(v) {
                    		if(v) {
                    			v = '' + v;
                    			if(this.valueField) {
                    				this.store.clearFilter();
                    				this.store.each(function(r) {
                    					var checked = !(!v.match(
                    						 '(^|' + this.separator + ')' + RegExp.escape(r.get(this.valueField))
                    						+'(' + this.separator + '|$)'));
                    					r.set(this.checkField, checked);
                    				}, this);
                    				this.value = this.getCheckedValue();
                    				if(queryString!=null && queryString != ''){
                        				this.setRawValue(this.getCheckedDisplay()+","+queryString);
                        			}else{
                    					this.setRawValue(this.getCheckedDisplay());
                    				}
                    				if(this.hiddenField) {
                    					this.hiddenField.value = this.value;
                    				}
                    			}
                    			else {
                    				this.value = v;
                    				this.setRawValue(v);
                    				if(this.hiddenField) {
                    					this.hiddenField.value = v;
                    				}
                    			}
                    			if(this.el) {
                    				this.el.removeClass(this.emptyClass);
                    			}
                    			fiter(this);
                    		}
                    		else {
                    			this.clearValue();
                    		}
                    	} // eo function setValue
                        ,onBeforeQuery:function(qe) {
                    		qe.query = qe.query.replace(new RegExp(this.getCheckedDisplay() + '[ ' + this.separator + ']*'), '');
                    	},
                        selectOnFocus: true,
                        emptyText: '-=请选择=-',
                        //forceSelection: true, // 要求输入值必须在列表中存在
                        displayField: 'vc2gatewayname',
                        valueField: 'numgwid',
                        allowBlank: false,
                        blankText: "网关名称必选"
                    }]
            }, {
                columnWidth: .5,
                layout: 'form',
                defaultType: "textfield",
                //锚点布局-
                defaults: {
                    anchor: "90%",
                    msgTarget: "side"
                },
                buttonAlign: "center",
                bodyStyle: "padding:10px 0 10px 15px",
                items: [{
                    xtype: "combo",
                    name: "numdirtytype",
                    fieldLabel: "<font color=red>分类</font>",
                    hiddenName: "numdirtytype",
                    allowBlank: false,
                    blankText: "分类不允许为空",
                    readOnly: true,
                    mode: "local",
					emptyText:"请选择",
                    displayField: "vc2name",
                    valueField: "numdirtytype",
                    triggerAction: "all",
                    store: Js.Center.System.SvcDirtyWord.DirtywordTypeStore
                },new Ext.form.DateField({
                    fieldLabel: '有效时间',
                    name: 'dateffectend',
                    readOnly: true,
                    showToday:true,
                    clearDate:true,
                    format: 'Y-m-d',
                    validateOnBlur: false,
                    minValue:WXTL.Common.dateTime.getNow(),
            		minText:"有效时间小于今天"
                })]
            }]
        }]
    });
    function fiter(lovcombo){
    	if(queryString !=null && queryString != ''){
    		var snapshot = lovcombo.store.snapshot || lovcombo.store.data;
    		lovcombo.store.filter(lovcombo.displayField, queryString, true, false ); 
    	}
    }
    function getQueryString(lovcombo){
    	if(lovcombo.getRawValue().indexOf(lovcombo.separator) > -1){
    		var snapshot = lovcombo.store.snapshot || lovcombo.store.data;
    		var c = [];
    		c = lovcombo.getRawValue().split(lovcombo.separator);
    			for(var i= 0 ; i < c.length; i++){
    				if(c[i] == queryString){
    					break;
    				}else{
    					var ishad = false;
    					snapshot.each(function(r) {
    						if(r.get(lovcombo.displayField) == c[i]) {
    							ishad = true;
    						}
    						}, this);
    					if(!ishad){
    						queryString = c[i] ;
    					}
    				}
    			}
    	}else{
    		queryString =lovcombo.getRawValue();
    	}
    }
    Js.Center.Common.BusinessGatewayStore.reload();
    // ======================================================================= 定义窗体
        var mainForm = addSvcDirtyWordInfofp.getForm();
        this.window = new WXTL.Widgets.CommonWindows.Window({
            title: "添加敏感词",
            mainForm: mainForm,
            updateURL: Js.Center.System.SvcDirtyWordUpdateURL,
            displayStore: Js.Center.System.SvcDirtyWord.Infostore,
            items: [addSvcDirtyWordInfofp]
        });
    
   
};
