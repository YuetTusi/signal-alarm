import { BaseEntity } from './base-entity';

/**
 * 伪热点实体
 */
class FakeHotspot extends BaseEntity {
    /**
     * 名称
     */
    public hotspotName: string = ''
    /**
     * 伪MAC地址
     */
    public fakeMac: string = ''
    /**
     * 真实MAC地址
     */
    public realMac: string = ''
    /**
     * 数量
     */
    public count: number = 0
    /**
     * 状态 0:生效; 1:未生效
     */
    public status: number = 0
}

export { FakeHotspot };