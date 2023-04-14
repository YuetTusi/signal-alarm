import { BaseEntity } from './base-entity';
import { Protocol } from './protocol';

/**
 * 专项检查（热点）数据
 */
class Hotspot extends BaseEntity {

    apId: string = ''

    /**
     * 热点名称
     */
    ssid: string = ''
    /**
     * 强度值
     */
    rssi: string = ''

    protocolType: Protocol = Protocol.All
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
    /**
     * 设备地址
     */
    siteName: string = ''
};

export { Hotspot };