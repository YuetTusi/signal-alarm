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
     * 清空实时数据
     */
    clearRealSpectrumData: () => void,
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
    startRealCompare: (freqBaseId: string, cmpName: string) => void,
    /**
     * 停止实时频谱比对
     * @param freqBaseId 背景频谱id
     * @param cmpName 比较名称
     */
    stopRealCompare: (freqBaseId: string, cmpName: string) => void
}

export type { RealSpectrumState };
export { realSpectrum };