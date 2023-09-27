import { BaseEntity } from './base-entity';

export interface BaseFreq extends BaseEntity {

    /**
     * 背景频谱id
     */
    freqBaseId: string,
    /**
     * 背景频谱名称
     */
    baseFreqName: string,
    /**
     * 描述
     */
    description: string,
    /**
     * 设备id
     */
    deviceId: string,
    /**
     * 计算后频谱
     */
    freqArray: any,
    /**
     * createId
     */
    createId: any,
    /**
     * 状态
     */
    status: number,
    aliasName: string
}