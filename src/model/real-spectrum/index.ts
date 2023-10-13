import { ComDevice } from "@/schema/com-device";
import { realSpectrum } from './real-spectrum';

/**
 * 实时频谱
 */
interface RealSpectrumState {

    /**
     * 设备下拉数据
     */
    realSpectrumDeviceList: ComDevice[],
    /**
     * 实时数据
     */
    realSpectrumData: number[],
    /**
     * 比对数据
     */
    compareSpectrumData?: number[],
    /**
     * 时间
     */
    realSpectrumCaptureTime: number,
    /**
     * 设备id
     */
    realSpectrumDeviceId: string,
    /**
     * 读取状态
     */
    realSpectrumLoading: boolean,
    /**
     * 比较中
     */
    comparing: boolean,
    /**
     * 更新比对中
     */
    setComparing: (payload: boolean) => void,
    /**
     * 清空比对及实时数据
     */
    clearSpectrumData: () => void,
    /**
     * 查询设备下拉数据
     */
    queryRealSpectrumDeviceList: () => void,
    /**
     * 查询当前设备实时频谱数据
     */
    queryRealSpectrumData: (deviceId: string) => void,
    /**
     * 开始实时频谱比对
     * @param freqBaseId 背景频谱id
     * @param cmpName 比较名称
     */
    startRealCompare: (freqBaseId: string, cmpName: string) => Promise<boolean>,
    /**
     * 停止实时频谱比对
     * @param freqBaseId 背景频谱id
     * @param cmpName 比较名称
     */
    stopRealCompare: (freqBaseId: string, cmpName: string) => Promise<boolean>,
    /**
     * 查询实时比对数据
     * @param deviceId 设备id
     * @param cmpName 比较名称
     */
    queryCompareRealSpectrum: (deviceId: string, cmpName: string) => void
}

export type { RealSpectrumState };
export { realSpectrum };