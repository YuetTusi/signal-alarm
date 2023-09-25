import { BaseEntity } from './base-entity';

export interface BaseFreq extends BaseEntity {

    baseFreqName: string,

    description: string,

    deviceId: string,
    freqArray: any,
    createId: any,
    status: number,
    aliasName: string
}