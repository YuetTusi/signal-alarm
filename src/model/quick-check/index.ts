import { RequestResult } from '@/utility/http';
import { quickCheck } from './quick-check';

interface QuickCheckState {
    /**
     * 等待状态
     */
    quickCheckLoading: boolean,
    /**
     * 开始时间
     */
    startTime: string,
    /**
     * 设置开始时间
     */
    setStartTime: (start: string) => void,
    /**
     * 开始检测
     */
    quickCheckStart: () => void,
    /**
     * 停止检测
     */
    quickCheckStop: () => void
}

export type { QuickCheckState };
export { quickCheck };