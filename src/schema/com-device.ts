import { BaseEntity } from './base-entity';

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

    constructor() {
        super();
    }
}

export { ComDevice, DeviceState };