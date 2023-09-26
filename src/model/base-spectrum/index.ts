import { BaseFreq } from "@/schema/base-freq";
import { ComDevice } from "@/schema/com-device";
import { baseSpectrum } from './base-spectrum';

interface CalcParam {
    /**
     * 背景频谱名称
     */
    baseFreqName: string,
    /**
     * 起始时间
     */
    createTimeBegin: number,
    /**
     * 结束时间
     */
    createTimeEnd: number,
    /**
     * 描述
     */
    description: string,
    /**
     * 设备id
     */
    deviceId: string
}

/**
 * 背景频谱
 */
interface BaseSpectrumState {

    /**
     * 设备下拉数据
     */
    baseSpectrumDeviceList: ComDevice[],
    /**
     * 背景频谱数据
     */
    baseSpectrumData: BaseFreq[],
    /**
     * 当前页
     */
    baseSpectrumPageIndex: number,
    /**
     * 总数
     */
    baseSpectrumTotal: number,
    /**
     * 页尺寸
     */
    baseSpectrumPageSize: number,
    /**
     * 时间
     */
    baseSpectrumCaptureTime: number,
    /**
     * 设备id
     */
    baseSpectrumDeviceId: string,
    /**
     * 读取状态
     */
    baseSpectrumLoading: boolean,
    /**
     * 清空背景频谱数据
     */
    clearBaseSpectrumData: () => void,
    /**
     * 查询设备下拉数据
     */
    queryBaseSpectrumDeviceList: () => void,
    /**
     * 查询当前设备背景频谱数据
     */
    queryBaseSpectrumData: (pageIndex: number, pageSize: number, condition?: Record<string, any>) => void,
    /**
     * 计算背景频谱
     */
    calcBaseFreq: (payload: CalcParam) => Promise<boolean>
}

export type { BaseSpectrumState, CalcParam };
export { baseSpectrum };