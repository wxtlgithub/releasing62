<?xml version="1.0" encoding="GBK"?>
<gateways>
<#list gateWays as gateway>
    <${gateWayType["${gateway.numgwtypeid?c}"]} id="${gateway.numgwid?c}" type="1">
    <operatorConfig>
        <!-- �������� -->
        <gatewayName>${gateway.vc2gatewayname!}</gatewayName>
        <!-- ��Ӫ�̱�� -->
        <operatorId>${gateway.numopid?c}</operatorId>
        <!-- IP��ַ -->
        <serverIP>${gateway.vc2gwip!}</serverIP>
        <!-- �˿� -->
        <serverPort>${gateway.vc2gwport!}</serverPort>
        <!-- mo IP��ַ -->
        <moServerIP>${gateway.vc2moip!}</moServerIP>
        <!-- mo�˿� -->
        <moServerPort>${gateway.vc2moport!}</moServerPort>
        <!-- ������ҵ���� -->
        <spID>${gateway.vc2spid!}</spID>
        <!-- ���ط������ -->
        <spNumber>${gateway.vc2spnum!}</spNumber>
        <!-- �û��� -->
        <spUserName>${gateway.vc2gwusername!}</spUserName>
        <!-- ���� -->
        <spPassWord>${gateway.vc2gwpassword!}</spPassWord>
        <!-- �����ֻ��������� -->
        <numGroupMemberMax>${gateway.numgroupmembermax?c}</numGroupMemberMax>
        <!-- ���ٿ��� -->
        <speeder>${gateway.vc2speed!}</speeder>
    </operatorConfig>
    <extendData>
    <#--��mas��mm7��չ��������-->
        <#if gateWayType["${gateway.numgwtypeid}"]!="mas" && gateWayType["${gateway.numgwtypeid}"]!="mm7">
            <!-- �������ڴ�С -->
            <controlSize>${gateway.extendConfMap.controlSize!}</controlSize>
            <!-- ������ -->
            <countProcessor>${gateway.extendConfMap.countProcessor!}</countProcessor>
            <!-- Э����ڻ�������С -->
            <sizeInBuffer>${gateway.extendConfMap.sizeInBuffer!}</sizeInBuffer>
            <!-- Э����ڻ�������С -->
            <sizeOutBuffer>${gateway.extendConfMap.sizeOutBuffer!}</sizeOutBuffer>
            <!--Э�������޷�������ʱ�䣬��λ�� -->
            <connectIdleTime>${gateway.extendConfMap.connectIdleTime!}</connectIdleTime>
            <!--Э������ʧ�ܵ�����ʱ�䣬��λ�� -->
            <connectRepeatTime>${gateway.extendConfMap.connectRepeatTime!}</connectRepeatTime>
            <!--Э������ʧ�ܵ����Դ��� -->
            <connectRepeatCount>${gateway.extendConfMap.connectRepeatCount!}</connectRepeatCount>
            <!--��Ϣ����ʧ�ܵ�����ʱ�䣬��λ�� ����Ŀǰδ���� -->
            <messageRepeatTime>${gateway.extendConfMap.messageRepeatTime!}</messageRepeatTime>
            <!--��Ϣ����ʧ�ܵ����Դ��� ����Ŀǰδ���� -->
            <messageRepeatCount>${gateway.extendConfMap.messageRepeatCount!}</messageRepeatCount>
            <!--Э�黬����������ʱ�� -->
            <controlClearTime>${gateway.extendConfMap.controlClearTime!}</controlClearTime>
            <!-- ����ǩ������:1=>��Ӫ������ǩ��; 2=>����ͨ����ǩ��; 3=>�û�ǩ�� -->
            <signType>${gateway.extendConfMap.signType!}</signType>
            <!-- ����ǩ������ -->
            <signMessage>${gateway.extendConfMap.signMessage!}</signMessage>
        </#if >
    <#--��չ���Ʋ���-->
    <#--cmpp30-->
        <#if gateWayType["${gateway.numgwtypeid}"]=="cmpp30">
            <!-- 0 ���� 1����һ���������д0��������Ϊ��������ʱ����Ҫ�������ӣ����õ�1����� -->
            <socketSymbol>${gateway.extendConfMap.socketSymbol!}</socketSymbol>
        </#if>
    <#--cmpp20-->
        <#if gateWayType["${gateway.numgwtypeid}"]=="cmpp20">
            <!-- ���ֶ�����ʱ��spid����һ�£�������ŵȲ���ͨ��Ҫ��ʹ���Լ��ı�ţ��������������� -->
            <msgSrc>${gateway.extendConfMap.msgSrc!}</msgSrc>
            <!-- 0 ���� 1����һ���������д0��������Ϊ��������ʱ����Ҫ�������ӣ����õ�1����� -->
            <socketSymbol>${gateway.extendConfMap.socketSymbol!}</socketSymbol>
        </#if>
    <#--sgip-->
        <#if gateWayType["${gateway.numgwtypeid}"]=="sgip">
            <!-- �ڵ�ID -->
            <nodeID>${gateway.extendConfMap.nodeID!}</nodeID>
            <!-- ���Ѻ��� -->
            <chargeNumber>${gateway.extendConfMap.chargeNumber!}</chargeNumber>
            <!-- ��¼���� Ĭ����д1 -->
            <socketSymbol>${gateway.extendConfMap.socketSymbol!}</socketSymbol>
            <!-- MO�����û��� -->
            <moSpUserName>${gateway.extendConfMap.moSpUserName!}</moSpUserName>
            <!-- MO�������� -->
            <moSpPassWord>${gateway.extendConfMap.moSpPassWord!}</moSpPassWord>
        </#if>
    <#--smgp-->
        <#if gateWayType["${gateway.numgwtypeid}"]=="smgp">
            <!--�ͻ���֧�ֵİ汾�� -->
            <socketVersion>${gateway.extendConfMap.socketVersion!}</socketVersion>
            <!-- smgpЭ����Ҫ����loginMode -->
            <loginMode>${gateway.extendConfMap.loginMode!}</loginMode>
        </#if>
    <#--empp-->
        <#if gateWayType["${gateway.numgwtypeid}"]=="empp">

        </#if>
    <#--cbip-->
        <#if gateWayType["${gateway.numgwtypeid}"]=="cbip">
            <!-- �ͻ���ID -->
            <clientId>${gateway.extendConfMap.clientId!}</clientId>
            <!-- �Ƿ���� -->
            <security>${gateway.extendConfMap.security!}</security>
        </#if>
    <#--mas-->
        <#if gateWayType["${gateway.numgwtypeid}"]=="mas">
            <jdbcUrl>${gateway.extendConfMap.jdbcUrl!}</jdbcUrl>
            <seqIdPrefix>${gateway.extendConfMap.seqIdPrefix!}</seqIdPrefix>
            <srcClientID>${gateway.extendConfMap.srcClientID!}</srcClientID>
            <!-- Rpt����ʼʱ�� -->
            <beginTime>${gateway.extendConfMap.beginTime!}</beginTime>
            <!-- Mt������ĸ��� -->
            <mtSize>${gateway.extendConfMap.mtSize!}</mtSize>
            <mtWaitTime>${gateway.extendConfMap.mtWaitTime!}</mtWaitTime>
            <!-- Mt����������ʱ�䣬�������ʱ��û�дﵽ����ĸ���Ҳ��������Ĳ��� -->
            <mtMaxTime>${gateway.extendConfMap.mtMaxTime!}</mtMaxTime>
            <moSize>${gateway.extendConfMap.moSize!}</moSize>
            <moWaitTime>${gateway.extendConfMap.moWaitTime!}</moWaitTime>
            <beforeDay>${gateway.extendConfMap.beforeDay!}</beforeDay>
        </#if>
    <#--mm7-->
        <#if gateWayType["${gateway.numgwtypeid}"]=="mm7">
            <!-- ���е�ַ ������������ -->
            <mmscURL>${gateway.extendConfMap.mmscURL!}</mmscURL>
            <!-- �������ı�� -->
            <mmscID>${gateway.extendConfMap.mmscID!}</mmscID>
        </#if>
    <#--��mas��mm7��չsmSplit��������-->
        <#if gateWayType["${gateway.numgwtypeid}"]!="mas" && gateWayType["${gateway.numgwtypeid}"]!="mm7">
            <smSplit>
                <!--splitType ���Ų�ֹ��� 0 ����� 1��ͨ���Ų�� -->
                <normalSplit splitType="${gateway.extendConfMap.smSplit_normalSplit_splitType!}">
                    <!-- ��ͨ���ų��� -->
                    <smLength>${gateway.extendConfMap.smSplit_normalSplit_smLength!}</smLength>
                    <!-- ��ֶ��ų��� -->
                    <smSplitLength>${gateway.extendConfMap.smSplit_normalSplit_smSplitLength!}</smSplitLength>
                    <!-- ������ݵ���ʽ��:(1/2) -->
                    <smSplitType>${gateway.extendConfMap.smSplit_normalSplit_smSplitType!}</smSplitType>
                    <!-- ������� -->
                    <splitCount>${gateway.extendConfMap.smSplit_normalSplit_splitCount!}</splitCount>
                    <!-- ������ -->
                    <splitIndex>${gateway.extendConfMap.smSplit_normalSplit_splitIndex!}</splitIndex>
                </normalSplit>
                <longSplit splitType="${gateway.extendConfMap.smSplit_longSplit_splitType!}"
                           headType7="${gateway.extendConfMap.smSplit_longSplit_headType7!}"
                           smLastSplitCount="${gateway.extendConfMap.smSplit_longSplit_smLastSplitCount!}"/>
            </smSplit>
        </#if>
    </extendData>
</${gateWayType["${gateway.numgwtypeid}"]}>
</#list>
        </gateways>