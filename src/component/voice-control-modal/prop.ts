export interface VoiceControlProp {
    /**
     * 打开/关闭
     */
    open: boolean,
    /**
     * 取消Click
     */
    onCancel: () => void,
    /**
     * 确定Click
     */
    onOk: (voice: boolean) => void
};