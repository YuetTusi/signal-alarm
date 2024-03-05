import { DeviceState } from '@/schema/com-device';
import { MarkerOptions } from 'leaflet';

export interface MapProp {
    /**
     * X轴初值
     */
    x: number,
    /**
     * Y轴初值
     */
    y: number,
    /**
     * 宽
     */
    width: number,
    /**
     * 高
     */
    height: number,
    /**
     * 背景图base64
     */
    background: string,
    /**
     * 打点handle
     * @param x X值
     * @param y Y值
     */
    onAddPoint: (x: number, y: number) => void
}

export interface SearchFormValue {
    /**
     * 区域
     */
    zone: number
}

export interface MarkerOptionsEx extends MarkerOptions {

    /**
     * 设备id
     */
    deviceId: string,
    /**
     * 场所
     */
    siteName: string,
    /**
     * 状态
     */
    status: DeviceState,
    /**
     * 是否有报警消息
     */
    hasAlarm: boolean,
    /**
     * 其他属性
     */
    [extraProp: string]: any
}

export enum ProtocolColor {

    /**
     * 中国移动GSM
     */
    ChinaMobileGSM = '#f6e58d',
    /**
     * 中国联通GSM
     */
    ChinaUnicomGSM = '#C4E538',
    /**
     * 中国电信CDMA
     */
    ChinaTelecomCDMA = '#12CBC4',
    /**
     * 中国联通WCDMA
     */
    ChinaUnicomWCDMA = '#718093',
    /**
     * 中国移动TDD-LTE
     */
    ChinaMobileTDDLTE = '#e72c29',
    /**
     * 中国联通FDD-LTE
     */
    ChinaUnicomFDDLTE = '#F79F1F',
    /**
     * 中国电信FDD-LTE
     */
    ChinaTelecomFDDLTE = '#20bf6b',
    /**
     * WiFi2.4G
     */
    WiFi24G = '#1289A7',
    /**
     * WiFi5.8G
     */
    WiFi58G = '#D980FA',
    /**
     * 中国移动5G
     */
    ChinaMobile5G = '#8e44ad',
    /**
     * 中国联通5G
     */
    ChinaUnicom5G = '#fd79a8',
    /**
     * 中国广电5G
     */
    ChinaBroadnet5G = '#25CCF7',
    /**
     * 中国电信5G
     */
    ChinaTelecom5G = '#EAB543',
    /**
     * 蓝牙5.0
     */
    Bluetooth50 = '#55E6C1',
    /**
     * 窃听器
     */
    Detectaphone = '#CAD3C8',
    /**
     * GPS定位器
     */
    GPSLocator = '#F97F51',
    /**
     * 摄像头
     */
    Camera = '#F8EFBA',
    /**
     * 其他
     */
    Others = '#1B9CFC',
    /**
     * 终端
     */
    Terminal = '#58B19F'
}