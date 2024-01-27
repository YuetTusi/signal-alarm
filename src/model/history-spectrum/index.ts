import { ComDevice } from "@/schema/com-device";
import { PastOperate } from "@/view/spectrum/prop";
import { historySpectrum } from './history-spectrum';
import { FreqCompare } from "@/schema/freq-compare";

/**
 * 历史频谱
 */
interface HistorySpectrumState {

    /**
     * 操作类型
     */
    pastOperate: PastOperate,
    /**
     * 正在播放中
     */
    specPlaying: boolean,
    /**
     * 读取中
     */
    searchHistoryLoading: boolean,
    /**
     * 设备下拉数据
     */
    historySpectrumDeviceList: ComDevice[],
    /**
     * 所有背景频谱数据
     */
    allBgFreqList: {
        freqBaseId: string,
        freqArray: string,
        deviceId: string
    }[],
    /**
     * 历史频谱数据
     */
    historySpectrumData: number[],
    /**
     * 历史背景频谱
     */
    historyBgSpectrumData: number[],
    /**
     * 比对频谱柱图数据
     */
    historyBarData: { currentOffsetSignal: number | undefined, itemStyle: any }[],
    /**
     * 比较数据
     */
    historyCmpResList: FreqCompare[],
    /**
     * 比较展示数据（表格）
     */
    historyComDisplayList: FreqCompare[],
    /**
     * 重置比对频谱柱图数据
     */
    resetHistoryBarData: () => void,
    /**
     * 更新历史背景频谱
     */
    setHistoryBgSpectrumData: (payload: number[]) => void,
    /**
     * 更新比较数据
     */
    setHistoryCmpResList: (payload: FreqCompare[]) => void,
    /**
     * 更新比较展示数据（表格）
     */
    setHistoryComDisplayList: (payload: FreqCompare[]) => void,
    /**
     * 更新操作类型
     */
    setPastOperate: (payload: PastOperate) => void,
    /**
     * 更新播放中 
     */
    setSpecPlaying: (payload: boolean) => void,
    /**
     * 清空历史频谱数据
     */
    clearHistorySpectrumData: () => void,
    /**
     * 查询所有背景频谱数据
     */
    queryAllBgFreqList: () => void,
    /**
     * 查询设备下拉数据
     */
    queryHistorySpectrumDeviceList: () => void,
    /**
     * 查询当前设备历史频谱数据
     */
    queryHistorySpectrumData: (deviceId: string, captureTime: number) => void,
    /**
     * 查询历史比对数据
     * @param deviceId 设备id
     * @param freqBaseId 背景频谱id
     * @param startTime 起始时间
     * @param endTime 结束时间
     * @param offset 偏移值
     */
    queryHistoryCompareSpectrumData: (deviceId: string, freqBaseId: string, startTime: number, endTime: number, offset: number) => void
}

export type { HistorySpectrumState };
export { historySpectrum };