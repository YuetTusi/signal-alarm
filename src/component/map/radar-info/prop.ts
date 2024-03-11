import { AlarmMessage } from "@/schema/phone-alarm-info";

export interface RadarInfoProp {
    /**
     * 设备id
     */
    deviceId?: string,
    /**
     * 报警数据
     *  键为设备id
     *  值为该设备的报警Array
     */
    data: { [deviceId: string]: AlarmMessage[] },
    /**
     * 关闭handle
     */
    onClose?: () => void
}

/**
 * 信号点位置
 */
export interface PointAt {
    /**
     * 顶部距离
     */
    top: number,
    /**
     * 左部距离
     */
    left: number,
    /**
     * 所在环数
     */
    loop: number
}