import { BaseEntity } from './base-entity';
import { Protocol } from './protocol';

/**
 * 专项检查分类
 */
class SpecialType extends BaseEntity {

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
}

export { SpecialType };