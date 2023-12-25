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
     * 区域宽度
     */
    areaWidth: number = 0
    /**
     * 区域高度
     */
    areaHeight: number = 0
    /**
     * 背景图像
     */
    areaBg: string = ''
}

export { Zone };