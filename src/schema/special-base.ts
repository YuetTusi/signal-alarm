import { BaseEntity } from "./base-entity";
import { Protocol } from "./protocol";

/**
 * 专项检查基类
 */
class SpecialBase extends BaseEntity {

    /**
     * 设备场所
     */
    siteName: string = ''
    /**
     * 协议类型
     */
    protocolType: Protocol = Protocol.All
    /**
     * 强度值
     */
    rssi: string = ''
    /**
     * 采集时间
     */
    captureTime: string = ''
    /**
     * 连接状态
     */
    isConnect: number = 0
    /**
     * 距离
     */
    distance: number = 0
}

export { SpecialBase };