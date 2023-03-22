import { BaseEntity } from './base-entity';
import { Protocol } from './protocol';

/**
 * 告警类型统计数量
 */
class AlarmType extends BaseEntity {

    /**
     * 类型
     */
    protocolType: Protocol = Protocol.All
    /**
     * 数量
     */
    num: number = 0
}

export { AlarmType };