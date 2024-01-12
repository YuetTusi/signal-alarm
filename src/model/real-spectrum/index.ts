import { ComDevice } from "@/schema/com-device";
import { realSpectrum } from './real-spectrum';
import { FreqCompare } from "@/schema/freq-compare";

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
     * 背景频谱
     */
    bgSpectrumData?: number[],
    /**
     * 比较数据
     */
    freqCmpResList: FreqCompare[],
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
     * @param deviceId 设备id
     * @param freqBaseId 背景频谱id
     * @param offset 偏移量
     */
    startRealCompare: (deviceId: string, freqBaseId: string, offset: number) => Promise<boolean>,
    /**
     * 停止实时频谱比对
     * @param deviceId 设备id
     * @param freqBaseId 背景频谱id
     */
    stopRealCompare: (deviceId: string, freqBaseId: string) => Promise<boolean>
}

export type { RealSpectrumState };
export { realSpectrum };