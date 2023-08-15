import { Protocol } from "@/schema/protocol";
import { helper } from "@/utility/helper";

export const getTypeSelectSource = () => [
    {
        value: 'all',
        title: '全部',
        children: [
            {
                value: 'signal',
                title: '手机信号',
                children: [
                    {
                        value: Protocol.ChinaMobileGSM,
                        title: '中国移动GSM'
                    }, {
                        value: Protocol.ChinaUnicomGSM,
                        title: '中国联通GSM'
                    }, {
                        value: Protocol.ChinaTelecomCDMA,
                        title: '中国电信CDMA'
                    }, {
                        value: Protocol.ChinaUnicomWCDMA,
                        title: '中国联通WCDMA'
                    }, {
                        value: Protocol.ChinaMobileTDDLTE,
                        title: '中国移动TDD-LTE'
                    }, {
                        value: Protocol.ChinaUnicomFDDLTE,
                        title: '中国联通FDD-LTE'
                    }, {
                        value: Protocol.ChinaTelecomFDDLTE,
                        title: '中国电信FDD-LTE'
                    }, {
                        value: Protocol.ChinaMobile5G,
                        title: '中国移动5G'
                    }, {
                        value: Protocol.ChinaUnicom5G,
                        title: '中国联通5G'
                    }, {
                        value: Protocol.ChinaBroadnet5G,
                        title: '中国广电5G'
                    }, {
                        value: Protocol.ChinaTelecom5G,
                        title: '中国电信5G'
                    }
                ]
            },
            {
                value: 'others',
                title: '其他',
                children: [
                    {
                        value: helper.protocolToString([Protocol.GPSLocator]),
                        title: 'GPS定位器'
                    }
                ]
            }
        ]
    }
];

/**
 * 返回对应树节点的枚举字串（多个用逗号分割）
 * @param type 树节点值
 */
export const getTypes = (type: string) => {
    switch (type) {
        case 'all':
            return helper.protocolToString([
                Protocol.ChinaMobileGSM,
                Protocol.ChinaUnicomGSM,
                Protocol.ChinaTelecomCDMA,
                Protocol.ChinaUnicomWCDMA,
                Protocol.ChinaMobileTDDLTE,
                Protocol.ChinaUnicomFDDLTE,
                Protocol.ChinaTelecomFDDLTE,
                Protocol.ChinaMobile5G,
                Protocol.ChinaUnicom5G,
                Protocol.ChinaBroadnet5G,
                Protocol.ChinaTelecom5G,
                Protocol.GPSLocator
            ]);
        case 'signal':
            return helper.protocolToString([
                Protocol.ChinaMobileGSM,
                Protocol.ChinaUnicomGSM,
                Protocol.ChinaTelecomCDMA,
                Protocol.ChinaUnicomWCDMA,
                Protocol.ChinaMobileTDDLTE,
                Protocol.ChinaUnicomFDDLTE,
                Protocol.ChinaTelecomFDDLTE,
                Protocol.ChinaMobile5G,
                Protocol.ChinaUnicom5G,
                Protocol.ChinaBroadnet5G,
                Protocol.ChinaTelecom5G,
            ]);
        case 'others':
            return helper.protocolToString([Protocol.GPSLocator]);
        default:
            return type;
    }
};