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
    num: number = 0
}

export { AlarmWeek };