/**
 * 专项检查字典类型
 */
export enum Protocol {
    /**
     * 全部
     */
    All = -1,
    /**
     * 中国移动GSM
     */
    ChinaMobileGSM = 1,
    /**
     * 中国联通GSM
     */
    ChinaUnicomGSM = 2,
    /**
     * 中国电信CDMA
     */
    ChinaTelecomCDMA = 3,
    /**
     * 中国联通WCDMA
     */
    ChinaUnicomWCDMA = 4,
    /**
     * 中国移动TDD-LTE
     */
    ChinaMobileTDDLTE = 5,
    /**
     * 中国联通FDD-LTE
     */
    ChinaUnicomFDDLTE = 6,
    /**
     * 中国电信FDD-LTE
     */
    ChinaTelecomFDDLTE = 7,
    /**
     * WiFi2.4G
     */
    WiFi24G = 8,
    /**
     * WiFi5.8G
     */
    WiFi58G = 9,
    /**
     * 中国移动5G
     */
    ChinaMobile5G = 10,
    /**
     * 中国联通5G
     */
    ChinaUnicom5G = 11,
    /**
     * 中国广电5G
     */
    ChinaBroadnet5G = 12,
    /**
     * 中国电信5G
     */
    ChinaTelecom5G = 13,
    /**
     * 蓝牙5.0
     */
    Bluetooth50 = 14,
    /**
     * 窃听器
     */
    Detectaphone = 15,
    /**
     * GPS定位器
     */
    GPSLocator = 16,
    /**
     * 摄像头
     */
    Camera = 17,
    /**
     * 其他
     */
    Others = 18,
    /**
     * 终端
     */
    Terminal = 91
}

/**
 * 获取枚举中文意义
 */
export const getProtocolLabel = (value: Protocol) => {

    switch (value) {
        case Protocol.All:
            return '全部';
        case Protocol.ChinaMobileGSM:
            return '中国移动GSM';
        case Protocol.ChinaUnicomGSM:
            return '中国联通GSM';
        case Protocol.ChinaTelecomCDMA:
            return '中国电信CDMA';
        case Protocol.ChinaUnicomWCDMA:
            return '中国联通WCDMA';
        case Protocol.ChinaMobileTDDLTE:
            return '中国移动TDD-LTE';
        case Protocol.ChinaUnicomFDDLTE:
            return '中国联通FDD-LTE';
        case Protocol.ChinaTelecomFDDLTE:
            return '中国电信FDD-LTE';
        case Protocol.WiFi24G:
            return 'WiFi2.4G';
        case Protocol.WiFi58G:
            return 'WiFi5.8G';
        case Protocol.ChinaMobile5G:
            return '中国移动5G';
        case Protocol.ChinaUnicom5G:
            return '中国联通5G';
        case Protocol.ChinaBroadnet5G:
            return '中国广电5G';
        case Protocol.ChinaTelecom5G:
            return '中国电信5G';
        case Protocol.Bluetooth50:
            return '蓝牙5.0';
        case Protocol.Detectaphone:
            return '窃听器';
        case Protocol.GPSLocator:
            return 'GPS定位器';
        case Protocol.Camera:
            return '摄像头';
        case Protocol.Others:
            return '其他';
        case Protocol.Terminal:
            return '终端';
        default:
            return '-';
    }
}