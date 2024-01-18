import { ComDevice } from "@/schema/com-device";
import { historySpectrum } from './history-spectrum';
import { Dayjs } from "dayjs";
import { PastOperate } from "@/view/spectrum/prop";

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
     * 历史数据
     */
    historySpectrumData: number[],
    /**
     * 时间
     */
    historySpectrumCaptureTime: number,
    /**
     * 设备id
     */
    historySpectrumDeviceId: string,
    /**
     * 读取状态
     */
    historySpectrumLoading: boolean,
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
     * @param freqBaseId 
     * @param startTime 
     * @param endTime 
     * @param cmpName 
     */
    queryHistoryCompareSpectrumData: (freqBaseId: string, startTime: number, endTime: number, cmpName: string) => void
}

export type { HistorySpectrumState };
export { historySpectrum };