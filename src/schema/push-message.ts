import { Protocol } from "./protocol"

export enum SSEMessageType {
    /**
     * 报警
     */
    Alarm = 201,
    /**
     * 多点定位
     */
    Location = 202
}

/**
 * 推送数据类型
 */
export interface PushMessage {
    /**
     * 消息类型
     */
    type: SSEMessageType,
    /**
     * 用户id
     */
    userId: string,
    /**
     * 哈希
     */
    hash: string,
    /**
     * 消息内容
     */
    message: string
}

export interface AlarmPushValue {
    /**
     * 区域id
     */
    areaId: number,
    arfcn: number,
    captureTime: string,
    /**
     * 设备id
     */
    deviceId: string,
    protocol: string,
    protocolType: Protocol,
    rssi: number,
    siteName: string,
    [others: string]: any
}