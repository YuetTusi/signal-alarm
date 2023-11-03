import { BaseEntity } from './base-entity';

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