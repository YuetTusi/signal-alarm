export interface DetailModalProp {

    /**
     * 打开
     */
    open: boolean,
    /**
     * 确定
     */
    onOk: () => void,
    /**
     * 取消
     */
    onCancel: () => void
}