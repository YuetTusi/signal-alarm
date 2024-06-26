import dayjs from 'dayjs';
import { QueryPage } from '@/schema/query-page';
import { ContinuousSignal } from '@/schema/continuous-signal';
import { request } from '@/utility/http';
import { helper } from '@/utility/helper';
import { GetState, SetState } from '..';
import { SignalState } from '../signal';

const signal = (setState: SetState, _: GetState): SignalState => ({
    /**
     * 可疑持续信号Top数据
     */
    signalTop: [],
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
     * 查询可疑持续信号Top数据
     */
    async querySignalTop() {
        const url = '/signal/get-top';
        try {
            const res = await request.get<ContinuousSignal[]>(url);
            if (res !== null && res.code === 200) {
                setState({ signalTop: res.data });
            } else {
                setState({ signalTop: [] });
            }
        } catch (error) {
            throw error;
        }
    },
    /**
     * 查询可疑信号数据
     */
    async querySignalData(pageIndex: number, pageSize: number, condition: Record<string, any>) {
        const url = `/signal/${pageIndex}/${pageSize}`;
        let params = '';
        if (!helper.isNullOrUndefined(condition)) {
            let q: string[] = [];
            if (condition?.beginTime) {
                q.push(`createTimeBegin=${encodeURIComponent(condition.beginTime)}`);
            }
            if (condition?.endTime) {
                q.push(`createTimeEnd=${encodeURIComponent(condition?.endTime)}`);
            }
            if (condition?.deviceId) {
                q.push(`deviceId=${condition?.deviceId}`);
            }
            params = '?' + q.join('&');
        }
        console.log(url + params);
        setState({ signalLoading: true });
        try {
            const res = await request.get<QueryPage<ContinuousSignal>>(url + params);

            if (res === null || res.code !== 200) {
                throw new Error('查询失败');
            }

            if (pageIndex > res.data.pages) {
                let ret = await request.get<QueryPage<ContinuousSignal>>(url + params);
                if (ret === null || ret.code !== 200) {
                    throw new Error('查询失败');
                } else {
                    setState({
                        signalData: ret.data.records,
                        signalPageIndex: pageIndex,
                        signalPageSize: pageSize,
                        signalTotal: ret.data.total
                    });
                }
            } else {
                setState({
                    signalData: res.data.records,
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