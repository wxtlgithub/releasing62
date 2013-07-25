Ext.namespace('Js.Center.SendMMS.MMSSendDiy');

Js.Center.SendMMS.MMSSendDiy.MMSinfo = function(){
    if (Ext.get("Js.Center.SendMMS.MMSSendDiy.MainPanel") == null) {
        //============================================================================����GridPanel���
        // ��ҳÿҳ��ʾ����
        var _pageSize = 5;
        //==============================================================Grid���ݶ���
        var fields = ["nummmsid", "vc2name", "vc2centerid","datcreatetime", "numuserid","vc2username", "datmodifytime", "numcheckuserid", "datchecktime", "vc2smilurl", "numstate", "nummmstype", "datcreattime", "nummoduserid", "vc2modusername","vc2desc"];
        Js.Center.SendMMS.MMSSendDiy.Infostore = new WXTL.Widgets.CommonData.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.SendMMS.MMSQueryListURL,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                fields: fields,
                root: "data",
                id: "nummmsid",
                totalProperty: "totalCount"
            
            }),
            sortInfo: {
                        field: 'datcreattime',
                        direction: 'DESC'
                    },//���������Ч����
            baseParams: {
                datcreattimestart: Ext.util.Format.date(WXTL.Common.dateTime.addDay(WXTL.Common.dateTime.getNow(), -7/*��3��*/), 'Y-m-d'), //��������ʼʱ�䣩
                datcreattimeend: Ext.util.Format.date(WXTL.Common.dateTime.getNow(), 'Y-m-d'), //����������ʱ�䣩
                mmsname: '',
                numcreater: '',
                numMMSType:'2',
                flag: 'selectByMMSType'
            }
        });

        //==============================================================��ѡ��ģʽ
        var sm = new Ext.grid.CheckboxSelectionModel({
            dataIndex: "nummmsid"
        });
        //==============================================================��ͷ
        var cm = new Ext.grid.ColumnModel([{
            hidden: true,
            header: "���ű��",
            tooltip: "���ű��",
            dataIndex: "nummmsid",
            sortable: true
        }, {
			header: "���ű���",
			tooltip: "���ű���",
			dataIndex: "vc2name",
			sortable: true
		},{
			header: "��������",
			tooltip: "��������",
			dataIndex: "vc2desc",
			sortable: true
		},{
            header: "������",
            tooltip: "������",
            dataIndex: "vc2username",
            sortable: true
        }, {
            header: "����ʱ��",
            tooltip: "����ʱ��",
            dataIndex: "datcreatetime",
            sortable: true
        }, {
            header: "�޸���",
            tooltip: "����޸���",
            dataIndex: "vc2modusername",
            sortable: true
        }, {
            header: "�޸�ʱ��",
            tooltip: "����޸�ʱ��",
            dataIndex: "datmodifytime",
            sortable: true
        }, {
            header: "��Դ���",
            tooltip: "��Դ���",
            dataIndex: "vc2centerid",
            sortable: true,
            renderer: function(value, meta, record, rowIndex, colIndex, store){
            	if (record.get('vc2centerid') == '') {
            		
           		 return "<a href='#' onclick='Js.Center.SendMMS.SENDresourceUpload.func(" + record.get('nummmsid') + ",1)'>�ϴ���Դ</a>";
           	}else{
           		Js.Center.SendMMS.MMSSendDiy.MMSSendPanel.items.items[0].items.items[2].items.items[4].setValue( record.get('vc2centerid'));
           	}
               return record.get('vc2centerid');
           }
        }, {
            header: "����Ԥ��",
            tooltip: "����Ԥ��",
            dataIndex: "nummmsid",
            width: 60,
            renderer: function(value, meta, record, rowIndex, colIndex, store){
            	if (record.get('nummmstype') == 2) {
            		return "<a href='#' onclick='Js.Center.SendMMS.MMSsendPreview.func(\"selectmms\"," + value + ",\"0\",\"Js.Center.SendMMS.MMSsendUpdate.sendtestcurdiy\")'>����Ԥ��</a>";
            	}
                return "<a href='#' onclick='Js.Center.SendMMS.MMSsendPreview.func(\"selectmms\"," + value + ",\"0\",\"Js.Center.SendMMS.MMSsendUpdate.sendtestcur\")'>����Ԥ��</a>";
            }
        }]);
        
        //==============================================================����grid
        var MMSSendDiyGrid = new WXTL.Widgets.CommonGrid.GridPanel({
            title: "",
            id: "Js.Center.SendMMS.MMSSendDiy.GridPanel",
            anchor: '100% 100%',
            pageSize: _pageSize,
            needMenu: false,
            needRightMenu: false,
            width: 400,
            store: Js.Center.SendMMS.MMSSendDiy.Infostore,
            sm: sm,
            cm: cm,
            listeners: {
                "rowclick": function(grid, rowindex, e){
                    Js.Center.SendMMS.MMSSendDiy.MMSSendPanel.items.items[0].items.items[0].items.items[3].setValue(grid.store.data.items[rowindex].data.nummmsid);
                    Js.Center.SendMMS.MMSSendDiy.MMSSendPanel.items.items[0].items.items[2].items.items[4].setValue(grid.store.data.items[rowindex].data.vc2centerid);
                }
            }
        });
        
        //============================================================================ ����formpanel
        var selectPanel = new WXTL.Widgets.CommonPanel.QueryFormPanel({
            id: "Js.Center.SendMMS.MMSsenddiysend.columnSelectPanel",
            title: "",
			labelWidth:55,
            queryMethod: "Js.Center.SendMMS.MMSSendDiy.queryGrid",
            height: 55,
            width: 400,
            frame: false,
            defaults: {
                msgTarget: "side"
            },
            items: [{
                layout: 'column',
                items: [{
                    columnWidth: .33,
                    layout: 'form',
                    defaultType: "textfield",
                    //ê�㲼��-
                    defaults: {
                        anchor: "90%",
                        msgTarget: "side"
                    },
                    buttonAlign: "center",
                    bodyStyle: "padding:0 0 0 15px",
                    items: [new Ext.form.DateField({
                        fieldLabel: "��ʼʱ��",
                        format: 'Y-m-d',
                        labelWidth: 100,
                        bodyStyle: 'padding:5px 5px 0',
                        readOnly: true,
                        emptyText: Ext.util.Format.date(WXTL.Common.dateTime.addDay(WXTL.Common.dateTime.getNow(), -7/*��3��*/), 'Y-m-d'),
                        fieldLabel: "��ʼʱ��",
                        name: "datcreattimestart",
                        id: "Js.Center.SendMMS.MMSsendDiy.DatCreatTimeStart",
                        validateOnBlur: false,
                        validator: function(){
                        var strat_time = Ext.get("Js.Center.SendMMS.MMSsendDiy.DatCreatTimeStart").dom.value;
                        var end_time = Ext.get("Js.Center.SendMMS.MMSSendDiy.DatCreatTimeEnd").dom.value;
                        if (strat_time <= end_time) {
                            return true;
                        }
                        else {
                            return false;
                        }
                        },
                        invalidText: '����ʱ�䲻��С�ڿ�ʼʱ�䣡'
                        
                    })]
                }, {
                    columnWidth: .33,
                    layout: 'form',
                    defaultType: "textfield",
                    //ê�㲼��-
                    defaults: {
                        anchor: "90%",
                        msgTarget: "side"
                    },
                    buttonAlign: "center",
                    bodyStyle: "padding:0 0 0 15px",
                    items: [new Ext.form.DateField({
                        fieldLabel: "����ʱ��",
                        labelWidth: 100,
                        format: 'Y-m-d',
                        bodyStyle: 'padding:5px 5px 0',
                        readOnly: true,
                        emptyText: Ext.util.Format.date(WXTL.Common.dateTime.getNow(), 'Y-m-d'),
                        name: "datcreattimeend",
                        id: "Js.Center.SendMMS.MMSSendDiy.DatCreatTimeEnd",
                        validateOnBlur: false,
                        validator: function(){
                        var strat_time = Ext.get("Js.Center.SendMMS.MMSsendDiy.DatCreatTimeStart").dom.value;
                        var end_time = Ext.get("Js.Center.SendMMS.MMSSendDiy.DatCreatTimeEnd").dom.value;
                        if (strat_time <= end_time) {
                            return true;
                        }
                        else {
                            return false;
                        }
                        },
                        invalidText: '����ʱ�䲻��С�ڿ�ʼʱ�䣡'
                        
                    })]
                },{
                    columnWidth: .33,
                    layout: 'form',
                    defaultType: "textfield",
                    //ê�㲼��-
                    defaults: {
                        anchor: "90%",
                        msgTarget: "side"
                    },
                    buttonAlign: "center",
                    bodyStyle: "padding:0 0 0 15px",
                    items: [new Ext.form.TextField({
                        fieldLabel: '���ű���',
                        name: 'mmsname',
                        id: 'Js.Center.SendMMS.MMSSendDiy.mmsName',
                        regex: WXTL.Common.regex.IllegalDiy,
                        regexText: WXTL.Common.regexText.IllegalText,
                        maxLength: 100
                    })]
                }]
            }]
        });
        
        //============================================================== �����ѯ��ť�¼�����
        Js.Center.SendMMS.MMSSendDiy.queryGrid = function(){
            if (selectPanel.getForm().isValid()) {
                var datCreatTimeStart = Ext.get("Js.Center.SendMMS.MMSsendDiy.DatCreatTimeStart").getValue();
                var datCreatTimeend = Ext.get("Js.Center.SendMMS.MMSSendDiy.DatCreatTimeEnd").getValue();
                var mmsName = Ext.get("Js.Center.SendMMS.MMSSendDiy.mmsName").getValue();
                var flag = 'selectByMMSType';
                Js.Center.SendMMS.MMSSendDiy.Infostore.baseParams = {
                    datcreattimestart: datCreatTimeStart,
                    datcreattimeend: datCreatTimeend,
                    mmsname: mmsName,
                    numcreater: '',
                    numMMSType:'2',
                    flag: flag
                };
                Js.Center.SendMMS.MMSSendDiy.Infostore.load({
                    params: {
                        start: 0,
                        limit: _pageSize
                    }
                });
            }
        };
        
        //============================================================================������panel
        Js.Center.SendMMS.MMSSendDiy.MainPanel = new Ext.Panel({
            title: "ѡ�����",
            id: "Js.Center.SendMMS.MMSSendDiy.MainPanel",
            margins: '3 3 3 3',
            cmargins: '3 3 3 3',
            frame: true, // ��Ⱦ���
            bodyWidth: 0,
            autoScroll: true, // �Զ���ʾ������
            layout: "anchor",
            defaults: {
                collapsible: true // ����չ��������
            },
            items: [selectPanel, MMSSendDiyGrid]
        });
        
        //============================================================================�󶨵�center
    }
};
