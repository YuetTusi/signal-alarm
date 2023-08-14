import { SpecialBase } from './special-base';

/**
 * 专项检查（终端）数据
 */
class Terminal extends SpecialBase {

    apId: string = ''
    apMac: string = ''
    captureTime: string = ''
    type: any
    /**
     * 热点名称
     */
    ssid: string = ''
    /**
     * 设备id
     */
    deviceId: string = ''
    /**
     * MAC地址
     */
    mac: string = ''
    /**
     * 厂商
     */
    org: null | string = null
    /**
     * 频点号
     */
    channel: string = ''
    /**
     * 上行流量
     */
    upStream: number = 0
    /**
     * 下行流量
     */
    downStream: number = 0
};

export { Terminal };