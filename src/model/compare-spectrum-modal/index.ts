import { BaseFreq } from '@/schema/base-freq';
import { compareSpectrumModal } from './compare-spectrum-modal';
import { RequestResult } from "@/utility/http";

export interface CompareSpectrumModalState {

    /**
     * 背景频谱数据（当前设备的数据）
     */
    compareBaseSpectrumData: BaseFreq[],
    /**
     * 读取中
     */
    compareBaseSpectrumLoading: boolean,
    /**
     * 更新背景频谱数据
     */
    setCompareBaseSpectrumData: (payload: BaseFreq[]) => void,
    /**
     * 按设备id查询背景频谱
     */
    queryBaseSpectrumDataByDeviceId: (deviceId: string) => void
}

export { compareSpectrumModal };