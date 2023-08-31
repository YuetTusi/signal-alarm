import { message } from 'antd';
import { helper } from '@/utility/helper';
import { request } from '@/utility/http';
import { QueryPage } from '@/schema/query-page';
import { GetState, SetState } from '..';
import { AlarmState } from './index';

const alarm = (setState: SetState, _: GetState): AlarmState => ({
    /**
     * Top10数据
     */
    alarmTop10Data: [],
    /**
     * 分页数据
     */
    alarmData: [],
    /**
     * 当前页
     */
    alarmPageIndex: 1,
    /**
     * 分页尺寸
     */
    alarmPageSize: helper.PAGE_SIZE,
    /**
     * 总数
     */
    alarmTotal: 0,
    /**
     * 加载中
     */
    alarmTop10Loading: false,
    /**
     * 加载中
     */
    alarmLoading: false,
    /**
     * 更新加载中状态
     * @param payload 
     */
    setAlarmLoading: (payload: boolean) => {
        setState({ alarmLoading: payload });
    },
    /**
     * 更新Top10加载中状态
     * @param payload 
     */
    setAlarmTop10Loading: (payload: boolean) => {
        setState({ alarmTop10Loading: payload });
    },
    /**
     * 更新分页数据
     * @param pageIndex 当前页
     * @param pageSize 页尺寸
     * @param total 总数
     */
    setAlarmPage: (pageIndex: number, pageSize: number, total: number) => {
        setState({
            alarmPageIndex: pageIndex,
            alarmPageSize: pageSize,
            alarmTotal: total
        });
    },
    /**
     * 查询预警信息Top10数据
     */
    queryAlarmTop10Data: async () => {
        message.destroy();
        setState({ alarmTop10Loading: true });
        try {
            const res = await request.get('/warn/msg/top');
            if (res === null) {
                message.warning('查询失败');
            } else if (res.code === 200) {
                setState({ alarmTop10Data: res.data });
            } else {
                message.warning(`查询失败（${res.message ?? ''}）`)
            }
        } catch (error) {
            throw error;
        } finally {
            setState({ alarmTop10Loading: false });
        }
    },
    /**
     * 查询预警信息分页数据
     */
    queryAlarmData: async (pageIndex: number, pageSize: number, condition?: Record<string, any>) => {
        message.destroy();
        setState({ alarmLoading: true });
        let params = '';
        if (!helper.isNullOrUndefined(condition)) {
            let q: string[] = [];
            if (condition?.beginTime) {
                q.push(`createTimeBegin=${condition?.beginTime}`);
            }
            if (condition?.endTime) {
                q.push(`createTimeEnd=${condition?.endTime}`);
            }
            if (!helper.isNullOrUndefined(condition?.status) && condition?.status !== -1) {
                q.push(`status=${condition?.status}`);
            }
            params = '?' + q.join('&');
        }
        try {
            let res = await request.get<QueryPage>(`/warn/msg/${pageIndex}/${pageSize}${params}`);
            if (res === null || res.code !== 200) {
                throw new Error('查询失败');
            }

            if (pageIndex > res.data.pages) {
                let ret = await request.get<QueryPage>(`/warn/msg/${res.data.pages}/${pageSize}${params}`);
                if (ret === null || ret.code !== 200) {
                    throw new Error('查询失败');
                } else {
                    setState({
                        alarmData: ret.data?.records ?? [],
                        alarmPageIndex: pageIndex,
                        alarmPageSize: pageSize,
                        alarmTotal: ret.data?.total ?? 0
                    });
                }
            } else {
                setState({
                    alarmData: res.data?.records ?? [],
                    alarmPageIndex: pageIndex,
                    alarmPageSize: pageSize,
                    alarmTotal: res.data?.total ?? 0
                });
            }
        } catch (error) {
            throw error;
        } finally {
            setState({ alarmLoading: false });
        }
    },
    /**
     * 导出预警信息数据
     */
    exportAlarmData: async (pageIndex: number, pageSize: number, condition?: Record<string, any>) => {
        let params = `?page=${pageIndex}&limit=${pageSize}`;
        if (!helper.isNullOrUndefined(condition)) {
            let q: string[] = [];
            if (condition?.beginTime) {
                q.push(`createTimeBegin=${condition?.beginTime}`);
            }
            if (condition?.endTime) {
                q.push(`createTimeEnd=${condition?.endTime}`);
            }
            if (!helper.isNullOrUndefined(condition?.status) && condition?.status !== -1) {
                q.push(`status=${condition?.status}`);
            }
            params = params + '&' + q.join('&');
        }
        try {
            const chunk = await request.attachment(`/warn/msg/export${params}`);
            return chunk;
        } catch (error) {
            throw error;
        }
    },
    /**
     * 处理预警信息
     */
    processAlarm: async (id: number, status: number, remark?: string) => {
        let params = `?id=${id}&status=${status}`;

        if (!helper.isNullOrUndefined(remark)) {
            params += `&remark=${window.encodeURIComponent(remark!)}`;
        }
        try {
            const res = await request.get(`/warn/msg/process${params}`);
            if (res && res.code === 200) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            throw error;
        }
    },
    /**
     * 批量处理预警信息
     */
    batchProcessAlarm: async (ids: number[], status: number, remark?: string) => {
        let params = `?ids=${ids.join(',')}&status=${status}`;

        if (!helper.isNullOrUndefined(remark)) {
            params += `&remark=${window.encodeURIComponent(remark!)}`;
        }
        try {
            const res = await request.get(`/warn/msg/batchprocess${params}`);
            if (res && res.code === 200) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            throw error;
        }
    }
});


export { alarm };