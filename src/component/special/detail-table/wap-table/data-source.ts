import { Protocol } from "@/schema/protocol";
import { helper } from "@/utility/helper";

export const getTypeSelectSource = () => [
    {
        value: helper.protocolToString([
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
            Protocol.Camera,
            Protocol.Bluetooth50,
            Protocol.Detectaphone,
            Protocol.GPSLocator,
            Protocol.Others
        ]),
        title: '全部',
        children: [
            {
                value: helper.protocolToString([
                    Protocol.ChinaMobileGSM,
                    Protocol.ChinaUnicomGSM,
                    Protocol.ChinaTelecomCDMA,
                    Protocol.ChinaUnicomWCDMA,
                    Protocol.ChinaMobileTDDLTE,
                    Protocol.ChinaUnicomFDDLTE,
                    Protocol.ChinaTelecomFDDLTE,
                    Protocol.ChinaMobile5G,
                    Protocol.ChinaUnicom5G,
                    Protocol.ChinaBroadnet5G
                ]),
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
                    }
                ]
            }, {
                value: helper.protocolToString([
                    Protocol.Camera
                ]),
                title: '摄像头'
            }, {
                value: helper.protocolToString([
                    Protocol.Bluetooth50,
                    Protocol.Detectaphone,
                    Protocol.GPSLocator,
                    Protocol.Others
                ]),
                title: '其他',
                children: [
                    {
                        value: Protocol.Bluetooth50,
                        title: '蓝牙5.0'
                    }, {
                        value: Protocol.Detectaphone,
                        title: '窃听器'
                    }, {
                        value: Protocol.GPSLocator,
                        title: 'GPS定位器'
                    }, {
                        value: Protocol.Others,
                        title: '其他'
                    }
                ]
            }
        ]
    }
];