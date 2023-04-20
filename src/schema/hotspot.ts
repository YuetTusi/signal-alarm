import { SpecialBase } from './special-base';

/**
 * 专项检查（热点）数据
 */
class Hotspot extends SpecialBase {

    apId: string = ''

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

export { Hotspot };