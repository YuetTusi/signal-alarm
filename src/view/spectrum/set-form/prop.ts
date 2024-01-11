import { FormInstance } from "antd";

export interface FormValue {
    /**
     * 设备
     */
    device: string,
    /**
     * 偏移量（15~90）
     */
    offset: number,
    /**
     * 背景频谱id
     */
    freqBaseId: string
}

export interface SetFormProp {
    /**
     * 表单ref
     */
    formRef: FormInstance<FormValue>
}