export interface CompareSpectrumModalProp {

    /**
     * 打开/关闭
     */
    open: boolean,
    /**
     * 设备Id
     */
    deviceId: string,
    /**
     * 确定handle
     * @param freqBaseId 背景频谱id
     * @param cmpName 比较名称
     */
    onOk: (freqBaseId: string, cmpName: string) => void,
    /**
     * 取消handle
     */
    onCancel: () => void
}