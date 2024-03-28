import dayjs from 'dayjs';
import { QueryPage } from '@/schema/query-page';
import { WhiteList as WhiteListEntity } from '@/schema/white-list';
import { request } from '@/utility/http';
import { helper } from '@/utility/helper';
import { FormValue } from '@/view/white-list/add-modal/prop';
import { GetState, SetState } from '..';
import { SignalState } from '../signal';
import { ContinuousSignal } from '@/schema/continuous-signal';

const signal = (setState: SetState, _: GetState): SignalState => ({
    /**
     * 可疑持续信号数据
     */
    signalData: [],
    /**
     * 页码
     */
    signalPageIndex: 1,
    /**
     * 页尺寸
     */
    signalPageSize: helper.PAGE_SIZE,
    /**
     * 总数
     */
    signalTotal: 0,
    /**
     * 读取中
     */
    signalLoading: false,
    /**
     * 查询可疑信号数据
     */
    async querySignalData(pageIndex: number, pageSize: number, condition: Record<string, any>) {
        const url = `/signal/${pageIndex}/${pageSize}`;
        setState({ signalLoading: true });
        try {
            const res = await request.get<QueryPage<ContinuousSignal>>(url);

            if (res === null || res.code !== 200) {
                throw new Error('查询失败');
            }

            if (pageIndex > res.data.pages) {
                let ret = await request.get<QueryPage<ContinuousSignal>>(url);
                if (ret === null || ret.code !== 200) {
                    throw new Error('查询失败');
                } else {
                    setState({
                        signalData: ret.data.records.sort((a, b) =>
                            dayjs(b.createTime).valueOf() - dayjs(a.createTime).valueOf()),
                        signalPageIndex: pageIndex,
                        signalPageSize: pageSize,
                        signalTotal: ret.data.total
                    });
                }
            } else {
                setState({
                    signalData: res.data.records.sort((a, b) =>
                        dayjs(b.createTime).valueOf() - dayjs(a.createTime).valueOf()),
                    signalPageIndex: pageIndex,
                    signalPageSize: pageSize,
                    signalTotal: res.data.total
                });
            }
        } catch (error) {
            throw error;
        } finally {
            setState({ signalLoading: false });
        }
    }
});

export { signal };