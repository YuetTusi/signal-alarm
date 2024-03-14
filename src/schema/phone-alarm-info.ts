// {
//     "hash":"39bd662b7942418595c21a1ef0af7fad",
//     "protocolName":"中国电信FDD-LTE",
//     "deviceId":"rs123",
//     "siteName":"中软通二楼111"
// }

import { Protocol } from "./protocol"

class PhoneAlarmInfo {
    /**
     * 唯一id(前端用)
     */
    public id: string = ''
    /**
     * 接收时间（前端用于自动关闭）
     */
    public receiveTime: number = new Date().getTime()
    /**
     * hash值
     */
    public hash: string = ''
    /**
     * UserID
     */
    public userId: string = ''
    /**
     * 消息（JSON格式串）
     */
    public message: string = ''
}

interface AlarmMessage {
    /**
     * 设备id
     */
    deviceId: string,
    /**
     * 采集时间：
     */
    captureTime?: string,
    /**
     * 协议类型：
     */
    protocol?: string,
    /**
     * 
     */
    protocolType?: Protocol,
    /**
     * 强度
     */
    rssi?: string,
    /**
     * 设备场所
     */
    siteName?: string,
    /**
     * 频率信息
     */
    arfcn?: string,
    /**
     * 告警级别
     */
    warnLevel?: string,
    /**
     * 告警原因
     */
    warnReason?: string,
    /**
     * 半径
     */
    radius: number
}

export { PhoneAlarmInfo, type AlarmMessage };