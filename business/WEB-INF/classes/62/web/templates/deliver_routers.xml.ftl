<?xml version="1.0" encoding="GBK"?>
<deliverRouters> 
<#if deRouters?size!=0>
 	<#list deRouters as base>
	 	<deliverRouter longCode="${base["VC2LONGCODE"]}" 
	 	gatewayId="${base["NUMGWID"]}" keyWord="${base["VC2CMD"]}"> 
	    <!--������ƥ����� 1��ȷ 0ģ��-->  
	    <lcCheckFlag>${base["VC2LCMATCH"]}</lcCheckFlag>  
	    <!--�ؼ���ƥ����� 1��ȷ 0ģ�� -->  
	    <kwCheckFlag>${base["VC2CMDMATCH"]}</kwCheckFlag>  
	    <!--�ֻ�������Ӫ�̱�� 1 �ƶ� 2��ͨ 3 ���� -->  
	    <operatorId>${base["NUMOPID"]}</operatorId>  
	    <!--�ֻ�����ʡ���-->  
	    <provinceId>0</provinceId>  
	    <!--Ŀ�Ŀͻ����-->  
	    <coagentId>${base["NUMRPGMID"]}</coagentId>  
	    <!--��Ϣ���� 1 ���� 0 �˶�-->  
	    <messageType>2</messageType>  
	    <!--���������еĳ�����-->  
	    <orderId>${base["NUMRPGMID"]}</orderId>  
	    <!--ҵ�������-->  
	    <serviceCodeId>${base["NUMSVCID"]}</serviceCodeId>  
	    <!--��Ʒ���-->  
	    <productId>0</productId> 
	  </deliverRouter> 
 	 </#list>
</#if>
</deliverRouters>