import { Dayjs } from "dayjs";
import { FormInstance } from "antd";

export interface FormValue {
    /**
     * 设备
     */
    device: string,
    /**
     * 起始时间
     */
    startTime: Dayjs,
    /**
     * 结束时间
     */
    endTime: Dayjs,
    /**
     * 偏移量（15~90）
     */
    offset: number,
    /**
     * 背景频谱id
     */
    freqBaseId: string
}

export interface PastFormProp {
    /**
     * 表单ref
     */
    formRef: FormInstance<FormValue>
}