import { quickCheck } from './quick-check';
import { QuickCheckReport } from '@/schema/quick-check-report';

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
     * 报告列表
     */
    quickCheckReportList: QuickCheckReport[],
    /**
     * 更新报告列表
     */
    setQuickCheckReportList: (list: QuickCheckReport[]) => void,
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
    quickCheckStop: () => void,
    /**
     * 查询检查报告
     */
    queryQuickCheckReport: () => void
}

export type { QuickCheckState };
export { quickCheck };