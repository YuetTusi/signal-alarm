import { FormInstance } from "antd"
import { ComDevice } from "@/schema/com-device"

export interface SetModalProp {
    /**
     * 打开/关闭
     */
    open: boolean,
    /**
     * 下发设备
     */
    data: ComDevice
    /**
     * 确定
     */
    onOk: (values: SetFormValue) => void,
    /**
     * 取消
     */
    onCancel: () => void
}

export interface SetFormValue {
    /**
     * 配置内容
     */
    su: string
}