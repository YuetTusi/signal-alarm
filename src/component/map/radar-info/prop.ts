import { AlarmMessage } from "@/schema/phone-alarm-info";

export interface RadarInfoProp {

    open: boolean,
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