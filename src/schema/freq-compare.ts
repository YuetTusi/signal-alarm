
/**
 * 频谱比较数据
 */
export interface FreqCompare {

    /**
     * 频率
     */
    freq: number,
    /**
     * 背景强度
     */
    baseSignal: number,
    /**
     * 当前强度
     */
    currentSignal: number,
    /**
     * 偏移值
     */
    offsetSignal: number,
    /**
     * 当前偏移值
     * 用此字段判断颜色
     * 10~20 黄
     * >20 红
     * 其他绿
     */
    currentOffsetSignal: number,
    /**
     * 背景频谱id
     */
    freqBaseId: number,
    /**
     * 设备id
     */
    deviceId: string,
    type: number,
    /**
     * 时间
     */
    captureTime: number,
    createTime: null | string
}