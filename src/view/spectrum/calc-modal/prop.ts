import { Dayjs } from "dayjs"

export interface CalcModalProp {
    /**
     * 打开/关闭
     */
    open: boolean,
    /**
     * 取消handle
     */
    onCancel: () => void,
    /**
     * 确定handle
     */
    onOk: (values: FormValue) => void
}

export interface FormValue {
    /**
     * 背景频谱名称
     */
    baseFreqName: string,
    /**
     * 起始时间
     */
    createTimeBegin: Dayjs,
    /**
     * 结束时间
     */
    createTimeEnd: Dayjs,
    /**
     * 描述
     */
    description: string,
    /**
     * 设备id
     */
    deviceId: string
}