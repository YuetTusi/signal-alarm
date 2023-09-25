import { BaseFreq } from "@/schema/base-freq";
import { ComDevice } from "@/schema/com-device";
import { baseSpectrum } from './base-spectrum';

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
}

export type { BaseSpectrumState };
export { baseSpectrum };