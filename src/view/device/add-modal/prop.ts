import { FormInstance } from "antd"
import { ComDevice } from "@/schema/com-device"

export interface AddModalProp {
    /**
     * 打开/关闭
     */
    open: boolean,

    /**
     * 确定
     */
    onOk: (values: ComDevice) => void,
    /**
     * 取消
     */
    onCancel: () => void
}

export interface DeviceFormProp {
    /**
     * 表单数据
     */
    data?: ComDevice,
    /**
     * 表单引用
     */
    formRef: FormInstance<ComDevice>
}