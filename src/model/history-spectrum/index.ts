import { ComDevice } from "@/schema/com-device";
import { historySpectrum } from './history-spectrum';
import { Dayjs } from "dayjs";

/**
 * 历史频谱
 */
interface HistorySpectrumState {

    /**
     * 设备下拉数据
     */
    historySpectrumDeviceList: ComDevice[],
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
     * 清空历史频谱数据
     */
    clearHistorySpectrumData: () => void,
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