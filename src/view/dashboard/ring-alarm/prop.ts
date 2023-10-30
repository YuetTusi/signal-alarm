import { PhoneAlarmInfo } from "@/schema/phone-alarm-info";

export interface DevAlarmProp {
}

export interface FloatItemProp {

    /**
     * 报警数据
     */
    data: PhoneAlarmInfo,
    /**
     * 顶部坐标
     */
    top: number
}