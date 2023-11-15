import { PhoneAlarmInfo } from "@/schema/phone-alarm-info"

export interface RadarInfoProp {

    open: boolean,
    /**
     * 设备id
     */
    deviceId?: string,

    onClose: () => void
}