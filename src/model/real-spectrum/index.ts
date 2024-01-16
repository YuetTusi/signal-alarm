import { ComDevice } from "@/schema/com-device";
import { FreqCompare } from "@/schema/freq-compare";
import { realSpectrum } from './real-spectrum';
import { SpecOperate } from "@/view/spectrum/prop";

/**
 * 实时频谱
 */
interface RealSpectrumState {

    /**
     * 设备下拉数据
     */
    realSpectrumDeviceList: ComDevice[],
    /**
     * 所有背景频谱数据
     */
    allFreqList: {
        freqBaseId: string,
        freqArray: string,
        deviceId: string
    }[],
    /**
     * 实时数据
     */
    realSpectrumData: number[],
    /**
     * 背景频谱
     */
    bgSpectrumData: number[],
    /**
     * 比较数据
     */
    freqCmpResList: FreqCompare[],
    /**
     * 比较展示数据（表格）
     */
    freqComDisplayList: FreqCompare[],
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
     * 操作类型（0:未执行操作,1:查询,2:为比对）
     */
    specOperate: SpecOperate,
    /**
     * 正在查询中
     */
    specLiving: boolean,
    /**
     * 更新正在查询中
     */
    setSpecLiving: (payload: boolean) => void,
    /**
     * 更新操作类型
     */
    setSpecOperate: (payload: SpecOperate) => void,
    /**
     * 清空比对及实时数据（全部数据）
     */
    clearSpectrumData: () => void,
    /**
     * 清空背景频谱
     */
    clearBgSpectrumData: () => void,
    /**
     * 查询所有背景频谱数据
     * @returns 
     */
    queryAllFreqList: () => void,
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