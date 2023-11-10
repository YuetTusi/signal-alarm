import { BaseEntity } from './base-entity';

/**
 * 设备状态
 */
enum DeviceState {
    /**
     * 异常
     */
    Abnormal = 0,
    /**
     * 正常
     */
    Normal
}

/**
 * 设备实体
 */
class ComDevice extends BaseEntity {

    /**
     * 设备id
     */
    deviceId: string = ''
    /**
     * 设备ip
     */
    deviceIp: string = ''
    /**
     * 设备名称
     */
    deviceName: string = ''
    /**
     * 场所名称
     */
    siteName: string = ''
    /**
     * 设备配置
     */
    config: string = ''
    /**
     * 状态(0:异常,1:工作)
     */
    status: DeviceState = DeviceState.Abnormal
    /**
     * 区域id
     */
    areaId: string = ''
    /**
     * 经度
     */
    lon: number = 0
    /**
     * 纬度
     */
    lat: number = 0

    constructor() {
        super();
    }
}

interface ComDeviceDropdown {
    /**
     * KEY
     */
    key?: string,
    /**
     * 标题
     */
    title: string,
    /**
     * 值
     */
    value: string,
    /**
     * 子节点
     */
    children?: ComDeviceDropdown[],
    /**
     * 附加属性
     */
    [extra: string]: any
}

export type { ComDeviceDropdown };
export { ComDevice, DeviceState };