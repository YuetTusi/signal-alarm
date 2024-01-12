
/**
 * 频谱比较数据
 */
export interface FreqCompare {

    freq: number,
    baseSignal: number,
    currentSignal: number,
    offsetSignal: number,
    /**
     * 用此字段判断颜色
     * 10~20 黄
     * >20 红
     * 其他绿
     */
    currentOffsetSignal: number,
    freqBaseId: number,
    deviceId: string,
    type: number,
    captureTime: number,
    createTime: null | string
}