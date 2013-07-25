// �������ڵ�
var root = new Ext.tree.TreeNode(
{
   text : '�˵����ڵ�',
   href : '12-12-right0.html', // ���ýڵ��Ӧ������
   hrefTarget : 'main', // ����չʾ����ҳ���Ŀ����
   expanded : true// Ĭ��չ�����ڵ�
}
);
// Ϊ���ڵ�����ӽڵ�
root.appendChild(new Ext.tree.TreeNode(
{
   href : '12-12-right1.html',
   hrefTarget : 'main',
   text : 'һ���˵�A'
}
))
root.appendChild(new Ext.tree.TreeNode(
{
   href : '12-12-right2.html',
   hrefTarget : 'main',
   text : 'һ���˵�B'
}
))
// ����Tree������
var tree = new Ext.tree.TreePanel(
{
   title : '���β˵�',
   applyTo : document.body,
   root : root
}
)
// ������
var west = new Ext.Panel(
{
   // �Զ�������ť
   collapsible : true,
   border : false,
   width : 225,
   layout : "accordion",
   extraCls : "roomtypegridbbar",
   // ��Ӷ���Ч��
   layoutConfig :
   {
      animate : true
   }
   ,
   region : "west",
   title : 'MARRIOTT MANAGEMENT SYSTEM',
   //
   items : [
   {
      title : "<b>Management Menu</b>",
      autoScroll : true,
      iconCls : "hotelmanageicon",
      items : [tree]
   }
   ]

}
);
// �ر�TabPanel��ǩ
Ext.ux.TabCloseMenu = function()
{
   var tabs, menu, ctxItem;
   this.init = function(tp)
   {
      tabs = tp;
      tabs.on('contextmenu', onContextMenu);
   }
   function onContextMenu(ts, item, me)
   {
      if ( ! menu)
      {
         // create context menu on first right click
         menu = new Ext.menu.Menu([
         {
            id : tabs.id + '-close',
            text : '�رյ�ǰ��ǩ',
            iconCls : "closetabone",
            handler : function()
            {
               tabs.remove(ctxItem);
            }
         }
         ,
         {
            id : tabs.id + '-close-others',
            text : '����֮��ȫ���ر�',
            iconCls : "closetaball",
            handler : function()
            {
               tabs.items.each(function(item)
               {
                  if(item.closable && item != ctxItem)
                  {
                     tabs.remove(item);
                  }
               }
               );
            }
         }
         ]);
      }
      ctxItem = item;
      var items = menu.items;
      items.get(tabs.id + '-close').setDisabled( ! item.closable);
      var disableOthers = true;
      tabs.items.each(function()
      {
         if (this != item && this.closable)
         {
            disableOthers = false;
            return false;
         }
      }
      );
      items.get(tabs.id + '-close-others').setDisabled(disableOthers);
      menu.showAt(me.getXY());
   }
}
;
var center = new Ext.TabPanel(
{

   // �����߼��
   style : "padding:0 5px 0 5px",
   region : "center",
   // Ĭ��ѡ�е�һ��
   activeItem : 0,
   // ���Tab�������ֹ�����
   enableTabScroll : true,
   // ����ʱ��Ⱦ����
   // deferredRender : false,
   layoutOnTabChange : true,
   items : [
   {
      xtype : "panel",
      id : "index",
      iconCls : "indexicon",
      title : "Home Page",
      html : "<iframe src='HomePage.ashx'scrolling='no' frameborder=0 width=100% height=100%></iframe>"
   }
   ], plugins : new Ext.ux.TabCloseMenu()
}
);
Ext.onReady(function()
{
   Ext.BLANK_IMAGE_URL = '../../extjs2.0/resources/images/default/s.gif';
   new Ext.Viewport(
   {
      title : 'Ext.Viewportʾ��',
      layout : 'border', // ��񲼾�
      items : [
      {
         title : 'north Panel',
         html : '�ϱ�',
         region : 'north', // ָ���������������Ϊnorth
         height : 100
      }
      , west,
      {
         title : 'Main Content',
         html : '�м�',
         region : 'center'// ָ���������������Ϊcenter
      }
      ]
   }
   );
}
);
