import { BaseEntity } from './base-entity';
import { Protocol } from './protocol';

/**
 * 告警场所Top10统计
 */
class AlarmSiteTop extends BaseEntity {

    /**
     * 类型
     */
    protocolType: Protocol = Protocol.All
    /**
     * 数量
     */
    num: string = ''
    /**
     * 统计日期
     */
    day: string = ''
    /**
     * 场所
     */
    siteName: string = ''
    /**
     * 设备ID
     */
    deviceId: string = ''
}

export { AlarmSiteTop };