import { ContinuousSignal } from '@/schema/continuous-signal';
import { signal } from './signal';

interface SignalState {
    /**
     * 可疑持续信号Top数据
     */
    signalTop: ContinuousSignal[],
    /**
     * 可疑持续信号数据
     */
    signalData: ContinuousSignal[],
    /**
     * 页码
     */
    signalPageIndex: number,
    /**
     * 页尺寸
     */
    signalPageSize: number,
    /**
     * 总数
     */
    signalTotal: number,
    /**
     * 读取中
     */
    signalLoading: boolean,
    /**
     * 查询可疑持续信号Top数据
     */
    querySignalTop: () => void,
    /**
     * 查询可疑信号数据
     */
    querySignalData: (pageIndex: number, pageSize: number, condition: Record<string, any>) => void
}

export type { SignalState };
export { signal };