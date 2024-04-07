import { RequestResult } from '@/utility/http';
import { checkReport } from './check-report';
import { QuickCheckReport } from "@/schema/quick-check-report";

/**
 * 检查报告分页数据
 */
interface CheckReportState {

    /**
     * 分页数据
     */
    checkReportData: QuickCheckReport[],
    /**
     * 当前页
     */
    checkReportPageIndex: number,
    /**
     * 分页尺寸
     */
    checkReportPageSize: number,
    /**
     * 总数
     */
    checkReportTotal: number,
    /**
     * 加载中
     */
    checkReportLoading: boolean,
    /**
     * 更新加载中状态
     * @param payload 
     */
    setCheckReportLoading: (payload: boolean) => void,
    /**
     * 更新分页数据
     * @param pageIndex 当前页
     * @param pageSize 页尺寸
     * @param total 总数
     */
    setCheckReportPage: (pageIndex: number, pageSize: number, total: number) => void,
    /**
     * 查询检查报告分页数据
     */
    queryCheckReportData: (pageIndex: number, pageSize: number, condition?: Record<string, any>) => void,
    /**
     * 生成检查报告
     * @param startTime 开始时间
     * @param endTime 结束时间
     */
    checkReportGenerate: (startTime: number, endTime: number) => Promise<RequestResult | null>
}

export type { CheckReportState };
export { checkReport };