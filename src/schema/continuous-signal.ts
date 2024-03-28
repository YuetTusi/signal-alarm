import { BaseEntity } from "./base-entity";
import { Protocol } from "./protocol";

/**
 * 可疑持续信号
 */
export class ContinuousSignal extends BaseEntity {

    protocolType: Protocol = Protocol.All

    protocolName: string = ''
    /**
     * 频段
     */
    freqBand: string = ''
    /**
     * 设备id
    */
    deviceId: string = ''
    firstFreq: number = 0
    /**
     * 最新频率
     */
    lastFreq: number = 0
    firstRssi: number = 0
    /**
     * 最近强度值
     */
    lastRssi: number = 0
    startTime: number = 0
    endTime: number = 0
    duration: number = 0
}