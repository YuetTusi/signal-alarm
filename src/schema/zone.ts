import { BaseEntity } from './base-entity';

/**
 * 涉密区域实体
 */
class Zone extends BaseEntity {
    /**
     * 区域名称
     */
    areaName: string = ''
    /**
     * 背景图像
     */
    areaBg: string = ''
}

export { Zone };