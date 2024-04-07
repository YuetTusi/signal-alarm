import { BaseEntity } from "./base-entity";
import { Protocol } from "./protocol";

/**
 * 可疑持续信号
 */
export class ContinuousSignal extends BaseEntity {

    /**
     * 协议类型
     */
    protocolType: Protocol = Protocol.All
    /**
     * 无线协议名称
     */
    protocolName: string = ''
    /**
     * 频段
     */
    freqBand: string = ''
    /**
     * 设备id
    */
    deviceId: string = ''
    /**
     * 首次频率信息
     */
    firstFreq: number = 0
    /**
     * 最新频率
     */
    lastFreq: number = 0
    /**
     * 首次强度值
     */
    firstRssi: number = 0
    /**
     * 持续时间
     */
    lastRssi: number = 0
    /**
     * 开始时间
     */
    startTime: number = 0
    /**
     * 结束时间
     */
    endTime: number = 0
    /**
     * 持续时间
     */
    duration: number = 0
}