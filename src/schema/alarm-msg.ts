import { BaseEntity } from './base-entity';
import { Protocol } from './protocol';

/**
 * 预警消息
 */
class AlarmMsg extends BaseEntity {

    protocol: string = ''
    /**
     * 协议类型
     */
    protocolType: Protocol = Protocol.All
    /**
     * 频点信息
     */
    arfcn: string = ''
    /**
     * 强度
     */
    rssi: string = ''
    /**
     * 告警原因
     */
    warnReason: string = ''
    /**
     * 告警级别
     */
    warnLevel: number = 0
    /**
     * 告警状态
     */
    status: number = 1
    /**
     * 处理记录
     */
    remark: any
    /**
     * 告警设备ID
     */
    deviceId: null | string = null
    /**
     * 告警地址
     */
    siteName: null | string = null
}

export { AlarmMsg };