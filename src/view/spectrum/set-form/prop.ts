import { FormInstance } from "antd";

export interface FormValue {
    /**
     * 设备
     */
    device: string,
    /**
     * 偏移量
     */
    offset: number,
    // /**
    //  * 自定偏移量（15~35）
    //  */
    // selfOffset: number,
    // /**
    //  * 预设偏移量（15~35）
    //  */
    // presetOffset: number,
    // /**
    //  * 是否是自定义
    //  */
    // isSelfOffset: boolean,
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