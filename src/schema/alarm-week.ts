import { BaseEntity } from './base-entity';
import { Protocol } from './protocol';

/**
 * 告警7天（周）统计
 */
class AlarmWeek extends BaseEntity {

    /**
     * 类型
     */
    protocolType: Protocol = Protocol.All
    /**
     * 数量
     */
    num: string = ''
    /**
     * 时间
     */
    day: string = ''
    /**
     * 地址
     */
    siteName: string = ''
}

export { AlarmWeek };