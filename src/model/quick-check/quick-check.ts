import dayjs from 'dayjs';
import { message } from 'antd';
import { request } from '@/utility/http';
import { QuickCheckReport } from '@/schema/quick-check-report';
import { GetState, SetState } from '../index';
import { QuickCheckState } from '../quick-check';

const quickCheck = (setState: SetState, getState: GetState): QuickCheckState => ({
    /**
     * 等待状态
     */
    quickCheckLoading: false,
    /**
     * 检测任务id
     */
    quickCheckTaskId: '',
    /**
     * 开始时间
     */
    startTime: '',
    /**
     * 报告列表
     */
    quickCheckReportList: [],
    /**
     * 设置检测报告加载状态
     */
    setQuickCheckLoading(loading: boolean) {
        setState({ quickCheckLoading: loading });
    },
    /**
     * 设置检测任务id
     */
    setQuickCheckTaskId(id: string) {
        setState({ quickCheckTaskId: id });
    },
    /**
     * 设置开始时间
     */
    setStartTime(start: string) {
        setState({ startTime: start });
    },
    /**
     * 更新报告列表
     */
    setQuickCheckReportList(list: QuickCheckReport[]) {
        setState({ quickCheckReportList: list })
    },
    /**
     * 开始检测
     */
    async quickCheckStart() {
        try {
            const res = await request.get<QuickCheckReport>('/check/start');

            if (res === null) {
                message.warning(`检测失败`);
            } else if (res.code === 200) {
                setState({ startTime: dayjs(res.data.startTime).format('YYYY-MM-DD HH:mm:ss') });
                setState({ quickCheckTaskId: res.data.taskId ?? '' });
            } else {
                message.warning(`检测失败 ${res.message}`);
            }
        } catch (error) {
            console.warn(error);
            throw error;
        }
    },
    /**
     * 停止检测
     */
    async quickCheckStop() {
        const { quickCheckTaskId } = getState();
        try {
            await request.get(`/check/stop?taskId=${quickCheckTaskId}`);
        } catch (error) {
            console.warn(error);
            throw error;
        } finally {
            setState({ startTime: '' });
        }
    },
    /**
     * 查询检查报告
     */
    async queryQuickCheckReport() {
        setState({ quickCheckLoading: true });
        try {
            const res = await request.get<QuickCheckReport[]>('/check/list');
            console.log(res);
            if (res !== null && res.code === 200) {
                setState({ quickCheckReportList: res.data ?? [] });
            }
        } catch (error) {
            throw error;
        } finally {
            setState({ quickCheckLoading: false });
        }
    }
});

export { quickCheck };