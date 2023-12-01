import { SpecialBase } from './special-base';

/**
 * 专项检查（蓝牙）数据
 */
class Bluetooth extends SpecialBase {
    /**
     * 蓝牙类型
     */
    type: 'ble' | 'classic' = 'ble'
    /**
     * 强度
     */
    signal: number = 0
    /**
     * 厂商
     */
    vendor: string = ''
    /**
     * 设备类型
     */
    devType: string = ''
    /**
     * 设备名称
     */
    name: string = ''
    /**
     * MAC地址
     */
    mac: string = ''

    isBluetooth: boolean = true
};

export { Bluetooth };