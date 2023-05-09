import { quickCheck } from './quick-check';
import { QuickCheckReport } from '@/schema/quick-check-report';

interface QuickCheckState {
    /**
     * 等待状态
     */
    quickCheckLoading: boolean,
    /**
     * 查询报告等待
     */
    quickCheckReportLoading: boolean,
    /**
     * 检测任务id
     */
    quickCheckTaskId: string,
    /**
     * 开始时间
     */
    startTime: string,
    /**
     * 报告列表
     */
    quickCheckReportList: QuickCheckReport[],
    /**
     * 设置检测报告加载状态
     */
    setQuickCheckLoading: (loading: boolean) => void,
    /**
     * 设置查询报告等待状态
     */
    setQuickCheckReportLoading: (loading: boolean) => void,
    /**
     * 更新报告列表
     */
    setQuickCheckReportList: (list: QuickCheckReport[]) => void,
    /**
     * 设置检测任务id
     */
    setQuickCheckTaskId: (id: string) => void,
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