import dayjs from 'dayjs';
import { message } from 'antd';
import { helper } from "@/utility/helper";
import { request } from '@/utility/http';
import { QuickCheckReport } from '@/schema/quick-check-report';
import { QueryPage } from '@/schema/query-page';
import { GetState, SetState } from "..";
import { CheckReportState } from ".";

const checkReport = (setState: SetState, _: GetState): CheckReportState => ({
    /**
     * 分页数据
     */
    checkReportData: [],
    /**
     * 当前页
     */
    checkReportPageIndex: 1,
    /**
     * 分页尺寸
     */
    checkReportPageSize: helper.PAGE_SIZE,
    /**
     * 总数
     */
    checkReportTotal: 0,
    /**
     * 加载中
     */
    checkReportLoading: false,
    /**
     * 更新加载中状态
     * @param payload 
     */
    setCheckReportLoading(payload: boolean) {
        setState({ checkReportLoading: payload });
    },
    /**
     * 更新分页数据
     * @param pageIndex 当前页
     * @param pageSize 页尺寸
     * @param total 总数
     */
    setCheckReportPage(pageIndex: number, pageSize: number, total: number) {
        setState({
            checkReportPageIndex: pageIndex,
            checkReportPageSize: pageSize,
            checkReportTotal: total
        });
    },
    /**
     * 查询专项检查（终端）分页数据
     */
    async queryCheckReportData(pageIndex: number, pageSize: number, condition?: Record<string, any>) {
        message.destroy();
        setState({ checkReportLoading: true });
        let params = '';
        if (!helper.isNullOrUndefined(condition)) {
            let q: string[] = [];
            if (condition?.beginTime) {
                q.push(`createTimeBegin=${condition?.beginTime}`);
            }
            if (condition?.endTime) {
                q.push(`createTimeEnd=${condition?.endTime}`);
            }
            params = '?' + q.join('&');
        }
        try {
            const res = await request.get<QueryPage<QuickCheckReport>>(`/check/${pageIndex}/${pageSize}${params}`);
            if (res === null || res.code !== 200) {
                throw new Error('查询失败');
            }

            if (pageIndex > res.data.pages) {
                let ret = await request.get<QueryPage<QuickCheckReport>>(`/check/${res.data.pages}/${pageSize}${params}`);
                if (ret === null || ret.code !== 200) {
                    throw new Error('查询失败');
                } else {
                    setState({
                        checkReportData: ret.data.records.sort((a, b) =>
                            dayjs(b.createTime).valueOf() - dayjs(a.createTime).valueOf()),
                        checkReportPageIndex: pageIndex,
                        checkReportPageSize: pageSize,
                        checkReportTotal: ret.data.total
                    });
                }
            } else {
                setState({
                    checkReportData: res.data.records.sort((a, b) =>
                        dayjs(b.createTime).valueOf() - dayjs(a.createTime).valueOf()),
                    checkReportPageIndex: pageIndex,
                    checkReportPageSize: pageSize,
                    checkReportTotal: res.data.total
                });
            }
        } catch (error) {
            helper.log(`查询检查报告失败 @model/check-report/queryCheckReportData:${error.message}`, 'error');
            throw error;
        } finally {
            setState({ checkReportLoading: false });
        }
    }
});

export { checkReport };