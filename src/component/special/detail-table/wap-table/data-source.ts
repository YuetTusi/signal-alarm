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