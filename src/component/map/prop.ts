import { DeviceState } from '@/schema/com-device';
import { Marker, MarkerOptions } from 'leaflet';

export interface MapProp {
    /**
     * X轴初值
     */
    x: number,
    /**
     * Y轴初值
     */
    y: number,
    /**
     * 背景图base64
     */
    background: string,
    /**
     * 打点handle
     * @param x X值
     * @param y Y值
     */
    onAddPoint: (x: number, y: number) => void
}

export interface SearchFormValue {
    /**
     * 区域
     */
    zone: number
}

export interface MarkerOptionsEx extends MarkerOptions {

    /**
     * 设备id
     */
    deviceId: string,
    /**
     * 场所
     */
    siteName: string,
    /**
     * 状态
     */
    status: DeviceState,
    /**
     * 是否有报警消息
     */
    hasAlarm: boolean,
    /**
     * 其他属性
     */
    [extraProp: string]: any
}