<?xml version="1.0" encoding="GBK"?>
<submitRouters>
<#if sidRouters?size!=0>
    <#list sidRouters as sidRouter>
        <sidRouter serviceId="${sidRouter.SVCID!}">
            <baseStrategy>
                <gatewayId>${sidRouter.GATEWAYID!}</gatewayId>
                <gatewayType>${sidRouter.GATEWAYTYPE!}</gatewayType>
                <moduleId>${sidRouter.MODULEID!}</moduleId>
                <svcId>${sidRouter.SVCID!}</svcId>
                <serviceCode>${sidRouter.SERVICECODE!}</serviceCode>
                <feeValue>${sidRouter.FEEVALUE!}</feeValue>
                <feeType>${sidRouter.FEETYPE!}</feeType>
                <longCode>${sidRouter.LONGCODE!}</longCode>
            </baseStrategy>
        </sidRouter>
    </#list>
</#if>
<#if routeBases?size != 0>
    <#list routeBases as base>
        <!-- �������� -->
        <submitRouter productId="${base["PRODUCTID"]}" operatorId="${base["OPERATORID"]}"
                      provinceId="${base["PROVICEID"]}" strategyType="${base["STRATEGYTYPE"]}" subcodeFlag="${base["VC2SUBCODEFLAG"]}" filterLevel="${base["NUMDIRTYTYPE"]}">
            <baseStrategy>
                <!-- ����ID�� -->
                <gatewayId>${base["GATEWAYID"]}</gatewayId>
                <!-- �������͡� -->
                <gatewayType>${base["GATEWAYTYPE"]}</gatewayType>
                <!-- ģ��ID�� -->
                <moduleId>${base["MODELID"]}</moduleId>
                <!-- ͨ��ID�� -->
                <svcId>${base["SERVICECODEID"]}</svcId>
                <!-- ͨ�����롣 -->
                <serviceCode>${base["SERVICECODE"]}</serviceCode>
                <!-- �Ʒѱ�׼�� -->
                <feeValue>${base["FEEVALUE"]}</feeValue>
                <!-- �Ʒѱ�׼�� -->
                <feeType>${base["FEETYPE"]}</feeType>
                <!-- �����롣 -->
                <longCode>${base["LONGCODE"]}</longCode>
            </baseStrategy>
        </submitRouter>
    </#list>
</#if>

<#if routeAses?size != 0>
    <#list routeAses as routeas>
        <!-- �������ԡ� -->
        <submitRouter productId="${routeas["PRODUCTID"]}" operatorId="${routeas["OPERATORID"]}"
                      provinceId="${routeas["PROVICEID"]}" strategyType="${routeas["STRATEGYTYPE"]}" filterLevel="${routeas["NUMDIRTYTYPE"]}">
            <mainStrategy>
                <!-- ����ID��-->
                <gatewayId>${routeas["GATEWAYID"]}</gatewayId>
                <!-- �������͡� -->
                <gatewayType>${routeas["GATEWAYTYPE"]}</gatewayType>
                <!-- ģ��ID�� -->
                <moduleId>${routeas["MODELID"]}</moduleId>
                <!-- ͨ��ID�� -->
                <svcId>${routeas["SERVICECODEID"]}</svcId>
                <!-- ͨ�����롣 -->
                <serviceCode>${routeas["SERVICECODE"]}</serviceCode>
                <!-- �Ʒѱ�׼�� -->
                <feeValue>${routeas["FEEVALUE"]}</feeValue>
                <!-- �Ʒѱ�׼�� -->
                <feeType>${routeas["FEETYPE"]}</feeType>
                <!-- �����롣 -->
                <longCode>${routeas["LONGCODE"]}</longCode>
            </mainStrategy>
            <slaveStrategy>
                <!-- ����ID�� -->
                <gatewayId>${routeas["GATEWAYID2"]}</gatewayId>
                <!-- �������͡� -->
                <gatewayType>${routeas["GATEWAYTYPE2"]}</gatewayType>
                <!-- ģ��ID�� -->
                <moduleId>${routeas["MODELID2"]}</moduleId>
                <!-- ͨ��ID�� -->
                <svcId>${routeas["SERVICECODEID"]}</svcId>
                <!-- ͨ�����롣 -->
                <serviceCode>${routeas["SERVICECODE2"]}</serviceCode>
                <!-- �Ʒѱ�׼�� -->
                <feeValue>${routeas["FEEVALUE2"]}</feeValue>
                <!-- �Ʒѱ�׼�� -->
                <feeType>${routeas["FEETYPE2"]}</feeType>
                <!-- �����롣 -->
                <longCode>${routeas["LONGCODE2"]}</longCode>
            </slaveStrategy>
        </submitRouter>
    </#list>
</#if>

<#if routeBalances?size != 0>
    <!-- ������� -->
    <submitRouter productId="${routeBalanceInfo["PRODUCTID"]}" operatorId="${routeBalanceInfo["OPERATORID"]}"
                  provinceId="${routeBalanceInfo["PROVICEID"]}" strategyType="${routeBalanceInfo["STRATEGYTYPE"]}" filterLevel="${routeBalanceInfo["NUMDIRTYTYPE"]}">
        <#list routeBalances as routeBalance>
            <balanceStrategy>
                <!-- ����ID�� -->
                <gatewayId>${routeBalance["GATEWAYID"]}</gatewayId>
                <!-- �������͡� -->
                <gatewayType>${routeBalance["GATEWAYTYPE"]}</gatewayType>
                <!-- ͨ��ID�� -->
                <moduleId>${routeBalance["MODELID"]}</moduleId>
                <!-- ͨ��ID�� -->
                <svcId>${routeBalance["SERVICECODEID"]}</svcId>
                <!-- ͨ�����롣 -->
                <serviceCode>${routeBalance["SERVICECODE"]}</serviceCode>
                <!-- �Ʒѱ�׼�� -->
                <feeValue>${routeBalance["FEEVALUE"]}</feeValue>
                <!-- �Ʒѱ�׼�� -->
                <feeType>${routeBalance["FEETYPE"]}</feeType>
                <!-- �����롣 -->
                <longCode>${routeBalance["LONGCODE"]}</longCode>
            </balanceStrategy>
        </#list>
    </submitRouter>
</#if>
</submitRouters>
