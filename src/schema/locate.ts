import { Protocol } from "./protocol"

/**
 * 定位数据
 */
class Locate {

    content: string = ''
    /**
     * 纬度
     */
    lat: number = 0
    /**
     * 经度
     */
    lon: number = 0
    /**
     * X轴
     */
    x: number = 0
    /**
     * Y轴
     */
    y: number = 0
    /**
     * 协议类型
     */
    protocolType: Protocol = Protocol.All
    /**
     * 推送时间
     */
    actionTime: number = new Date().getTime()
}

export { Locate };