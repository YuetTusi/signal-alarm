import { Dayjs } from "dayjs";

export interface SearchFormValue {
    /**
     * 起始时间
     */
    beginTime: Dayjs,
    /**
     * 结束时间
     */
    endTime: Dayjs,
    /**
     * 设备id
     */
    deviceId: number
}

export interface SignalSetInfoProp { };