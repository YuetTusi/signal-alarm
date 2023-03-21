import { Protocol } from "@/schema/protocol"

export interface DetailModalProp {

    /**
     * 打开
     */
    open: boolean,
    /**
     * 分类
     */
    protocol: Protocol,
    /**
     * 确定
     */
    onOk: () => void,
    /**
     * 取消
     */
    onCancel: () => void
}